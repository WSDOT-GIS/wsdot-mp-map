import arcgisConfig from "@arcgis/core/config";

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

(async () => {
  const { default: waExtent } = await import("./WAExtent");
  setupConfiguration(arcgisConfig);

  import("@arcgis/core/Map").then(async ({ default: EsriMap }) => {
    const map = new EsriMap({
      basemap: "hybrid",
    });

    import("@arcgis/core/views/MapView").then(async ({ default: MapView }) => {
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

      import("@arcgis/core/widgets/ScaleBar").then(({ default: ScaleBar }) => {
        const sb = new ScaleBar({
          unit: "dual",
          view,
        });
        view.ui.add(sb, "bottom-leading");
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
