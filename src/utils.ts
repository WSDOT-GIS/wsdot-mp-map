/**
 * Pads a number with leading zeros to make it 3 characters long.
 * @param route - Route ID
 * @returns
 */

import { PointProperties } from "./elc";

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

export function isPoint(geometry: unknown): geometry is PointProperties {
  return (
    geometry != null &&
    typeof geometry === "object" &&
    "x" in geometry &&
    "y" in geometry
  );
}
