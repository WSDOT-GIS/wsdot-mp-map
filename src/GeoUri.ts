import { LatLngTuple } from "leaflet";

export type AuthorityUppercase = "EPSG" | "ESRI";
export type Authority = AuthorityUppercase | Lowercase<AuthorityUppercase>;

export type UncertaintyName = "u" | "U";
export type CrsName = "crs" | "CRS";

export type Crs = `${Authority}:${number}`;

export type KeyValuePair =
  | `${CrsName}=${Crs}`
  | `${UncertaintyName}=${number}`
  | `${string}=${string}`;

export type KeyValuePairWithSemicolonPrefix = `;${KeyValuePair}`;

export type CoordinateList = `${number},${number}${
  // optional altitude
  `,${number}` | ""
}`;

export type BareGeoUri =
  | `geo:${CoordinateList}`
  | `geo:${CoordinateList}${KeyValuePairWithSemicolonPrefix}`
  | `geo:${CoordinateList}${KeyValuePairWithSemicolonPrefix}${KeyValuePairWithSemicolonPrefix}`
  | `geo:${CoordinateList}${KeyValuePairWithSemicolonPrefix}${KeyValuePairWithSemicolonPrefix}${KeyValuePairWithSemicolonPrefix}`;

/**
 * A [GeoURI](https://geouri.org)
 *
 * @see {@link https://geouri.org GeoURI}
 *
 * Examples from [RFC 5870](https://www.rfc-editor.org/rfc/rfc5870)
 * > * `geo:323482,4306480;crs=EPSG:32618;u=20`
 * > * `geo:37.786971,-122.399677;crs=Moon-2011;u=35`
 * > * `geo:323482,4306480;CRS=epsg:32718;U=20;mapcolors=for_daltonic`
 *
 * From [Android Developers > Docs > Guides > Common Intents](https://developer.android.com/guide/components/intents-common#Maps)
 *
 * > * `geo:latitude,longitude`
 * >
 * >     Show the map at the given longitude and latitude.
 * >
 * >     Example: `geo:47.6,-122.3`
 * >
 * > * `geo:latitude,longitude?z=zoom`
 * >
 * >     Show the map at the given longitude and latitude at a certain zoom level. A zoom level of 1 shows the whole Earth, centered at the given lat,lng. The highest (closest) zoom level is 23.
 * >
 * >     Example: `geo:47.6,-122.3?z=11`
 * >
 * > * `geo:0,0?q=lat,lng(label)`
 * >
 * >     Show the map at the given longitude and latitude with a string label.
 * >
 * >     Example: `geo:0,0?q=34.99,-106.61(Treasure)`
 * >
 * > * `geo:0,0?q=my+street+address`
 * >
 * >     Show the location for "my street address" (may be a specific address or location query).
 * >
 * >     Example: `geo:0,0?q=1600+Amphitheatre+Parkway%2C+CA`
 * >
 * >
 * >     Note: All strings passed in the geo URI must be encoded. For example, the string `1st & Pike, Seattle` should become `1st%20%26%20Pike%2C%20Seattle`. Spaces in the string can be encoded with `%20` or replaced with the plus sign (`+`).
 */
export type GeoUriString = `${BareGeoUri}${`?${string}` | ""}`;

export type GeoUrlSearchParameters = Record<string, string> & {
  /**
   * Used for address query
   */
  q?: string;
  /**
   * Zoom level
   */
  z?: number;
};

export interface GeoUrlOptions {
  /** Latitude */
  x: number;
  /** Longitude */
  y: number;
  /** Altitude */
  altitude?: number;
  /**
   * Coordinate Reference system.
   * Not needed for 4326
   */
  crs?: Crs;
  /**
   * uncertainty
   */
  uncertainty?: number;
  /** Label  */
  label?: string;
  /**
   * Additional search parameters
   */
  search?: GeoUrlSearchParameters;
}

export function createGeoUriString(options: GeoUrlOptions) {
  const { x, y, altitude } = options;

  /**
   * Create a mapping for additional,
   * semicolon separated parameters.
   */
  const argsMap = new Map<string, string>();
  if (options.crs) {
    argsMap.set("crs", options.crs);
  }
  if (options.uncertainty) {
    argsMap.set("u", options.uncertainty.toString());
  }

  /**
   * Enumerate over the items in the Map and yield
   * "key=value" strings.
   * @param map - A Map.
   */
  function* enumerateMapAsKeyEqualsValueStrings<K, V>(map: Map<K, V>) {
    for (const keyValuePair of map) {
      yield keyValuePair.join("=");
    }
  }

  // Create array of coordinates, optionally including altitude if provided.
  const coords = altitude
    ? ([y, x, altitude] as [number, number, number])
    : ([y, x] as [number, number]);

  // Construct the URL.
  let url = `geo:${coords.join(",")}`;

  // Add additional URL parameters if they have been provided.
  if (argsMap.size > 0) {
    url = [url, ...enumerateMapAsKeyEqualsValueStrings(argsMap)].join();
  }

  // Add the optional label if present.
  if (options.label) {
    url += `(${options.label})`;
  }

  // Add search parameters if provided.
  if (options.search) {
    const search = new URLSearchParams(options.search);
    url = [url, search].join("?");
  }

  return url as GeoUriString;
}

/**
 * An object representing a GeoURI
 */
export class GeoUrl extends URL {
  x: number;
  y: number;
  altitude?: number;
  crs?: Crs;
  uncertainty?: number;
  // label?: string;

  constructor(options: GeoUrlOptions) {
    super(createGeoUriString(options));
    this.x = options.x;
    this.y = options.y;
    this.altitude = options.altitude;
    this.crs = options.crs;
    this.uncertainty = options.uncertainty;
    // this.label = options.label;
  }

  toString(): GeoUriString {
    return super.toString() as GeoUriString;
  }

  
  public get latLngTuple() : LatLngTuple {
    return [this.y, this.x];
  }

  
  public get xyTuple() : [number, number] {
    return [this.x, this.y];
  }
  
  
}

export default GeoUrl;
