// https://wadnr.maps.arcgis.com/home/item.html?id=ae861d2304da4d099e0f7841fcbfa860

import type Point from "@arcgis/core/geometry/Point";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import PortalItem from "@arcgis/core/portal/PortalItem";
import Query from "@arcgis/core/rest/support/Query";
import type FeatureLayerView from "@arcgis/core/views/layers/FeatureLayerView";
import type { AttributesObject, TypedGraphic } from "../types";

const displayField = "LEGAL_DESC_NM";

// T19-0N R2-0E S11
export type Label = `T${number}-${number}N R${number}-${number}E S${number}`;

interface SectionTownshipFeature
  extends TypedGraphic<Point, AttributesObject & { LEGAL_DESC_NM: string }> {}

/**
 * Creates a land survey layer using the specified portal item.
 *
 * @returns The created land survey layer.
 */
export function createLandSurveyLayer() {
  const portalItem = new PortalItem({
    id: "ae861d2304da4d099e0f7841fcbfa860",
    portal: {
      url: "https://wadnr.maps.arcgis.com",
      authMode: "anonymous",
    },
  });

  const layer = new FeatureLayer({
    portalItem,
    outFields: [displayField],
  });

  return layer;
}

const landSurveyLayer = createLandSurveyLayer();

type QueryFunctionParameters = Parameters<FeatureLayer["queryFeatures"]>;
type QueryParameter = NonNullable<QueryFunctionParameters[0]>;
type QueryOptions = NonNullable<QueryFunctionParameters[1]>;

const defaultOptions: __esri.QueryProperties = {
  outFields: [displayField],
  spatialRelationship: "intersects",
  returnGeometry: false,
  num: 1,
};

export async function querySectionTownship(
  query: QueryParameter & Required<Pick<QueryParameter, "geometry">>,
  layer:
    | ReturnType<typeof createLandSurveyLayer>
    | FeatureLayerView = landSurveyLayer,
  options?: QueryOptions
) {
  // Assign the default options to the query.
  query = new Query({ ...defaultOptions, ...query });
  const featureSet = await layer.queryFeatures(query, options);
  /* @__PURE__ */ console.debug("querySectionTownship", { query, featureSet });
  const features = featureSet.features as unknown as SectionTownshipFeature[];
  const label = features.map((f) => f.attributes.LEGAL_DESC_NM).at(0);
  if (!label) {
    throw new Error("No label found.");
  }
  return label;
}
