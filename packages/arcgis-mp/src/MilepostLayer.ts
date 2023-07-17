import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import type Field from "@arcgis/core/layers/support/Field";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import waExtent from "./WAExtent";
import { highwaySignBackgroundColor, highwaySignTextColor } from "./colors";
import labelClass from "./labelClass";
import { objectIdFieldName } from "./types";

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
export function createMilepostLayer(spatialReference: SpatialReference) {
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
