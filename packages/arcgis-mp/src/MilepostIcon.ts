import Color from "@arcgis/core/Color";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import type { MilepostFeature } from "./types";
import { RouteDescription } from "wsdot-route-utils";
import Font from "@arcgis/core/symbols/Font";

export const highwaySignBackgroundColor = new Color("#01735c");
export const highwaySignTextColor = new Color("#ffffff");

export const defaultSymbol = new TextSymbol({
  // TODO: app is currently trying to load the font from https://static.arcgis.com/fonts/overpass-regular/0-255.pbf
  font: new Font({
    family: "Overpass",
  }),
  text: "MP",
  color: highwaySignTextColor,
  backgroundColor: highwaySignBackgroundColor,
  borderLineColor: highwaySignTextColor,
  borderLineSize: 1,
});

export function createMPSymbol(graphic: MilepostFeature) {
  const symbol = defaultSymbol.clone();
  const { attributes } = graphic;
  const { Srmp, Back, Decrease, Route } = attributes;
  const direction = Decrease ? "Decrease" : "Increase";
  const routeDesc = new RouteDescription(Route, {});
  const text = `${routeDesc} (${direction})\n${Srmp}${Back}`;
  symbol.text = text;
  return symbol;
}
