import EsriMap from "@arcgis/core/Map";
import arcgisConfig from "@arcgis/core/config";
import MapView from "@arcgis/core/views/MapView";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import { createMilepostLayer } from "./MilepostLayer";
import { waExtent } from "./WAExtent";
import { setupElc } from "./elc";
import { setupWidgets } from "./widgets/expandGroups";
import { setupSearch } from "./widgets/setupSearch";

import("./index.css");

function setupConfiguration(arcgisConfig: __esri.config) {
  arcgisConfig.applicationName = "WSDOT Mileposts";
  arcgisConfig.log.level = import.meta.env.DEV ? "info" : "error";
  const { request } = arcgisConfig;
  request.useIdentity = false;
  if (!request.httpsDomains) {
    request.httpsDomains = [];
  }
  request.httpsDomains.push("wsdot.wa.gov");
}

setupConfiguration(arcgisConfig);

const milepostLayer = createMilepostLayer(waExtent.spatialReference);

const map = new EsriMap({
  basemap: "hybrid",
  layers: [milepostLayer],
});

const view = new MapView({
  container: "viewDiv",
  map,
  constraints: {
    geometry: waExtent,
    minZoom: 7,
  },
  extent: waExtent,
  popupEnabled: false,
});

const sb = new ScaleBar({
  unit: "dual",
  view,
});
view.ui.add(sb, "bottom-leading");

view.popup.defaultPopupTemplateEnabled = true;

const search = setupSearch(view);
search.view.ui.add(search, {
  index: 0,
  position: "top-trailing",
});

setupWidgets(view, "top-trailing", {
  group: "top-trailing",
});

setupElc(view);
