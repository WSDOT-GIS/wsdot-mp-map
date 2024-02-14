export * from "./arcgis";
export * from "./types";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { addGraphicsToLayer } from "../addGraphicsToLayer";
import { padRoute } from "../utils";
import { routeLocationToGraphic } from "./arcgis";
import type {
  DateString,
  FindNearestRouteLocationParameters,
  FindRouteLocationParameters,
  RouteGeometry,
  RouteGeometryPoint,
  RouteLocation,
  ValidRouteLocationForMPInput,
} from "./types";

/**
 * Generates an enumerated list of URL parameters based on the input parameters object.
 *
 * @param parameters - the input parameters object
 * @returns - an iterator for enumerating URL parameters
 */
function* enumerateUrlParameters(
  parameters: FindNearestRouteLocationParameters | FindRouteLocationParameters
): Generator<[key: string, value: string], void, unknown> {
  yield ["f", "json"];
  for (const [key, value] of Object.entries(parameters)) {
    if (typeof value === "string") {
      yield [key, value];
      continue;
    }
    let outValue: string;
    if (value instanceof Date) {
      outValue = value.toISOString().replace(/T.+$/, "");
    } else if (Array.isArray(value)) {
      outValue = JSON.stringify(value);
    } else {
      outValue = `${value}`;
    }
    yield [key, outValue];
  }
}

function populateUrlParameters(
  parameters: FindNearestRouteLocationParameters | FindRouteLocationParameters,
  requestUrl: URL
) {
  for (const [key, value] of enumerateUrlParameters(parameters)) {
    requestUrl.searchParams.set(key, value);
  }
}

export type ElcMapServiceUrlString =
  `http${"s" | ""}://${string}/arcgis/rest/services/${string}/MapServer/`;

export type ElcSoeUrlString = `${ElcMapServiceUrlString}exts/ElcRestSoe/`;

type Space = " " | "%20";

export type ElcFindNearestUrlString =
  `${ElcSoeUrlString}Find${Space}Nearest${Space}Route${Space}Locations/`;

export type ElcFindUrlString =
  `${ElcSoeUrlString}Find${Space}Route${Space}Locations/`;

const defaultFindNearestUrl: ElcFindNearestUrlString =
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/exts/ElcRestSoe/Find Nearest Route Locations/";

const defaultFindUrl: ElcFindUrlString =
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/exts/ElcRestSoe/Find Route Locations/";

/**
 * Find nearest route locations
 * @param options - the input parameters
 * @param url - ELC SOE "Find Nearest Route Locations" endpoint URL.
 * @returns - An array of route locations.
 */
export async function findNearestRouteLocations(
  options: FindNearestRouteLocationParameters,
  url: ElcFindNearestUrlString = defaultFindNearestUrl
) {
  const queryUrl = new URL(url);
  for (const [key, value] of enumerateUrlParameters(options)) {
    queryUrl.searchParams.set(key, value);
  }
  const response = await fetch(queryUrl);
  const result = (await response.json()) as RouteLocation<
    DateString,
    RouteGeometryPoint
  >[];

  /* @__PURE__ */ console.log(
    `${findNearestRouteLocations.name} result`,
    result
  );

  const secondPassInput = {
    locations: result.map(({ Arm, Route, Decrease, ReferenceDate, Id }) => ({
      Arm,
      Route,
      Decrease,
      ReferenceDate,
      Id,
    })),
    outSR: options.outSR ?? options.inSR,
    lrsYear: options.lrsYear ?? "Current",
    referenceDate: options.referenceDate,
  };
  const result2 = await findRouteLocations(secondPassInput);

  /* @__PURE__ */ console.log(
    `${findNearestRouteLocations.name} 2nd pass result`,
    { input: secondPassInput, output: result2 }
  );

  // Restore old distance values.
  result2.forEach((routeLocation, i) => {
    const oldLoc = result[i];
    routeLocation.EventPoint = oldLoc.EventPoint;
    routeLocation.Distance = oldLoc.Distance;
    routeLocation.Angle = oldLoc.Angle;
  });

  return result2;
}

/**
 * Find route locations based on the given parameters and URL.
 *
 * @param routeLocations - the parameters for finding route locations
 * @param url - the URL for finding route locations
 * @returns - an array of route locations
 */
export async function findRouteLocations(
  routeLocations: FindRouteLocationParameters,
  url: ElcFindUrlString = defaultFindUrl
) {
  /* @__PURE__ */ console.debug(findRouteLocations.name, {
    routeLocations,
    url,
  });
  const requestUrl = new URL(url);
  populateUrlParameters(routeLocations, requestUrl);
  const response = await fetch(requestUrl);
  const result = (await response.json()) as RouteLocation<
    DateString,
    RouteGeometry
  >[];
  if ("error" in (result as unknown as Record<string, unknown>)) {
    throw new Error(JSON.stringify(result));
  }

  return result;
}

/**
 * Retrieves and processes route and milepost information from the URL.
 *
 * @returns Location object with route, milepost, direction, and date information
 */
export function getElcParamsFromUrl(): ValidRouteLocationForMPInput<
  Date,
  RouteGeometry
> | null {
  const url = new URL(location.href);
  let route = url.searchParams.get("route");
  const mp = url.searchParams.get("mp");

  if (!route || !mp) {
    /* @__PURE__ */ console.debug(
      "The URL does not have valid route information.",
      url.search
    );
    return null;
  }
  route = padRoute(route);

  /**
   * Regular expression pattern to validate and extract milepost information from a string.
   * It expects a numeric value that can be an integer or a decimal, and an optional 'B' character
   * indicating back mileage if present.
   *
   * The match will have the following groups:
   * - `mp` - The numeric value of the milepost
   * - `back` - The 'B' character if present
   * @example
   * // matches "123", "123.45", "123B", "123.45B"
   */
  const mpRe = /^(?<mp>\d+(?:\.\d+)?)(?<back>B)?$/i;
  const match = mpRe.exec(mp);

  if (!(match && match.length >= 2 && match.groups)) {
    /* @__PURE__ */ console.warn(
      "The URL does not have valid milepost information.",
      {
        "mp search param": mp,
        match,
        regex: mpRe,
      }
    );
    return null;
  }

  /* @__PURE__ */ console.debug("MP match", match.groups);

  const srmp = parseFloat(match.groups.mp);
  const back = match.groups?.back !== undefined && /B/i.test(match.groups.back);

  /* @__PURE__ */ console.debug("SRMP", { srmp, back });

  let direction = url.searchParams.get("direction");

  if (!direction) {
    direction = "i";
  }

  /* @__PURE__ */ console.debug(
    `${route}@${srmp}${back ? "B" : "A"}, ${direction}`
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const routeLocation = {
    Route: route,
    Srmp: srmp,
    Back: back,
    Decrease: /dD/i.test(direction),
    ReferenceDate: today,
    ResponseDate: today,
  };

  return routeLocation;
}

export async function callElcFromUrl(milepostLayer: FeatureLayer) {
  const routeLocation = getElcParamsFromUrl();

  if (!routeLocation) {
    /* @__PURE__ */ console.debug(
      "The URL does not have valid route information."
    );
    return null;
  }

  /* @__PURE__ */ console.debug(
    "ELC call from URL: Route Location",
    routeLocation
  );

  const elcResults = await findRouteLocations({
    locations: [routeLocation],
    outSR: 4326,
  });

  if (elcResults.length < 1) {
    /* @__PURE__ */ console.debug("No results from URL", elcResults);
    return null;
  }

  const graphics = elcResults.map((r) => routeLocationToGraphic(r));

  const { addedFeatures } = await addGraphicsToLayer(milepostLayer, graphics);

  /* @__PURE__ */ console.debug(
    "ELC call from URL: addedFeatures",
    addedFeatures
  );

  return addedFeatures;
}
