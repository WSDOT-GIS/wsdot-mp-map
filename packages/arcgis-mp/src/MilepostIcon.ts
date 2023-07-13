import Color from "@arcgis/core/Color";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import { hasAttributes } from "./types";
import { RouteDescription } from "wsdot-route-utils";
import Font from "@arcgis/core/symbols/Font";
import Graphic from "@arcgis/core/Graphic";

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

/**
 * Creates a {@link TextSymbol} that displays route and milepost
 * attributes of the graphic.
 * @param graphic
 * @returns
 */
export function createMPSymbol(graphic: Graphic) {
  if (!hasAttributes(graphic)) {
    return null;
  }
  const { attributes } = graphic;

  const symbol = defaultSymbol.clone();
  const { Srmp, Back, Decrease, Route } = attributes;
  const direction = Decrease ? "Decrease" : "Increase";
  const routeDesc = new RouteDescription(Route as string, {});
  const text = `${routeDesc} (${direction})\n${Srmp}${Back}`;
  symbol.text = text;
  return symbol;
}
