/**
 * Pads a number with leading zeros to make it 3 characters long.
 * @param route - Route ID
 * @returns
 */

import type { XAndY } from "./elc";

type Digit = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
type NonZeroDigit = Exclude<Digit, "0">;

export type ThreeDigit = `${Digit}${TwoDigit}`;
export type TwoDigit = `${Digit}${Digit}`;

export function padRoute<T extends ThreeDigit>(route: T): T;
export function padRoute<T extends TwoDigit>(route: T): `0${T}`;
export function padRoute<T extends `${NonZeroDigit}`>(route: T): `00${T}`;
/**
 * Pads the route with leading zeros if it is a single or double digit number.
 *
 * @param route - The route to be padded.
 * @return The padded route. If the {@link route} is not a single- or double-
 * digit number, the original {@link route} is returned.
 */
export function padRoute(route: string): string {
  if (/^[1-9]$/.test(route) && /^\d{2}$/.test(route)) {
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

export function isPoint(geometry: unknown): geometry is XAndY {
  return (
    geometry != null &&
    typeof geometry === "object" &&
    "x" in geometry &&
    "y" in geometry
  );
}
