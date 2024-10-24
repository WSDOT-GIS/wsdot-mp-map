/**
 * Constructs Google Maps URLs.
 * @see https://developers.google.com/maps/documentation/urls/get-started
 */

/* 
Example URL:
https://www.google.com/maps?ll=47.6091,-120.2421&q=47.6091,-120.2421&hl=en&t=h&z=11

FYI, gets converted to:
https://www.google.com/maps/place/47%C2%B036'32.8%22N+120%C2%B014'31.6%22W/@47.6091,-120.2421,45607m/data=!3m1!1e3!4m4!3m3!8m2!3d47.6091!4d-120.2421?hl=en&entry=ttu
...but we won't be constructing this version.
*/
import type { LatLngTuple } from "../../common/types";

/**
 * Options for constructing a Google Maps URL.
 */
export interface GoogleMapsUrlOptions extends Record<string, unknown> {
  /**
   * The latitude and longitude of the center of the map.
   */
  ll?: LatLngTuple;
  /**
   * Language code, e.g. en, de, fr, etc.
   */
  hl?: string;
  /**
   * Zoom level.
   */
  zoom?: number;
  /**
   * Type of map.
   */
  t?: string;
  /**
   * The query string.
   */
  q?: string | LatLngTuple;
}

/**
 * Options for {@link convertToString}.
 */
interface ConvertToStringOptions {
  /**
   * This value will be used for null values.
   */
  nullString?: string;
  /**
   * This value will be used for undefined values.
   */
  undefinedString?: string;
  /**
   * This value will be used to when encountering an empty array.
   */
  emptyArrayString?: string;
}

/**
 * Converts a value to a string representation.
 * @param value - The value to convert.
 * @param options - The options for the conversion.
 * @returns The string representation of the value,
 * or undefined if the value is not convertible.
 */
function convertToString(
  value: unknown,
  options: ConvertToStringOptions = {},
): string | undefined {
  // Just return the value if it's already a string.
  if (typeof value === "string") {
    return value;
  }

  /* 
  The returned values for nulls and undefined are
  determined by the "options" parameter.
  */
  if (value === null) {
    return options.nullString;
  } else if (value === undefined) {
    return options.undefinedString;
  }

  if (Array.isArray(value)) {
    // Return the empty array value specified by the options parameter.
    if (value.length === 0) {
      return options.emptyArrayString;
    }
    // Join the array values with a comma.
    return value.map((v) => convertToString(v)).join(",");
  } else if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  ) {
    // Convert numbers and booleans to strings.
    return value.toString();
  } else if (
    Object.hasOwn(value, "toString") &&
    typeof value.toString === "function"
  ) {
    /* eslint-disable @typescript-eslint/no-base-to-string */
    const valueAsString = value.toString(); // NOSONAR
    /* eslint-enable */
    if (value === "[object Object]") {
      return JSON.stringify(value);
    }
    return valueAsString;
  } else {
    return String(value);
  }
}

type URLConstructorParameters = ConstructorParameters<typeof URL>;

const defaultUrl = new URL("https://www.google.com/maps/");
const placeUrl = new URL("place/", defaultUrl);
/**
 * Represents a Google Maps URL.
 */
export class GoogleUrl extends URL implements Pick<GoogleMapsUrlOptions, "ll"> {
  /**
   * Retrieves the latitude and longitude values from the URL's query parameters.
   * @returns An array containing the latitude and longitude values.
   */
  public get ll(): LatLngTuple | undefined {
    const llStrings = this.searchParams.get("ll")?.split(",");
    if (!llStrings) {
      return undefined;
    }
    if (llStrings.length < 2) {
      return undefined;
    }
    return llStrings.map((s) => Number.parseFloat(s)).slice(0, 1) as LatLngTuple;
  }

  /**
   * Constructs a new GoogleUrl object with the given options and base URL.
   * @param options - The options for constructing the URL.
   * @param base - The base URL for the Google Maps website. Defaults to "https://www.google.com/maps/".
   */
  constructor(
    options: GoogleMapsUrlOptions,
    base: URLConstructorParameters[1] = defaultUrl,
  ) {
    // Create the URL.
    super("", base);

    // Add the options as search parameters, converting to string when necessary.
    for (const [key, value] of Object.entries(options)) {
      const convertedValue = convertToString(value, {
        nullString: undefined,
        undefinedString: undefined,
      });
      if (convertedValue) {
        this.searchParams.set(key, convertedValue);
      }
    }
  }

  /**
   * Creates a new GoogleUrl object from the given latitude and longitude coordinates.
   * @param latlng - The latitude and longitude coordinates.
   * @returns The newly created GoogleUrl object.
   */
  public static fromLatLng(...latlng: LatLngTuple): GoogleUrl {
    return new GoogleUrl({}, new URL(latlng.join(","), placeUrl));
  }
}
