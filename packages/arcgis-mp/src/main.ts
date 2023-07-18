import EsriMap from "@arcgis/core/Map";
import arcgisConfig from "@arcgis/core/config";
import MapView from "@arcgis/core/views/MapView";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import { createMilepostLayer } from "./MilepostLayer";
import { waExtent } from "./WAExtent";
import { callElc } from "./elc";
import { setupWidgets } from "./widgets/expandGroups";
import { setupSearch } from "./widgets/setupSearch";
import { isGraphicHit } from "./types";

import("./index.css");

function setupConfiguration(config: typeof arcgisConfig) {
  config.applicationName = "WSDOT Mileposts";
  config.log.level = import.meta.env.DEV ? "info" : "error";
  const { request } = config;
  // This app only uses publicly available map services,
  // so we don't need to use identity.
  request.useIdentity = false;
  // Initialize httpDomains array if it does not already have a value.
  if (!request.httpsDomains) {
    request.httpsDomains = [];
  }
  request.httpsDomains.push("wsdot.wa.gov", "data.wsdot.wa.gov");
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

const defaultSearchRadius = 3000;
view.on("click", async (event) => {
  // Test to see if the clicked point intersects any of the milepost graphics.
  const hitTestResult = await view.hitTest(event, {
    include: milepostLayer,
  });

  // If the user clicked on a milepost graphic, open a popup for the graphic
  // and exit.
  if (hitTestResult.results.length > 0) {
    // Extract the features from the hit test results object's "results" property.
    const features = hitTestResult.results
      // Filter out any that are not of type "graphic".
      // Since we are only testing against a FeatureLayer,
      // all of them should be "graphic"
      .filter(isGraphicHit)
      .map((viewHit) => viewHit.graphic);
    view.openPopup({
      location: event.mapPoint,
      features,
    });
    return;
  }

  const graphic = await callElc(view, milepostLayer, event.mapPoint, {
    searchRadius: defaultSearchRadius,
    useCors: true,
  });

  if (graphic == null) {
    return;
  }

  view.openPopup({
    features: [graphic],
    fetchFeatures: true,
    shouldFocus: true,
    updateLocationEnabled: true,
  });
});
