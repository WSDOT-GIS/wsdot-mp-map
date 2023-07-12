import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import {
  highwaySignBackgroundColor,
  highwaySignTextColor,
} from "./MilepostIcon";
import LabelClass from "@arcgis/core/layers/support/LabelClass";

export const labelClass = new LabelClass({
  labelExpressionInfo: {
    expression: String.raw`Concatenate($feature.Route, TextFormatting.NewLine, $feature.SRMP, $feature.Back)`,
  },
  labelPlacement: "above-center",

  symbol: new TextSymbol({
    // TODO: app is currently trying to load the font from https://static.arcgis.com/fonts/overpass-regular/0-255.pbf
    font: {
      family: "Overpass",
    },
    color: highwaySignTextColor,
    backgroundColor: highwaySignBackgroundColor,
    borderLineColor: highwaySignTextColor,
    borderLineSize: 1,
  }),
});
export const labelingInfo = [labelClass];

export default labelClass;
