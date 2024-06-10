import TextSymbol from "@arcgis/core/symbols/TextSymbol";

const outlineColor = "light-gray";

export const labelSymbol = new TextSymbol({
  color: outlineColor,
  haloColor: "white",
  haloSize: 0.3,
  font: {
    size: 10,
    weight: "normal",
  },
});
