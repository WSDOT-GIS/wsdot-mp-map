import { RouteDescription, type RrtValue } from "wsdot-route-utils";
import {
  ArcGisError,
  isArcGisErrorResponse,
  type ArcGisErrorResponse,
} from "./errors";
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
  options: RouteFilterOptions = defaultFilterOptions
): Generator<
  readonly [route: RouteDescription, routeType: RouteTypes],
  void,
  unknown
> {
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
