import type { AttributesObject } from "../types";
import type Point from "@arcgis/core/geometry/Point";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Query from "@arcgis/core/rest/support/Query";
import FeatureLayerView from "@arcgis/core/views/layers/FeatureLayerView";

const layerUrl =
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer/0/";

export const countyBoundariesLayer = new FeatureLayer({
  url: layerUrl,
});

interface CountyAttributes extends AttributesObject {
  JURLBL: string;
}

let countyBoundariesLayerView: FeatureLayerView | undefined;

const handle = countyBoundariesLayer.on("layerview-create", ({ layerView }) => {
  if (layerView instanceof FeatureLayerView) {
    countyBoundariesLayerView = layerView;
  }
  handle.remove();
});

type FeatureLayerViewMixinQueryFeaturesOptions = NonNullable<
  Parameters<FeatureLayerView["queryFeatures"]>[1]
>;

/**
 * Queries the county boundaries based on a given point and returns the county name.
 * @param point - the point to query county boundaries for
 * @param options - (optional) additional options for the query
 * @returns the name of the county
 */
export async function queryCountyBoundaries(
  point: Point,
  options?: FeatureLayerViewMixinQueryFeaturesOptions,
): Promise<string> {
  const query = new Query({
    geometry: point,
    num: 1,
    spatialRelationship: "within",
    outFields: ["JURLBL"],
  });
  const results = await (
    countyBoundariesLayerView ?? countyBoundariesLayer
  ).queryFeatures(query, options);

  const getCounty = (f: __esri.Graphic): string =>
    (f.attributes as CountyAttributes).JURLBL;

  const county = results.features.map(getCounty).at(0);

  if (!county) {
    throw new Error("Could not find county");
  }
  return county;
}
