import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { SimpleRenderer } from "@arcgis/core/renderers";
import { SimpleFillSymbol } from "@arcgis/core/symbols";

const cityLimitsId = "0b12f000a66f4d75a43ea3ac4ead01dc";

const renderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    style: "none",
    outline: {
      color: "blue",
      style: "solid",
      width: 1,
    },
  }),
});

export const cityLimitsLayer = new FeatureLayer({
  title: "City Limits",
  portalItem: {
    id: cityLimitsId,
  },
  popupEnabled: false,
  renderer,
});

export default cityLimitsLayer;
