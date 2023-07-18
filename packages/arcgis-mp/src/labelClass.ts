import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import { highwaySignTextColor, highwaySignBackgroundColor } from "./colors";
// import Font from "@arcgis/core/symbols/Font";

// const labelFont = new Font({
//   family: "Overpass",
// });
export const milepostSignLabelTextSymbol = new TextSymbol({
  // TODO: app is currently trying to load the font from https://static.arcgis.com/fonts/overpass-regular/0-255.pbf
  // Try [fontnik](https://github.com/mapbox/node-fontnik) to convert from TTF or WOFF to PBF font format.
  // font: labelFont,
  color: highwaySignTextColor,
  backgroundColor: highwaySignBackgroundColor,
  borderLineColor: highwaySignTextColor,
  borderLineSize: 1,
  verticalAlignment: "top",
  yoffset: 10,
});

/**
 * Defines labeling for user defined milepost marker.
 */
export const labelClass = new LabelClass({
  labelExpressionInfo: {
    expression: String.raw`Concatenate($feature.Route, TextFormatting.NewLine, $feature.SRMP, $feature.Back)`,
  },
  labelPlacement: "above-center",
  symbol: milepostSignLabelTextSymbol,
});

export const labelingInfo = [labelClass];

export default labelClass;
