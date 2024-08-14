import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

const outFields = ["CityName", "LastUpdate"];

const renderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    style: "none",
    outline: new SimpleLineSymbol({
      color: "blue",
      style: "solid",
      width: 1,
    }),
  }),
});

/**
 * The city limits layer.
 */
export const cityLimitsLayer = new FeatureLayer({
  title: "City Limits",
  url: "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/CityLimits/MapServer/2",
  visible: false,
  outFields,
  popupEnabled: false,
  renderer,
});
