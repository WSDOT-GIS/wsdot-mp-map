/**
 * @module Used for working with [GeoHack](https://www.mediawiki.org/wiki/GeoHack) URLs.
 * @see {@link https://www.mediawiki.org/wiki/GeoHack GeoHack docs} for more information.
 */

import type { LatLngExpression, LatLngLiteral, LatLngTuple } from "../types";

function isLatLngTuple(
  latLng: Readonly<LatLngTuple>
): latLng is Readonly<LatLngTuple>;
function isLatLngTuple(latLng: LatLngTuple): latLng is LatLngTuple;
function isLatLngTuple(latLng: LatLngLiteral): false;
function isLatLngTuple(
  latLng: LatLngExpression
): latLng is LatLngTuple | Readonly<LatLngTuple>;
/**
 * Detects if the input value is a {@link LatLngTuple}.
 * @param latLng - A {@link LatLngExpression}
 * @returns Returns true if it is a {@link LatLngTuple}, false otherwise.
 */
function isLatLngTuple(
  latLng: LatLngExpression
): latLng is LatLngTuple | Readonly<LatLngTuple> {
  return (
    Array.isArray(latLng) &&
    typeof latLng[0] === "number" &&
    typeof latLng[1] === "number"
  );
}

/**
 * > Coordinates, optionally followed by other location-related parameters (underscore-separated, in a `key:value` fomat). Example: `1.292836_N_103.856878_E_type:landmark_dim:500`
 * >
 * > The coordinates are in one of the formats `D_M_S_N_D_M_S_E`, `D_M_N_D_M_E`, `D_N_D_E`, or `D;D` where `D` is degrees, `M` is minutes, `S` is seconds, and `NS/EWO` are the directions. Decimal numbers are accepted, especially for the last position.
 * >
 * > _TODO Document me_: boxed range syntax `D_N_D_E_to_D_N_D_E`
 * >
 * > Restrictions:
 * >
 * > - Should be compatible with MediaWiki titles: a 255 byte length limit, `< > [ ] |` are invalid, and spaces and underscore are treated the same.
 * > - `&` causes problems if it not percent encoded in the URL.
 * > - Avoid non-ASCII characters, as some browsers incorrectly handle copying and pasting.
 * > - Avoid the equal sign (=) since it causes issues with unnamed template parameters (e.g., {{[Coord](https://en.wikipedia.org/wiki/en:Template:Coord "w:en:Template:Coord")}})
 * > - The characters `& < > "` are escaped in the HTML to prevent exploits.
 */
export interface GeoHackParamsParams {
  coordinates: LatLngTuple;
}

export interface GeoHackParams {
  language?: string;
  pagename?: string;
  // TODO: Specify type
  params?: unknown;
}

/**
 * Creates a [GeoHack](https://www.mediawiki.org/wiki/GeoHack) URL.
 * @param latLng - A latitude,longitude value.
 * @param geohackUrl - The URL to GeoHack. You do not need to change this unless they move their website.
 * @returns - A GeoHack URL
 * @example
 * const url = createGeoHackUrl([45.6448,-122.6617]);
 * // Returned URL will be "https://geohack.toolforge.org/geohack.php?params=45.6448;-122.6617"
 */
export function createGeoHackUrl(
  latLng: LatLngExpression,
  geohackUrl = "https://geohack.toolforge.org/geohack.php"
) {
  // Convert to an array if it isn't already
  latLng = isLatLngTuple(latLng) ? latLng : [latLng.lat, latLng.lng];

  // Join the two numbers with a semicolon
  const params = latLng.join(";");

  const outUrl = new URL(geohackUrl);
  outUrl.searchParams.set("params", params);

  return outUrl;
}
