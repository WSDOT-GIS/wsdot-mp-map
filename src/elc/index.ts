export * from "./arcgis";
export * from "./types";
import type {
  DateString,
  FindNearestRouteLocationParameters,
  FindRouteLocationParameters,
  RouteGeometry,
  RouteGeometryPoint,
  RouteLocation,
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
      outValue = value.toISOString();
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
  const result = (await response.json()) as Promise<
    RouteLocation<DateString, RouteGeometryPoint>[]
  >;

  /* @__PURE__ */ console.log(
    `${findNearestRouteLocations.name} result`,
    result
  );

  return result;
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

  return result;
}

// /**
//  * Adds a graphic to the map of the ELC result.
//  * @param elcResponse - Response from call to ELC
//  * @param view - Map view
//  * @param milepostLayer - Milepost feature layer to which the graphic will be added
//  * @param mapPoint - Point the user clicked (if applicable)
//  * @returns - The added graphic, or null if the graphic couldn't be added
//  * (e.g., if user clicked an area outside of the search radius of a route.)
//  */
// function addElcGraphic(
//   elcResponse: IRouteLocation[],
//   view: MapView,
//   milepostLayer: FeatureLayer,
//   mapPoint?: Point
// ) {
//   const [routeLocation] = elcResponse;

//   // Show a popup and exit if the RouteGeometry is not a point.
//   if (!isPoint(routeLocation.RouteGeometry)) {
//     const message = "Unexpected output from ELC.";
//     /* @__PURE__ */ console.warn(message, elcResponse);
//     view
//       .openPopup({
//         content: message,
//         location: mapPoint,
//       })
//       .catch((reason) =>
//         /* @__PURE__ */ console.error(`Error opening popup: ${reason}`)
//       );
//     return null;
//   }

//   const graphic = routeLocationToGraphic(routeLocation);
//   // Add location to the layer.
//   milepostLayer
//     .applyEdits({
//       addFeatures: [graphic],
//     })
//     .catch((reason) => console.error(reason));

//   return graphic;
// }

// /**
//  * Makes a call to the ELC and adds a point graphic to the {@link milepostLayer}.
//  * @param view
//  * @param milepostLayer
//  * @param mapPoint
//  * @param options
//  * @returns
//  */
// export async function callElc(
//   view: MapView,
//   milepostLayer: FeatureLayer,
//   mapPoint: Point,
//   options: ElcSetupOptions
// ) {
//   const { x, y, spatialReference } = mapPoint;
//   const { wkid } = spatialReference;
//   const { searchRadius } = options;
//   const inputParameters: IFindNearestRouteLocationParameters = {
//     coordinates: [x, y],
//     inSR: wkid,
//     outSR: wkid,
//     searchRadius,
//     useCors: true,
//     referenceDate: new Date(),
//   };
//   const routeLocator = new RouteLocator();
//   const elcResponse =
//     await routeLocator.findNearestRouteLocations(inputParameters);

//   /* @__PURE__ */ console.debug("ELC Response", {
//     inputParameters,
//     elcResponse,
//   });

//   // Show a popup and exit if no results were returned.
//   if (elcResponse.length < 1) {
//     const message = "No routes within search radius.";
//     /* @__PURE__ */ console.debug(message, elcResponse);
//     view
//       .openPopup({
//         content: message,
//         location: mapPoint,
//       })
//       .catch((reason) => console.error(reason));
//     return null;
//   }

//   const graphic = addElcGraphic(elcResponse, view, milepostLayer, mapPoint);

//   return graphic;
// }

// /**
//  *
//  * @param e - The event from the user submitting a milepost via the form
//  * @param view - The map view
//  * @param milepostLayer - The milepost layer where the result graphic will be added.
//  * @param mapPoint - The point where
//  */
// export async function callElcFromForm(
//   e: RouteEventObject,
//   view: MapView,
//   milepostLayer: FeatureLayer
// ) {
//   const rl = new RouteLocator();
//   /* @__PURE__ */ console.debug(
//     `${callElcFromForm.name}: RouteEventObject type: ${e.type ?? "null"}`
//   );
//   if (e.type != null) {
//     throw new NotImplementedError(
//       "non-mainline types have not been implemented."
//     );
//   }
//   const location = new RouteLocation({
//     Route: e.route,
//     Srmp: e.mp,
//   });
//   const elcResponse = await rl.findRouteLocations({
//     locations: [location],
//     outSR: view.spatialReference.wkid,
//     referenceDate: new Date(),
//   });

//   const graphic = addElcGraphic(elcResponse, view, milepostLayer);
//   return graphic;
// }

// export async function callElcFromUrl(
//   view: MapView,
//   milepostLayer: FeatureLayer
// ) {
//   const url = new URL(location.href);
//   let route = url.searchParams.get("route");
//   const mp = url.searchParams.get("mp");

//   if (!route || !mp) {
//     /* @__PURE__ */ console.debug(
//       "The URL does not have valid route information.",
//       url.search
//     );
//     return;
//   }
//   route = padRoute(route);

//   /**
//    * Regular expression pattern to validate and extract milepost information from a string.
//    * It expects a numeric value that can be an integer or a decimal, and an optional 'B' character
//    * indicating back mileage if present.
//    *
//    * The match will have the following groups:
//    * - `mp` - The numeric value of the milepost
//    * - `back` - The 'B' character if present
//    * @example
//    * // matches "123", "123.45", "123B", "123.45B"
//    */
//   const mpRe = /^(?<mp>\d+(?:\.\d+)?)(?<back>B)?$/i;
//   const match = mpRe.exec(mp);

//   if (!(match && match.length >= 2 && match.groups)) {
//     /* @__PURE__ */ console.warn(
//       "The URL does not have valid milepost information.",
//       {
//         "mp search param": mp,
//         match,
//         regex: mpRe,
//       }
//     );
//     return;
//   }

//   /* @__PURE__ */ console.debug("MP match", match.groups);

//   const srmp = parseFloat(match.groups.mp);
//   const back = match.groups?.back !== undefined && /B/i.test(match.groups.back);

//   /* @__PURE__ */ console.debug("SRMP", { srmp, back });

//   let direction = url.searchParams.get("direction");

//   if (!direction) {
//     direction = "i";
//   }

//   /* @__PURE__ */ console.debug(
//     `${route}@${srmp}${back ? "B" : "A"}, ${direction}`
//   );

//   const routeLocation = new RouteLocation({
//     Route: route,
//     Srmp: srmp,
//     Back: back,
//     Decrease: /dD/i.test(direction),
//     ReferenceDate: new Date(),
//     ResponseDate: new Date(),
//   });

//   /* @__PURE__ */ console.debug(
//     "ELC call from URL: Route Location",
//     routeLocation
//   );

//   const rl = new RouteLocator();
//   const elcResults = await rl.findRouteLocations({
//     locations: [routeLocation],
//     outSR: 4326,
//   });

//   if (elcResults.length < 1) {
//     /* @__PURE__ */ console.debug("No results from URL", elcResults);
//     return elcResults;
//   }

//   return addElcGraphic(elcResults, view, milepostLayer);
// }
