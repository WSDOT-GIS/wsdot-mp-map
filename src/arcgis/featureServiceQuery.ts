import { request } from "@esri/arcgis-rest-request";
import type {
  AttributeValue,
  FeatureServiceQueryResponse,
  LayerDef,
  QueryResponseLayer,
} from "./typesAndInterfaces";

export const defaultUrl =
  "https://data.wsdot.wa.gov/arcgis/rest/services/DataLibrary/DataLibrary/FeatureServer/";

type FieldName = "LDNM" | "JURLBL" | "CityName"; // cspell:disable-line

/**
 * Mapping of layer IDs to output field names.
 */
const fields = new Map<number, FieldName[]>([
  // cspell:disable
  [2, ["LDNM"]],
  [3, ["JURLBL"]],
  [5, ["CityName"]],
  // cspell:enable
]);

const selectAllStatement = "1=1";

const layerDefs: LayerDef<typeof selectAllStatement, FieldName>[] = [...fields.entries()].map(
  ([layerId, outFields]) => {
    return {
      layerId,
      where: selectAllStatement,
      outFields,
    };
  }
);

/**
 * Query a feature service for features that intersect with
 * the given point.
 * @param xy - WGS 86 XY coordinates
 * @param featureServiceUrl - Feature service URL
 * @returns 
 */
export async function query(
  xy: [number, number],
  featureServiceUrl: string = defaultUrl
) {
  const queryUrl = new URL("query", featureServiceUrl);
  console.debug(`query url: ${queryUrl}`, queryUrl)
  const response = (await request(queryUrl.toString(), {
    params: {
      geometry: xy.join(","),
      inSR: 4326,
      spatialRel: "esriSpatialRelWithin",
      layerDefs,
      returnGeometry: false,
      f: "json",
    },
  })) as FeatureServiceQueryResponse;

  return response;
}

/**
 * Enumerates all of the fields and returns field name and alias
 * pairs. The output can be used to construct a Map.
 * @param layer - An element of the
 * {@link FeatureServiceQueryResponse.layers} array.
 * @yields Two-element arrays containing fields' name and alias,
 * respectively. If there is no alias then both elements in the
 * array will contain the field name.
 * @example
 * const aliasMap = new Map(enumerateFieldAliases(layer));
 */
function* enumerateFieldAliases(layer: QueryResponseLayer) {
  if (layer.fields) {
    for (const field of layer.fields) {
      const { name } = field;
      let { alias } = field;
      alias ??= name;
      yield [name, alias] as [FieldName, typeof alias];
    }
  }
}

/**
 * Enumerates through the attributes of the layers of a
 * feature service query response.
 * @param response - response from a feature service query
 * @example
 * // Create a Map.
 * const attributeMap = new Map(
 *  enumerateQueryResponseAttributes(layer)
 * );
 * @example
 * // Create an object
 * const record: Record<string, AttributeValue> = {};
 * for (const [name, value] of enumerateQueryResponseAttributes(layer)) {
 *   record[name] = value;
 * }
 */
export function* enumerateQueryResponseAttributes(
  response: FeatureServiceQueryResponse
) {
  for (const layer of response.layers) {
    for (const feature of layer.features) {
      const aliasMap = new Map<string, string>(enumerateFieldAliases(layer));
      for (const name in feature.attributes as Record<string, AttributeValue>) {
        if (Object.prototype.hasOwnProperty.call(feature.attributes, name)) {
          const value = feature.attributes[name] as AttributeValue;
          // The output of aliasMap.get should always be
          // string rather than undefined, but just in case,
          // default to name.
          const alias = aliasMap.get(name) ?? name;
          yield [alias, value] as [typeof alias, typeof value];
        }
      }
    }
  }
}
