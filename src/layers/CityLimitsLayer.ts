import type Point from "@arcgis/core/geometry/Point";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import type MapView from "@arcgis/core/views/MapView";
import type FeatureLayerView from "@arcgis/core/views/layers/FeatureLayerView";
import type { AttributesObject } from "../types";

/**
 * The ArcGIS Online ID for the city limits layer.
 */
const cityLimitsId = "0b12f000a66f4d75a43ea3ac4ead01dc";
const outFields = ["CityName", "LastUpdate"];

const renderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    style: "none",
    outline: new SimpleLineSymbol({
      color: "blue",
      style: "solid",
      width: 1,
    }),
  }),
});

/**
 * The city limits layer.
 */
export const cityLimitsLayer = new FeatureLayer({
  title: "City Limits",
  portalItem: {
    id: cityLimitsId,
  },
  outFields,
  popupEnabled: false,
  renderer,
});

export default cityLimitsLayer;

/**
 * Represents the attributes for city limits.
 */
export interface CityLimitsAttributes extends AttributesObject {
  /** The name of the city. */
  CityName: string;

  /** The timestamp of the last update. */
  LastUpdate: number;

  /** The unique identifier for the city limits object. */
  OBJECTID: number | null;

  /** Indicates if the city is a county seat. */
  CountySeat: string | null;

  /** The GNIS code of the city. */
  CityGNISPlaceCode: number | null;

  /** The long-form FIPS code of the county. */
  CountyFIPSLongPlaceCode: string | null;

  /** Indicates if the city is considered a major city. */
  MajorCity: string | null;
}

/**
 * Queries the city limits based on the provided point.
 *
 * @param point - The point to query the city limits for.
 * @returns - The city limits attributes for the provided point, or null if no city limits are found.
 */
export async function queryCityLimits(point: Point, view?: MapView) {
  let layerView: FeatureLayerView | undefined;
  if (view) {
    layerView = view.allLayerViews.find(
      (lv) => lv.layer === cityLimitsLayer
    ) as FeatureLayerView;
  }
  const results = await (layerView ?? cityLimitsLayer).queryFeatures({
    geometry: point,
    spatialRelationship: "within",
    outFields: outFields,
  });

  if (results.features.length > 1) {
    console.warn("Multiple city limits found", results.features);
  }

  return (
    results.features
      .map(({ attributes }) => attributes as CityLimitsAttributes)
      .at(0) ?? null
  );
}
