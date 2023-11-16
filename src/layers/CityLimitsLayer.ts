const [
  { default: FeatureLayer },
  { default: SimpleRenderer },
  { default: SimpleFillSymbol },
] = await Promise.all([
  import("@arcgis/core/layers/FeatureLayer"),
  import("@arcgis/core/renderers/SimpleRenderer"),
  import("@arcgis/core/symbols/SimpleFillSymbol"),
]);

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
  renderer,
});

export default cityLimitsLayer;
