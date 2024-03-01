/**
 * JSON reviver function for ELC route location objects.
 * - Empty strings are converted to `null`.
 *
 * @param _key - The key of the current value being processed. Currently unused by this function.
 * @param value - The current value being processed.
 * @return The processed value, with empty strings converted to `null`.
 */
export function elcReviver<T>(
  this: ThisType<unknown>,
  _key: string,
  value: T
): typeof value | null {
  if (value === "") {
    return null;
  }
  return value;
}
