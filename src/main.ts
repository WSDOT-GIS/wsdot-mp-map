import type View from "@arcgis/core/views/View";

import("./index.css");

/**
 * Sets up the loading indicator for a map view.
 * @param view
 * @returns - The handle for watching the view's updating property.
 */
function setupViewLoadingIndicator(view: View) {
  const viewProgress = document.createElement("progress");
  viewProgress.textContent = "Updating map...";
  // Add the map loading indicator.
  view.ui.add(viewProgress, "bottom-trailing");
  // Make the view loading indicator only show up when the map is updating.
  return view.watch(
    "updating",
    (updating) => (viewProgress.hidden = !updating)
  );
}

Promise.all([
  import("@arcgis/core/Map"),
  import("@arcgis/core/config"),
  import("@arcgis/core/views/MapView"),
  import("@arcgis/core/widgets/ScaleBar"),
  import("@arcgis/core/widgets/Home"),
  import("./MilepostLayer"),
  import("./WAExtent"),
  import("./elc"),
  import("./widgets/expandGroups"),
  import("./widgets/setupSearch"),
  import("./types"),
])
  .then(
    async ([
      { default: EsriMap },
      { default: config },
      { default: MapView },
      { default: ScaleBar },
      { default: Home },
      { createMilepostLayer },
      { waExtent },
      { callElc },
      { setupWidgets },
      { setupSearch },
      { isGraphicHit },
    ]) => {
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

      const milepostLayer = await createMilepostLayer(
        waExtent.spatialReference
      );

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

      setupViewLoadingIndicator(view);

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

      const home = new Home({
        view,
      });

      view.ui.add(home, "top-trailing");

      const defaultSearchRadius = 3000;
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
          view
            .openPopup({
              location: event.mapPoint,
              features,
            })
            .then(
              () => {},
              (reason) => {
                /* @__PURE__ */ console.error(reason);
              }
            );
          return;
        }

        const graphic = await callElc(view, milepostLayer, event.mapPoint, {
          searchRadius: defaultSearchRadius,
          useCors: true,
        });

        if (graphic == null) {
          return;
        }

        view
          .openPopup({
            features: [graphic],
            fetchFeatures: true,
            shouldFocus: true,
            updateLocationEnabled: true,
          })
          .then(
            () => {},
            (reason) => {
              /* @__PURE__ */ console.error(reason);
            }
          );
      });
    }
  )
  .then(
    () => {},
    (reason) => {
      /* @__PURE__ */ console.error(
        `An error was encountered in "main".`,
        reason
      );
    }
  );
