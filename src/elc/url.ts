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
export const keyRegExps: Record<UrlParamMapKey, RegExp> = {
  sr: /^SR/i,
  rrt: /^R{1,2}T/i,
  rrq: /^R{1,2}Q/i,
  dir: /^D(?:IR)?/i,
  mp: /^(?:SR)?MP/i,
};

Object.seal(keyRegExps);

/**
 * Regular expression patterns to validate URL parameter values.
 */
export const valueRegExps: Record<UrlParamMapKey, RegExp> = {
  sr: /^\d{1,3}$/,
  rrt: /^[A-Z0-9]{0,2}$/i,
  rrq: /^[A-Z0-9]*$/i,
  dir: /^[ID]/i,
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
  mp: /^(?<mp>\d+(?:\.\d+)?)(?<back>B)?$/i,
};

Object.seal(valueRegExps);

function isMapKey(key: string): key is UrlParamMapKey {
  return key in keyRegExps;
}

type KeyValueRegExpTuple = [keyRegexp: RegExp, valueRegexp: RegExp];

/**
 * Convert the given key and key regular expression to map constructors.
 *
 * @param key - The key for the map constructor
 * @param keyRegExp - The regular expression for the key
 * @return The tuple containing the key and the corresponding regular expression tuple
 */
function convertToMapConstructors([key, keyRegExp]: [string, RegExp]): [
  UrlParamMapKey,
  KeyValueRegExpTuple,
] {
  if (!isMapKey(key)) {
    throw new Error(`Invalid URL parameter key: ${key}`);
  }
  const valueRegExp = valueRegExps[key];
  return [key, [keyRegExp, valueRegExp]] as const;
}
export const regExpMap = new Map(
  Object.entries(keyRegExps).map(convertToMapConstructors)
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
  const [keyRe, valueRe] = regExpMap.get(key) ?? [null, null];
  if (!keyRe || !valueRe) {
    throw new Error(`Invalid URL parameter key: ${key}`);
  }
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
 *
 * @param parameters - the input parameters object
 * @returns - an iterator for enumerating URL parameters
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
 * Parses milepost and optional back indicator from a string.
 * @param mp - The string to parse
 * @returns - The parsed milepost and back indicator
 */
function parseSrmp(mp: string): { srmp: number; back: boolean } {
  const match = valueRegExps.mp.exec(mp);

  if (!(match && match.length >= 2 && match.groups)) {
    throw new FormatError(
      mp,
      valueRegExps.mp,
      "The URL does not have valid milepost information."
    );
  }

  const srmp = parseFloat(match.groups.mp);
  const back = match.groups?.back !== undefined && /B/i.test(match.groups.back);

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
  /* __PURE__ */ console.group(getElcParamsFromUrl.name);
  /* __PURE__ */ console.debug("input url", url);
  url = typeof url === "string" ? new URL(url) : url;
  /* __PURE__ */ console.debug("parsed url", url);
  const { searchParams } = url;
  /* __PURE__ */ for (const [key, value] of searchParams.entries()) {
    /* __PURE__ */ console.debug(key, value);
  }

  let sr = getUrlSearchParameter(searchParams, "sr");
  const mp = getUrlSearchParameter(searchParams, "mp");
  /* __PURE__ */ console.debug("sr, mp", { sr, mp });

  if (!sr || !mp) {
    /* __PURE__ */ console.debug("missing sr a/o mp", { sr, mp });
    /* __PURE__ */ console.groupEnd();
    return null;
  }
  sr = padRoute(sr);
  /* __PURE__ */ console.debug("padded sr", sr);

  const rrt = getUrlSearchParameter(searchParams, "rrt") ?? "";
  const rrq = getUrlSearchParameter(searchParams, "rrq") ?? "";

  /* __PURE__ */ console.debug("rrt, rrq", { rrt, rrq });

  const { srmp, back } = parseSrmp(mp);

  const direction = getUrlSearchParameter(searchParams, "dir") ?? "i";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const route = `${sr}${rrt}${rrq}`;

  /* __PURE__ */ console.groupEnd();
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
