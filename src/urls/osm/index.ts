export interface MarkerOptions {
  mlat: number;
  mlon: number;
}

export type LayersTuple = [LayerCodes, ...OverlayLayerCodes[]];

/**
 * Options for constructing a {@link OpenStreetMapUrl}
 */
export interface SearchOptions extends Partial<MarkerOptions> {
  bbox?: BBox;
  layers?: LayersTuple;
}

/**
 * A zoom level, latitude, and longitude tuple
 */
export type ZoomLatLng = [
  zoomLevel: number,
  latitude: number,
  longitude: number,
];

/**
 * A bounding box
 */
export type BBox = [
  minLongitude: number,
  minLatitude: number,
  maxLongitude: number,
  maxLatitude: number,
];

/**
 * OpenStreetMap URL layer codes
 * https://wiki.openstreetmap.org/wiki/Layer_URL_parameter
 */
export enum LayerCodes {
  // cspell: disable
  /**
   * {@link https://wiki.openstreetmap.org/wiki/Standard_tile_layer|Standard tile layer}
   */
  Standard = "M",
  /**
   * {@link https://wiki.openstreetmap.org/wiki/CyclOSM|CyclOSM}
   */
  CyclOsm = "Y",
  /**
   * {@link https://wiki.openstreetmap.org/wiki/OpenCycleMap|Cycle Map}
   */
  Cyclemap = "C",
  /**
   * {@link https://wiki.openstreetmap.org/wiki/Transport_Map|Transport Map}
   */
  TransportMap = "T",
  /**
   * {@link https://wiki.openstreetmap.org/wiki/Tracestrack|Tracestrack}
   */
  TracestrackTopo = "P",
  /**
   * {@link https://wiki.openstreetmap.org/wiki/%C3%96PNVKarte|ÖPNVKarte}
   */
  OpnvKarte = "O",
  /**
   * {@link https://wiki.openstreetmap.org/wiki/Humanitarian|Humanitarian}
   */
  Humanitarian = "H",
  // cspell: enable
}

export enum OverlayLayerCodes {
  Notes = "N",
  Data = "D",
}

/**
 * Options for constructing an {@link OpenStreetMapUrl}
 */
export interface OpenStreetMapUrlOptions {
  /**
   * Options for creating a URL search string.
   */
  search?: SearchOptions;
  zoomLatLng?: ZoomLatLng | number;
}

function isValidMarkerOptions(
  options?: Partial<MarkerOptions>,
): options is MarkerOptions {
  return options?.mlat != null && options.mlon != null;
}

/**
 * Generates an iterator that yields each key-value pair in the given
 * {@link SearchOptions} object.
 * The values are converted to strings.
 * @param options - The object containing the key-value pairs to be enumerated.
 * @yields A tuple with the key and its corresponding string value.
 */
function* enumerateSearchOptions(
  options: SearchOptions,
): Generator<readonly [keyof SearchOptions, string], void> {
  for (const [key, value] of Object.entries(options) as [
    keyof SearchOptions,
    SearchOptions[keyof SearchOptions],
  ][]) {
    let outValue: string;
    if (typeof value === "number") {
      outValue = value.toString();
    } else if (Array.isArray(value)) {
      if (value.every((v) => typeof v === "string")) {
        // Layer codes are combined with no separator.
        outValue = value.join("");
      } else {
        // Non-string values are comma-separated.
        outValue = value.join(",");
      }
    } else {
      outValue = String(value);
    }
    yield [key, outValue] as const;
  }
}

/**
 * Appends search options to the URL's search parameters.
 * @param url - The URL to append search options to.
 * @param searchOptions - The search options to append.
 */
const appendSearchOptions = (url: URL, searchOptions?: SearchOptions) => {
  if (searchOptions) {
    for (const [key, value] of enumerateSearchOptions(searchOptions)) {
      url.searchParams.set(key, value);
    }
  }
};

function createHashString(options: OpenStreetMapUrlOptions) {
  const { search } = options;
  let { zoomLatLng } = options;
  if (!Array.isArray(zoomLatLng) && isValidMarkerOptions(search)) {
    const { mlat, mlon } = search;
    if (zoomLatLng == null) {
      zoomLatLng = [19, mlat, mlon];
    } else if (typeof zoomLatLng === "number") {
      zoomLatLng = [zoomLatLng, mlat, mlon];
    }
  }

  if (Array.isArray(zoomLatLng)) {
    return `map=${zoomLatLng.join("/")}`;
  }
  return null;
}

/**
 * This class is used to create an OpenStreetMap URL.
 */
export class OpenStreetMapUrl extends URL {
  constructor(
    options: OpenStreetMapUrlOptions,
    url: URL | string = "",
    base: URL | string = "https://www.openstreetmap.org/",
  ) {
    super(url, base);
    const { search } = options;
    // Append search parameters
    appendSearchOptions(this, search);

    const hash = createHashString(options);
    if (hash) {
      this.hash = hash;
    }
  }
}
