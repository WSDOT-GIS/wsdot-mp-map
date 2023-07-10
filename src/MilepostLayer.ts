import Color from "@arcgis/core/Color";
// import esriConfig from "@arcgis/core/config";
import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import type Field from "@arcgis/core/layers/support/Field";
import { objectIdFieldName } from "./types";

type FieldProperties = Required<ConstructorParameters<typeof Field>>[0];

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
] as FieldProperties[];

/**
 * Creates the {@link FeatureLayer} that displays located mileposts.
 * @returns - A {@link FeatureLayer}
 */
export async function createMilepostLayer(spatialReference: SpatialReference) {
  const [
    { default: FeatureLayer },
    { default: SimpleRenderer },
    { default: SimpleMarkerSymbol },
    { default: waExtent },
    { default: labelClass },
    { highwaySignBackgroundColor, highwaySignTextColor },
  ] = await Promise.all([
    import("@arcgis/core/layers/FeatureLayer"),
    import("@arcgis/core/renderers/SimpleRenderer"),
    import("@arcgis/core/symbols/SimpleMarkerSymbol"),
    import("./WAExtent"),
    import("./labelClass"),
    import("./colors"),
  ]);
  /**
   * This is the symbol for the point on the route.
   */
  const actualMPSymbol = new SimpleMarkerSymbol({
    color: highwaySignBackgroundColor,
    size: 12,
    style: "circle",
    outline: {
      width: 1,
      color: highwaySignTextColor,
    },
  });

  const renderer = new SimpleRenderer({
    symbol: actualMPSymbol,
  });
  const milepostLayer = new FeatureLayer({
    labelingInfo: [labelClass],
    title: "Mileposts",
    id: "mileposts",
    fields: fields,
    geometryType: "point",
    objectIdField: objectIdFieldName,
    fullExtent: waExtent,
    renderer,
    spatialReference,
    // Since there are no features at the beginning,
    // need to add an empty array as the source.
    source: [],
    popupEnabled: true,
    hasM: true,
  });

  return milepostLayer;
}
