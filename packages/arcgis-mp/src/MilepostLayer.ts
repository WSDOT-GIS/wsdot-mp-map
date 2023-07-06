import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import waExtent from "./WAExtent";
import Color from "@arcgis/core/Color";
import "@fontsource/overpass";

const highwaySignBackgroundColor = new Color("#01735c");
const highwaySignText = new Color("#ffffff");

const labelingInfo = [
  new LabelClass({
    labelExpressionInfo: {
      expression: String.raw`Concatenate($feature.Route, TextFormatting.NewLine, $feature.SRMP, $feature.Back)`,
    },
    labelPlacement: "center-center",

    symbol: new TextSymbol({
      // TODO: app is currently trying to load the font from https://static.arcgis.com/fonts/overpass-regular/0-255.pbf
      font: {
        family: "Overpass",
      },
      color: highwaySignText,
      backgroundColor: highwaySignBackgroundColor,
      borderLineColor: highwaySignText,
      borderLineSize: 1,
    }),
  }),
];

const renderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    color: [255, 255, 255, 0.25],
    size: 12,
    style: "circle",
    outline: {
      width: 1,
      color: [255, 255, 255, 1],
    },
  }),
});

const objectIdFieldName = "OBJECTID";

export interface ElcAttributes {
  [objectIdFieldName]: number;
  Route: string;
  Srmp: number;
  Back: "B" | "";
}

/**
 * Creates the {@link FeatureLayer} that displays located mileposts.
 * @returns - A {@link FeatureLayer}
 */
export function createMilepostLayer(spatialReference: SpatialReference) {
  const milepostLayer = new FeatureLayer({
    labelingInfo,
    title: "Mileposts",
    id: "mileposts",
    fields: [
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
    ],
    geometryType: "point",
    objectIdField: objectIdFieldName,
    fullExtent: waExtent,
    renderer,
    spatialReference,
    source: [],
  });

  return milepostLayer;
}
