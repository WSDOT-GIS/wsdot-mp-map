import { request } from "@esri/arcgis-rest-request";
import type { Feature } from "arcgis-rest-api";
import { gpsWkid } from "../constants";
import type {
  FeatureServiceQueryResponse,
  LayerDef,
  QueryResponseLayer,
} from "./typesAndInterfaces";

export const defaultUrl =
  "https://data.wsdot.wa.gov/arcgis/rest/services/DataLibrary/DataLibrary/FeatureServer";

/**
 * Mapping of layer IDs to output field names.
 */
const fields = new Map([
  // cspell:disable
  [2, ["LDNM"]],
  [3, ["JURLBL"]],
  [5, ["CityName"]],
  // cspell:enable
]);

const layerDefs: LayerDef[] = [...fields.entries()].map(
  ([layerId, outFields]) => {
    return {
      layerId,
      where: "1=1",
      outFields,
    };
  }
);

export async function query(
  xy: [number, number],
  featureServiceUrl: string = defaultUrl
) {
  const response = (await request(featureServiceUrl, {
    params: {
      geometry: xy.join(","),
      inSR: gpsWkid,
      spatialRel: "esriSpatialRelWithin",
      layerDefs,
      returnGeometry: false,
      f: "json",
    },
  })) as FeatureServiceQueryResponse;

  return response;
}

export type AttributeValue = string | number | boolean | null;

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
      alias = alias || name;
      yield [name, alias] as [string, string];
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
      const aliasMap = new Map(enumerateFieldAliases(layer));
      for (const name in feature.attributes as Record<string, AttributeValue>) {
        if (Object.prototype.hasOwnProperty.call(feature.attributes, name)) {
          const value = feature.attributes[name];
          const alias = aliasMap.get(name) ?? name;
          yield [alias, value] as [string, AttributeValue];
        }
      }
    }
  }
}
