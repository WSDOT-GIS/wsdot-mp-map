import arcgisConfig from "@arcgis/core/config";

import("./index.css");

function setupConfiguration(arcgisConfig: __esri.config) {
  arcgisConfig.applicationName = "WSDOT Mileposts";
  const { request } = arcgisConfig;
  request.useIdentity = false;
  if (!request.httpsDomains) {
    request.httpsDomains = [];
  }
  request.httpsDomains.push("wsdot.wa.gov");
}

(async () => {
  const [SpatialReference, waExtent] = await Promise.all([
    import("@arcgis/core/geometry/SpatialReference").then((i) => i.default),
    import("./WAExtent").then((i) => i.waExtent),
  ]);

  // Setup configuration
  (() => {
    setupConfiguration(arcgisConfig);
  })();

  import("@arcgis/core/Map").then(async ({ default: EsriMap }) => {
    const map = new EsriMap({
      basemap: "hybrid",
    });

    import("@arcgis/core/views/MapView").then(async ({ default: MapView }) => {
      const view = new MapView({
        container: "viewDiv",
        map,
        spatialReference: SpatialReference.WebMercator,
        constraints: {
          geometry: waExtent,
          minZoom: 7,
        },
        extent: waExtent,
      });

      view.popup.defaultPopupTemplateEnabled = true;

      import("./widgets/setupSearch").then(({ setupSearch }) => {
        setupSearch(view).then((search) => {
          search.view.ui.add(search, {
            index: 0,
            position: "top-trailing",
          });
        });
      });

      import("./widgets/expandGroups").then(({ setupWidgets }) => {
        setupWidgets(view, "top-trailing", {
          group: "top-trailing",
        });
      });

      import("./elc").then(({ setupElc }) => {
        setupElc(view);
      });
    });
  });
})();
