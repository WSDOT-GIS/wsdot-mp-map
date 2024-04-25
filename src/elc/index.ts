import {
  ArcGisError,
  ElcError,
  isArcGisErrorResponse,
  type ArcGisErrorResponse,
} from "./errors";
import { elcReviver } from "./json";
import {
  type DateString,
  type FindNearestRouteLocationParameters,
  type FindRouteLocationParameters,
  type RouteGeometry,
  type RouteGeometryPoint,
  type RouteIdString,
  type RouteLocation,
  type RoutesResponse,
  type RoutesSet,
  type RouteTypes,
} from "./types";
import { populateUrlParameters } from "./url";
import { RouteDescription, type RrtValue } from "wsdot-route-utils";

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

export type ElcRoutesUrlString = `${ElcSoeUrlString}routes/`;

const defaultExtensionRoot =
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/exts/ElcRestSoe/";

export const defaultFindNearestUrl: ElcFindNearestUrlString = `${defaultExtensionRoot}Find Nearest Route Locations/`;

export const defaultFindUrl: ElcFindUrlString = `${defaultExtensionRoot}Find Route Locations/`;

export const defaultRoutesUrl: ElcRoutesUrlString = `${defaultExtensionRoot}routes/`;

type SuccessType = RouteLocation<DateString, RouteGeometryPoint>;

/**
 * Splits an array of ELC results, some of the objects potentially
 * {@link Error Errors}, into two {@link Map mappings}:
 * one of errors and one of non-errors. The maps are keyed
 * by the index of the input array.
 * @param elcResults - An array of results from the input array.
 * @returns An object with two maps: errors and successes.
 */
function splitErrorResults<T>(elcResults: T[]) {
  type NonError = Exclude<T, Error>;
  const successes = new Map<number, NonError>();
  const errors = new Map<number, Error>();

  for (const [i, item] of elcResults.entries()) {
    if (item instanceof Error) {
      errors.set(i, item);
    } else {
      successes.set(i, item as NonError);
    }
  }

  return {
    successes,
    errors,
  };
}

/**
 * Find nearest route locations
 * @param options - the input parameters
 * @param url - ELC SOE "Find Nearest Route Locations" endpoint URL.
 * @returns - An array of route locations.
 */
export async function findNearestRouteLocations(
  options: FindNearestRouteLocationParameters,
  url: ElcFindNearestUrlString = defaultFindNearestUrl,
) {
  /* __PURE__ */ console.group(findNearestRouteLocations.name);
  /* __PURE__ */ console.debug("parameters", { options, url });
  const queryUrl = new URL(url);
  populateUrlParameters(options, queryUrl);
  /* __PURE__ */ console.debug("Calling REST endpoint", queryUrl);
  const response = await fetch(queryUrl);

  /* __PURE__ */ console.debug("Parsing response JSON...", response);
  const responseJson = await response.text();
  const result = JSON.parse(responseJson, elcReviver) as (
    | SuccessType
    | ArcGisError
    | ElcError
  )[];
  /* __PURE__ */ console.debug("Parsed JSON", result);

  if (!result.length) {
    /* __PURE__ */ console.debug("Result was an empty array.");
    /* __PURE__ */ console.groupEnd();
    return result;
  }

  const { successes, errors } = splitErrorResults(result);

  /* __PURE__ */ if (errors.size) {
    /* __PURE__ */ console.error(
      "Errors",
      Object.fromEntries(errors.entries()),
    );
  }

  const successValues = [...successes.values()];

  const secondPassInput = {
    // Filter out all of the error responses.
    locations: successValues.map(
      ({ Arm, Route, Decrease, ReferenceDate, Id }) => ({
        Arm,
        Route,
        Decrease,
        ReferenceDate,
        Id,
      }),
    ),
    outSR: options.outSR ?? options.inSR,
    lrsYear: options.lrsYear ?? "Current",
    referenceDate: options.referenceDate,
  };
  const result2 = await findRouteLocations(secondPassInput);

  // Restore old distance values.
  const successesAndErrors = splitErrorResults(result2);

  /* __PURE__ */ console.debug("2nd pass", successesAndErrors);

  for (const [i, routeLocation] of [
    ...successesAndErrors.successes.values(),
  ].entries()) {
    const oldLoc = successValues[i];
    routeLocation.EventPoint = oldLoc.EventPoint;
    routeLocation.Distance = oldLoc.Distance;
    routeLocation.Angle = oldLoc.Angle;
  }

  /* __PURE__ */ console.groupEnd();
  return result2;
}

/**
 * Find route locations based on the given parameters and URL.
 * @param routeLocations - the parameters for finding route locations
 * @param url - the URL for finding route locations
 * @returns - an array of route locations
 * @throws {ArcGisError} if the ArcGIS server responds with an error.
 */
export async function findRouteLocations(
  routeLocations: FindRouteLocationParameters,
  url: ElcFindUrlString = defaultFindUrl,
) {
  /* __PURE__ */ console.group(findRouteLocations.name);
  const requestUrl = new URL(url);
  /* __PURE__ */ console.debug(
    "Adding parameters to request URL...",
    requestUrl.href,
  );
  populateUrlParameters(routeLocations, requestUrl);
  /* __PURE__ */ console.debug("Request URL:", requestUrl.href);
  const response = await fetch(requestUrl);
  const resultJson = await response.text();
  const result = JSON.parse(resultJson, elcReviver) as (
    | RouteLocation<DateString, RouteGeometry>
    | ElcError
  )[];
  if (isArcGisErrorResponse(result)) {
    console.error("Error from ArcGIS server.", result);
    throw new ArcGisError(result);
  }

  /* __PURE__ */ console.groupEnd();
  return result;
}

let routes: RoutesResponse | null = null;

export interface RouteFilterOptions {
  /**
   * Determines if mainlines are included.
   * Any non-false value will be interpreted as true.
   */
  includeMainlines?: boolean;
  /**
   * Determines if ramps should be included.
   * Any non-false value will be interpreted as true.
   */
  includeRamps?: boolean;
  /**
   * A list of RRTs that will be returned.
   * Any RRTs not in the list will be skipped.
   * If undefined, all RRTs will be returned.
   */
  allowedRrts?: RrtValue[];
}

export const defaultRrts = ["SP", "CO", "AR"] as const;

const defaultFilterOptions: RouteFilterOptions = {
  includeMainlines: true,
  includeRamps: false,
  allowedRrts: [...defaultRrts],
};

export type RouteAndTypeTuple = [
  route: RouteDescription,
  routeType: RouteTypes,
];

/**
 * Enumerates through a set of routes, converting the route
 * ID strings to {@link RouteDescription} objects.
 * @param routes - The set of routes for one specific year
 * as returned by the ELC "routes" endpoint.
 * @param options - Options for filtering yielded results.
 * @yields - tuples consisting of a {@link RouteDescription} and a {@link RouteTypes}
 */
export function* enumerateRouteDescriptions(
  routes: RoutesSet,
  options: RouteFilterOptions = defaultFilterOptions,
): Generator<Readonly<RouteAndTypeTuple>, void> {
  for (const [routeId, routeType] of Object.entries(routes) as [
    RouteIdString,
    RouteTypes,
  ][]) {
    const route = new RouteDescription(routeId);
    if (
      (route.isRamp && options.includeRamps === false) ||
      (route.isMainline && options.includeMainlines === false) ||
      (options.allowedRrts !== undefined &&
        route.rrt !== null &&
        !options.allowedRrts.includes(route.rrt))
    ) {
      continue;
    }
    yield [route, routeType] as const;
  }
}

/**
 * Retrieves a list of routes from the ELC service.
 * @param url - ELC SOE "routes" endpoint URL.
 * @returns - An array of routes.
 */
export async function getRoutes(url: ElcRoutesUrlString = defaultRoutesUrl) {
  // If the routes list has already been retrieved, return it and exit.
  if (routes !== null) {
    return routes;
  }
  const requestUrl = new URL(url);
  requestUrl.searchParams.set("f", "json");
  const response = await fetch(requestUrl);
  const result = (await response.json()) as
    | RoutesResponse
    | ArcGisErrorResponse;

  if (isArcGisErrorResponse(result)) {
    throw new ArcGisError(result);
  }
  routes = result;
  return result;
}
