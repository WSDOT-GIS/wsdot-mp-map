import {
  ArcGisError,
  ElcError,
  isArcGisErrorResponse,
  isElcErrorResponse,
} from "./errors";

/**
 * JSON reviver function for ELC route location objects.
 * - Empty strings are converted to `null`.
 * @param _key - The key of the current value being processed. Currently unused by this function.
 * @param value - The current value being processed.
 * @returns The processed value, with empty strings converted to `null`.
 */
export function elcReviver<T>(
  this: ThisType<T>,
  _key: string,
  value: unknown
): unknown {
  if (isArcGisErrorResponse(value)) {
    return new ArcGisError(value);
  }
  if (value === "") {
    return null;
  }
  if (isElcErrorResponse(value)) {
    return new ElcError(value);
  }
  return value;
}
