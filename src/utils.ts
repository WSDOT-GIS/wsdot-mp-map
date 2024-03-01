/**
 * Pads a number with leading zeros to make it 3 characters long.
 * @param route - Route ID
 * @returns
 */

type Digit = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
type NonZeroDigit = Exclude<Digit, "0">;

export type ThreeDigit = `${Digit}${TwoDigit}`;
export type TwoDigit = `${Digit}${Digit}`;

export function padRoute<T extends ThreeDigit>(route: T): T;
export function padRoute<T extends TwoDigit>(route: T): `0${T}`;
export function padRoute<T extends `${NonZeroDigit}`>(route: T): `00${T}`;
export function padRoute<
  T extends Exclude<string, ThreeDigit | TwoDigit | NonZeroDigit>,
>(route: T): string;
/**
 * Pads the route with leading zeros if it is a single or double digit number.
 *
 * @param route - The route to be padded.
 * @return The padded route. If the {@link route} is not a single- or double-
 * digit number, the original {@link route} is returned.
 */
export function padRoute(route: string): string {
  const re = /^\d{1,3}$/i;
  if (re.test(route)) {
    return route.padStart(3, "0");
  }
  return route;
}
/**
 * Returns the current date with the time set to 00:00:00:00.
 *
 * @return The current date with the time set to 00:00:00:00.
 */
export function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}
