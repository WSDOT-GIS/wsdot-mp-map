import { SimpleLineSymbol, SimpleMarkerSymbol } from "@arcgis/core/symbols";

export const loadingSymbol = new SimpleMarkerSymbol({
  color: "red",
  outline: new SimpleLineSymbol({
    color: "red",
    width: 5,
  }),
  style: "x",
  size: 10,
});
