// https://data.wsdot.wa.gov/arcgis/rest/services/Shared/MilepostValues/MapServer/3/query?geometry=-122.29193564534154,47.34345774504132&geometryType=esriGeometryPoint&inSR=4326&distance=300&units=esriSRUnit_Foot&outFields=RouteID,ARM,SRMP,Direction,AheadBackInd,LRS_Date&returnGeometry=true&f=json

type DistanceUnits =
  `esriSRUnit_${"Meter" | "StatuteMile" | "Foot" | "Kilometer" | "NauticalMile" | "USNauticalMile"}`;

/**
 * Query options for the milepost service
 */
export interface QueryOptions {
  geometry: [number, number]; //[-122.29193564534154, 47.34345774504132]
  inSR?: 4326 | 3857 | 2927;
  distance?: number; // 300;
  units?: DistanceUnits;
}

/**
 * Full options for the milepost service
 */
interface FullOptions extends Required<QueryOptions> {
  geometryType: "esriGeometryPoint";
  outFields: [
    "RouteID",
    "ARM",
    "SRMP",
    "Direction",
    "AheadBackInd",
    "LRS_Date",
  ];
  returnGeometry: true;
  f: "json";
}

/**
 * Error response from a query of the milepost service.
 * When the query fails it still returns a 200 (OK) status code.
 */
interface QueryError {
  error: {
    code: number;
    message: string;
    details: string[];
  };
}
/**
 * A field from the query response
 */
interface Field {
  name: string;
  type: `esriFieldType${string}`;
  alias: string;
  length?: number;
}

/**
 * Spatial reference from the query response.
 */
interface SpatialReference {
  wkid: number;
  latestWkid?: number;
}

/**
 * Field aliases from the query response.
 * Key is the field name, value is the alias.
 */
interface FieldAliases {
  [key: string]: string;
  RouteID: string;
  ARM: string;
  SRMP: string;
  Direction: string;
  AheadBackInd: string;
  LRS_Date: string;
}

/**
 * Successful result from a query of the milepost service.
 */
interface QueryResult {
  displayFieldName: string;
  fieldAliases: FieldAliases;
  geometryType: `esriGeometry${string}`;
  spatialReference: SpatialReference;
  fields: Field[];
  features: MilepostFeature[];
}

interface MilepostAttributes {
  RouteID: string;
  ARM: number;
  SRMP: number;
  Direction: "i" | "d" | "r";
  AheadBackInd: "A" | "B";
  LRS_Date: Date;
}

export interface MilepostFeature {
  attributes: MilepostAttributes;
  geometry: {
    x: number;
    y: number;
  };
}

const defaultOptions: Omit<FullOptions, "geometry"> = {
  geometryType: "esriGeometryPoint",
  inSR: 4326,
  distance: 300,
  units: `esriSRUnit_Foot`,
  outFields: [
    "RouteID",
    "ARM",
    "SRMP",
    "Direction",
    "AheadBackInd",
    "LRS_Date",
  ],
  returnGeometry: true,
  f: "json",
};

/**
 * Combines the provided query options with the default options
 * to create a full set of options.
 *
 * @param options - the query options to be combined with
 * the default options
 * @return the combined full set of options
 */
function addMissingQueryOptions(options: QueryOptions): FullOptions {
  return { ...defaultOptions, ...options };
}

/**
 * Generator function that enumerates properties of the given
 * options object and yields key-value pairs, with all values
 * yielded as their string equivalents for use with
 * {@link URLSearchParams}.
 *
 * @param options - the options object to enumerate
 * @returns - the key-value pairs with modified values
 */
function* enumerateProperties(options: FullOptions) {
  for (const [key, value] of Object.entries(options) as [
    keyof FullOptions,
    FullOptions[keyof FullOptions],
  ][]) {
    if (typeof value === "number" || typeof value === "boolean") {
      yield [key, value.toString()];
    } else if (Array.isArray(value)) {
      const stringValue = value.join(",");
      yield [key, stringValue];
    } else {
      yield [key, value];
    }
  }
}

/**
 * A string containing an ArcGIS Map or Feature layer URL.
 */
export type LayerUrlString =
  `https://${string}/arcgis/rest/services/${string}/${"Map" | "Feature"}Server/${number}/`;

/**
 * Checks if the input is a valid LayerUrlString.
 *
 * @param urlString - the input to be checked
 * @return true if input is a valid LayerUrlString, false otherwise
 */
export function isAValidUrlString(
  urlString: unknown
): urlString is LayerUrlString {
  if (typeof urlString !== "string") {
    return false;
  }
  const re = /(?:(?:Map)|(?:Feature))Server\/\d+\/?$/;
  return re.test(urlString) !== null;
}

/**
 * Parses the given date string and returns a Date object.
 *
 * @param date - The date string to be parsed. "YYYYMMDD" format.
 * @return If the date string is valid, the parsed Date object.
 * Otherwise, {@link date} is returned.
 */
function parseLrsDate(date: string) {
  const re = /^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})$/;

  const match = re.exec(date);
  if (!match?.groups) {
    /* @__PURE__ */ console.warn(
      `Date was not in expected format. Should match ${re.source}, but got ${date}`,
      date
    );
    return date;
  }

  const [year, month, day] = [
    match.groups.year,
    match.groups.month,
    match.groups.day,
  ].map((v, i) => {
    const output = parseInt(v, 10);
    // We have to subtract 1 from the month because the
    // JavaScript date object numbers months starting
    // with zero instead of one.
    // Confusingly it ONLY does this with months.
    if (i === 1) {
      return output - 1;
    }
    return output;
  });

  return new Date(year, month, day);
}

/**
 * A reviver function for parsing the query response,
 * converting the LRS_Date string values to {@link Date} objects.
 *
 * @this - The context in which the function is called
 * @param key - The key from the JSON object
 * @param value - The value associated with the key
 * @returns - The processed value or the original value if not applicable
 */
const reviver = function (this: unknown, key: string, value: unknown) {
  if (key === "LRS_Date" && typeof value === "string") {
    return parseLrsDate(value);
  }
  return value;
};

/**
 * Finds the nearest milepost based on the given query options and layer URL.
 *
 * @param query - The query options for finding the nearest milepost.
 * @param layerUrl - The URL of the map server layer.
 * @return The result of the query, or an error if the query fails.
 */
export async function findNearestMilepost(
  query: QueryOptions,
  layerUrl: LayerUrlString = "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/MilepostValues/MapServer/3/"
) {
  // Append trailing slash to layerUrl if missing.
  // Otherwise appending "query" would overwrite the
  // layer ID portion of the URL.
  if (!layerUrl.endsWith("/")) {
    layerUrl += "/";
  }
  // Create the query URL.
  const queryUrl = new URL("query", layerUrl);
  // Add the search parameters from the query options.
  for (const [key, value] of enumerateProperties(
    // Add the missing query properties that ArcGIS needs,
    // but will always be the same for this function, so
    // the caller doesn't need to provide them.
    addMissingQueryOptions(query)
  )) {
    queryUrl.searchParams.set(key, value);
  }

  // Execute the query.
  const response = await fetch(queryUrl);

  // Get the response text. Using this instead of response.json()
  // so that we can use a custom reviver function.
  const resultJson = await response.text();
  // Parse the JSON text.
  const result = JSON.parse(resultJson, reviver) as QueryResult | QueryError;
  // Detect an error result.
  if (isError(result)) {
    throw new Error(result.error.message, {
      cause: result.error,
    });
  }
  // At this point, the result is a successful one, so return it.
  return result;
}

/**
 * Checks if the result is a {@link QueryError}.
 * This is needed because ArcGIS returns 200 (OK)
 * status code even when there is an error.
 *
 * @param result - The result to check
 * @returns `true` if result is a QueryError, `false` otherwise
 */
const isError = (result: QueryResult | QueryError): result is QueryError =>
  Object.hasOwn(result, "error");
