import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import "@fontsource/overpass";
import { defaultSymbol } from "./MilepostIcon";
import waExtent from "./WAExtent";
import { objectIdFieldName } from "./types";

const renderer = new SimpleRenderer({
  symbol: defaultSymbol,
});

const fields = [
  {
    name: objectIdFieldName,
    type: "oid",
  },
  {
    name: "Route",
    type: "string",
  },
  {
    name: "Srmp",
    type: "double",
  },
  {
    name: "Back",
    type: "string",
  },
  {
    name: "Township Subdivision",
    type: "string",
  },
  { name: "County", type: "string" },
  {
    name: "City",
    type: "string",
  },
] as __esri.FieldProperties[];

/**
 * Creates the {@link FeatureLayer} that displays located mileposts.
 * @returns - A {@link FeatureLayer}
 */
export function createMilepostLayer(spatialReference: SpatialReference) {
  const milepostLayer = new FeatureLayer({
    // labelingInfo,
    title: "Mileposts",
    id: "mileposts",
    fields: fields,
    geometryType: "point",
    objectIdField: objectIdFieldName,
    fullExtent: waExtent,
    renderer,
    spatialReference,
    source: [],
    popupEnabled: true,
    hasM: true,
  });

  return milepostLayer;
}
