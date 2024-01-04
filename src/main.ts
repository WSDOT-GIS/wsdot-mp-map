import { SimpleLineSymbol, SimpleMarkerSymbol } from "@arcgis/core/symbols";

import("./index.css");

const loadingSymbol = new SimpleMarkerSymbol({
  color: "red",
  outline: new SimpleLineSymbol({
    color: "red",
    width: 5,
  }),
  style: "x",
  size: 10,
});

(async () => {
  // Asynchronously import modules. This helps build generate smaller chunks.
  const [
    { default: Basemap },
    { default: EsriMap },
    { default: config },
    { default: Graphic },
    { default: MapView },
    { default: ScaleBar },
    { default: Home },
    { createMilepostLayer },
    { waExtent },
    { callElc, callElcFromForm, callElcFromUrl },
    { setupWidgets },
    { setupSearch },
    { isGraphicHit },
    { cityLimitsLayer, roadwayCharacteristicDataLayer },
  ] = await Promise.all([
    import("@arcgis/core/Basemap"),
    import("@arcgis/core/Map"),
    import("@arcgis/core/config"),
    import("@arcgis/core/Graphic"),
    import("@arcgis/core/views/MapView"),
    import("@arcgis/core/widgets/ScaleBar"),
    import("@arcgis/core/widgets/Home"),
    import("./MilepostLayer"),
    import("./WAExtent"),
    import("./elc"),
    import("./widgets/expandGroups"),
    import("./widgets/setupSearch"),
    import("./types"),
    import("./layers"),
  ]);

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

  const milepostLayer = await createMilepostLayer(waExtent.spatialReference);

  const basemap = new Basemap({
    portalItem: {
      id: "952d28d8d68c4e9ca2db7c7d68307af0",
    },
  });
  const map = new EsriMap({
    basemap,
    layers: [cityLimitsLayer, roadwayCharacteristicDataLayer, milepostLayer],
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

  // Add the loading indicator widget to the map.
  import("./widgets/LoadingIndicator").then(
    ({ setupViewLoadingIndicator }) => setupViewLoadingIndicator(view),
    (reason) =>
      /* @__PURE__ */ console.error(
        `Failed to add loading indicator: ${reason}`
      )
  );

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
    mode: "drawer",
  });

  const home = new Home({
    view,
  });
  import("./widgets/ClearButton").then(({ createClearButton }) => {
    const clearButton = createClearButton({
      layer: milepostLayer,
    });
    view.ui.add([home, clearButton], "top-trailing");
  });

  setupForm();

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

    // Add a temp loading graphic
    const loadingGraphic = new Graphic({
      geometry: event.mapPoint,
      symbol: loadingSymbol,
    });

    view.graphics.add(loadingGraphic);

    const graphicPromise = callElc(view, milepostLayer, event.mapPoint, {
      searchRadius: defaultSearchRadius,
      useCors: true,
    });

    graphicPromise
      .then((graphic) => {
        if (graphic) {
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
        } else {
          /* @__PURE__ */ console.error("graphic was null", { event });
        }
      })
      .catch((reason) => console.error(reason))
      .finally(() => {
        // Remove the temp graphic
        view.graphics.remove(loadingGraphic);
      });
  });

  Promise.all([view.when(), milepostLayer.when()]).then(
    () => {
      callElcFromUrl(view, milepostLayer)
        .then((elcResult) => {
          /* @__PURE__ */ console.debug("ELC result from URL", elcResult);
        })
        .catch((reason) =>
          console.error("Calling ELC from URL failed.", reason)
        );
    },
    (reason) => console.error(reason)
  );

  /**
   * Sets up the form for inputting SRMPdata.
   */
  function setupForm() {
    import("./widgets/SrmpInputForm").then(
      ({ createSrmpInputForm, isRouteInputEvent }) => {
        const form = createSrmpInputForm(view.ui, {
          index: 0,
          position: "top-leading",
        });
        form.addEventListener(
          "srmp-input",
          (e) => {
            if (!isRouteInputEvent(e)) {
              /* @__PURE__ */ console.warn(
                "Input is not in expected format",
                e instanceof CustomEvent ? e.detail : e
              );
              return;
            }
            /* @__PURE__ */ console.debug("User inputted a milepost", e.detail);

            callElcFromForm(e.detail, view, milepostLayer).then(
              (elcGraphic) => {
                if (!elcGraphic) {
                  /* @__PURE__ */ console.log(
                    "Returned graphic from user input",
                    elcGraphic
                  );
                } else {
                  /* @__PURE__ */ console.warn(
                    "User input resulted in null graphic."
                  );
                }
              },
              (reason) => {
                /* @__PURE__ */ console.error(callElcFromForm.name, reason);
              }
            );
          },
          {
            passive: true,
          }
        );
      },
      (reason) => {
        console.error("SrmpInputForm module import", reason);
      }
    );
  }
})();
