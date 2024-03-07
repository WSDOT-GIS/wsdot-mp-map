export * from "./arcgis";
export * from "./errors";
export * from "./json";
export * from "./types";
export * from "./url";
import type {
  DateString,
  FindNearestRouteLocationParameters,
  FindRouteLocationParameters,
  RouteGeometry,
  RouteGeometryPoint,
  RouteLocation,
} from "./types";
import { populateUrlParameters } from "./url";

/*
TODO: Test the responses from the ELC requests for the presence of an "error" property
and if there is one, throw an error. Will also need to create a new class that extends
Error to handle this.
*/

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
  populateUrlParameters(options, queryUrl);
  const response = await fetch(queryUrl);
  const result = (await response.json()) as RouteLocation<
    DateString,
    RouteGeometryPoint
  >[];

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
