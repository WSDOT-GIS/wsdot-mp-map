import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

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

const sublayers = (
  [
    { minScale: 1500000, maxScale: 750001 },
    { minScale: 0, maxScale: 1500001, renderer },
    { minScale: 750000.0, maxScale: 0, renderer },
  ] as const
).map((currentItem, i) => ({ id: i, popupEnabled: false, ...currentItem }));

/**
 * The city limits layer.
 */
export const cityLimitsLayer = new MapImageLayer({
  title: "City Limits",
  url: "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/CityLimits/MapServer",
  visible: false,
  listMode: "hide-children",
  sublayers,
});
