/*
From SnagMP docs
https://snagmp.com/gist.html

## Creating Map Links
Creating a hyperlink to a State Route location is simple. Mimic the url
structure for the following link and modify the SR and MP values to your
desired location. Example:
www.snagmp.com/link.php?SR=542&MP=57.17

To create a hyperlink to a route with unique directional milepost data,
such as an interstate, use the following url structure.
DIR represents direction.
The options are I for increasing milepost or D for decreasing milepost.
www.snagmp.com/link2.php?SR=5&MP=257.70&DIR=I

To create a hyperlink to a route with a specific route type, such as a "SPUR", 
use the following url structure. RT represents Route Type. 
The options are SP for Spur, CO for Couplet and AR for Alternate.
www.snagmp.com/link3.php?SR=503&MP=35.23&RT=SP
*/

import {
  type ValidRouteLocationForMPInput,
  type RouteGeometry,
  findRouteLocations,
  routeLocationToGraphic,
  type FindNearestRouteLocationParameters,
  type FindRouteLocationParameters,
} from ".";
import { addGraphicsToLayer } from "../addGraphicsToLayer";
import FormatError from "../common/FormatError";
import { padRoute } from "../utils";

type UrlParamMapKey = "sr" | "rrt" | "rrq" | "dir" | "mp";

/**
 * Regular expression patterns to validate URL parameters.
 */
const keyRegExps = new Map([
  ["sr", /^SR/i],
  ["rrt", /^R{1,2}T/i],
  ["rrq", /^R{1,2}Q/i],
  ["dir", /^D(?:IR)?/i],
  ["mp", /^(?:SR)?MP/i],
] as const);

/**
 * Regular expression patterns to validate URL parameter values.
 */
const valueRegExps = new Map([
  ["sr", /^\d{1,3}$/],
  ["rrt", /^[A-Z0-9]{0,2}$/i],
  ["rrq", /^[A-Z0-9]*$/i],
  ["dir", /^[ID]/i],
  /**
   * Regular expression pattern to validate and extract milepost information from a string.
   * It expects a numeric value that can be an integer or a decimal, and an optional 'B' character
   * indicating back mileage if present.
   *
   * The match will have the following groups:
   * - `mp` - The numeric value of the milepost
   * - `back` - The 'B' character if present
   * @example
   * // matches "123", "123.45", "123B", "123.45B"
   */
  ["mp", /^(?<mp>\d+(?:\.\d+)?)(?<back>B)?$/i],
] as const);

type KeyValueRegExpTuple = [keyRegexp: RegExp, valueRegexp: RegExp];

const regExpMap = new Map<UrlParamMapKey, KeyValueRegExpTuple>(
  [...keyRegExps.entries()].map(([key, value]) => [
    key,
    [value, valueRegExps.get(key)!],
  ])
);

/**
 * Gets a value from the URL search parameters based on the provided key.
 * @param urlParams - the URL search parameters
 * @param key - the key to search for
 * @returns - the value associated with the key
 */
export function getUrlSearchParameter(
  urlParams: URLSearchParams,
  key: UrlParamMapKey
) {
  const reTuple = regExpMap.get(key);
  if (!reTuple) {
    throw new Error(`Invalid URL parameter key: ${key}`);
  }
  const [keyRe, valueRe] = reTuple;
  let output: string | null = null;
  for (const [k, v] of urlParams.entries()) {
    if (!keyRe.test(k)) {
      continue;
    }
    if (valueRe.test(v)) {
      output = v;
    }
  }
  return output;
}

/**
 * Generates an enumerated list of URL parameters based on the input parameters object.
 * @param parameters - the input parameters object
 * @yields - Tuples of property name and value names that can be used to set URL parameters.
 * @see {@link populateUrlParameters} for example usage.
 */
export function* enumerateUrlParameters(
  parameters: FindNearestRouteLocationParameters | FindRouteLocationParameters
): Generator<[key: string, value: string], void, unknown> {
  yield ["f", "json"];
  for (const [key, value] of Object.entries(parameters)) {
    if (typeof value === "string") {
      yield [key, value];
      continue;
    }
    let outValue: string;
    if (value instanceof Date) {
      // Convert date to string format described here:
      // https://tools.ietf.org/html/rfc3339#section-5.6
      outValue = value.toISOString().replace(/T.+$/, "");
    } else if (Array.isArray(value)) {
      outValue = JSON.stringify(value);
    } else {
      outValue = `${value}`;
    }
    yield [key, outValue];
  }
}

export function populateUrlParameters(
  parameters: FindNearestRouteLocationParameters | FindRouteLocationParameters,
  requestUrl: URL
) {
  for (const [key, value] of enumerateUrlParameters(parameters)) {
    requestUrl.searchParams.set(key, value);
  }
}

/**
 * Parses a string representing a milepost and an optional
 * back indicator from a string.
 *
 * The string is expected to be in the form "XXX.YYY[B]", where "XXX.YYY" is
 * the milepost, and "[B]" is an optional indicator that the milepost is on
 * the back side of the route. "XXX.YYY" is parsed using a regular expression
 * that is specified in the valueRegExps mapping under the key "mp".
 *
 * The regular expression is expected to have a named capture group
 * "mp" that captures the milepost value as a string. If there is
 * an optional named capture group "back" that is present and has
 * a value of "B", then the back indicator is set to true.
 *
 * If the input string does not match the regular expression, or
 * if the named capture groups are not present or are not in the
 * expected format, a {@link FormatError} is thrown.
 *
 * @param mp - The string to parse
 * @returns - The parsed milepost and back indicator
 */
function parseSrmp(mp: string): { srmp: number; back: boolean } {
  // Retrieve the regular expression from the valueRegExps mapping
  const mpValueRegexp = valueRegExps.get("mp");

  // Throw an error if the regular expression is not present in the mapping
  if (!mpValueRegexp) {
    throw new TypeError(
      `No regular expression found for key 'mp' in valueRegExps`
    );
  }

  // Attempt to match the input string against the regular expression
  const match = mpValueRegexp.exec(mp);

  // Throw a FormatError if the string does not match the regular expression
  if (!(match && match.length >= 2 && match.groups)) {
    throw new FormatError(
      mp,
      mpValueRegexp,
      "The URL does not have valid milepost information."
    );
  }

  // Parse the milepost value from the named capture group "mp"
  const srmp = parseFloat(match.groups.mp);

  // If there is a named capture group "back" with a value of "B", set the
  // back indicator to true. Otherwise, set it to false.
  const back = match.groups?.back !== undefined && /B/i.test(match.groups.back);

  // Return the milepost and back indicator
  return { srmp, back };
}

/**
 * Retrieves and processes route and milepost information from the URL.
 * @param url - The URL to process. If omitted, the browsers {@link window.location.href} is used.
 * @returns Location object with route, milepost, direction, and date information
 */
export function getElcParamsFromUrl(
  url: string | URL = window.location.href
): ValidRouteLocationForMPInput<Date, RouteGeometry> | null {
  url = typeof url === "string" ? new URL(url) : url;
  const { searchParams } = url;

  let sr = getUrlSearchParameter(searchParams, "sr");
  const mp = getUrlSearchParameter(searchParams, "mp");

  if (!sr || !mp) {
    return null;
  }
  sr = padRoute(sr);

  const rrt = getUrlSearchParameter(searchParams, "rrt") ?? "";
  const rrq = getUrlSearchParameter(searchParams, "rrq") ?? "";

  const { srmp, back } = parseSrmp(mp);

  const direction = getUrlSearchParameter(searchParams, "dir") ?? "i";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const route = `${sr}${rrt}${rrq}`;

  return {
    Route: route,
    Srmp: srmp,
    Back: back,
    Decrease: /dD/i.test(direction),
    ReferenceDate: today,
    ResponseDate: today,
  };
}

export async function callElcFromUrl(
  milepostLayer: __esri.FeatureLayer,
  options: Pick<FindRouteLocationParameters, "outSR"> = { outSR: 3857 }
) {
  const routeLocation = getElcParamsFromUrl();

  if (!routeLocation) {
    return null;
  }

  const elcResults = await findRouteLocations({
    locations: [routeLocation],
    outSR: options.outSR,
  });

  if (elcResults.length < 1) {
    return null;
  }

  const graphics = elcResults.map((r) => routeLocationToGraphic(r));

  return addGraphicsToLayer(milepostLayer, graphics);
}
