/**
 * Pads a number with leading zeros to make it 3 characters long.
 * @param route - Route ID
 * @returns
 */

import { RouteLocation } from "wsdot-elc";
import type { PointProperties } from "./elc";

export function padRoute(route: string) {
  if (/^\d{1,2}$/.test(route)) {
    return route.padStart(3, "0");
  }
  return route;
}
/**
 * Determines if an input geometry object has both "x" and "y"
 * properties which are both numbers.
 * @param geometry - Value from {@link RouteLocation.RouteGeometry}
 * @returns - `true` if {@link geometry} has "x" and "y" properties
 * with numeric values, `false` otherwise.
 */

export function isPoint(
  geometry: RouteLocation["RouteGeometry"]
): geometry is PointProperties {
  if (geometry == null) {
    return false;
  }
  for (const name of ["x", "y"]) {
    if (
      !Object.hasOwn(geometry as Record<string, unknown>, name) ||
      typeof (geometry as Record<string, unknown>)[name] !== "number"
    ) {
      return false;
    }
  }
  return true;
}
