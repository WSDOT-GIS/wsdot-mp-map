/**
 * Determines if an input value represents back mileage.
 * @param backValue - One of the following will indicate back mileage:
 * - A boolean value of `true`.
 * - A string starting with upper- or lower-case "B".
 * All other values will result in `false` being returned.
 * @returns See the conditions specified in the description for the {@link backValue} parameter.
 */
const isBack = (backValue: unknown) => backValue === true ||
    backValue === 1 ||
    (typeof backValue === "string" && /^B/i.test(backValue));
/**
 * Converts a value into a back mileage indicator.
 * @param backValue - One of the following will indicate back mileage:
 * - A boolean value of `true`.
 * - A string starting with "B", case-insensitive
 * All other values will result in an empty string being returned.
 * @returns
 * - `"B"` for any of the {@link backValue} conditions that indicate back mileage.
 * - `""` (an empty string) for any other value.
 */
export const getBackLabel = (backValue: unknown) => (isBack(backValue) ? "B" : "");
