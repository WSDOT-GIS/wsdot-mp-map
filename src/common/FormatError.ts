/**
 * This error is for use when a string is not in the format
 * that is expected.
 */
export default class FormatError extends Error {
  /**
   * Creates a new FormatError instance
   * @param value - The improperly formatted string
   * @param regex - A Regular Expression that shows the correct format.
   * @param message - An optional error message to override the default.
   * @param errorOptions - An optional error options object.
   */
  constructor(
    public value: string,
    public regex: RegExp,
    message?: string,
    errorOptions?: ErrorOptions,
  ) {
    super(
      message ?? `"${value}" does not match ${regex.source}`,
      errorOptions ?? {
        cause: {
          value,
          regex,
        },
      },
    );
  }
}
