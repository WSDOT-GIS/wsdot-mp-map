import {
  findNearestRouteLocations,
  routeLocationToGraphic,
  type DateString,
  type RouteGeometry,
  type RouteLocation,
} from "./elc";
import { isGraphicHit } from "./types";

import("./index.css");

const defaultSearchRadius = 3000;

(async () => {
  // Asynchronously import modules. This helps build generate smaller chunks.
  const [
    { default: Basemap },
    { default: EsriMap },
    { default: config },
    // { default: Graphic },
    { default: MapView },
    { default: ScaleBar },
    { default: Home },
    { createMilepostLayer },
    { waExtent },
    // { callElc, callElcFromUrl },
    { setupWidgets },
    { setupSearch },
    // { isGraphicHit },
    { cityLimitsLayer, roadwayCharacteristicDataLayer },
  ] = await Promise.all([
    import("@arcgis/core/Basemap"),
    import("@arcgis/core/Map"),
    import("@arcgis/core/config"),
    // import("@arcgis/core/Graphic"),
    import("@arcgis/core/views/MapView"),
    import("@arcgis/core/widgets/ScaleBar"),
    import("@arcgis/core/widgets/Home"),
    import("./MilepostLayer"),
    import("./WAExtent"),
    // import("./elc"),
    import("./widgets/expandGroups"),
    import("./widgets/setupSearch"),
    // import("./types"),
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
  import("./widgets/ClearButton").then(
    ({ createClearButton }) => {
      const clearButton = createClearButton({
        layer: milepostLayer,
      });
      view.ui.add([home, clearButton], "top-trailing");
    },
    (reason) => console.error("Failed to setup clear button", reason)
  );

  view.on("click", (event) => {
    view
      .hitTest(event, {
        include: milepostLayer,
      })
      .then((hitTestResult) => {
        const graphicHits = hitTestResult.results.filter(isGraphicHit);
        const features = graphicHits.map(({ graphic }) => graphic);
        if (features.length > 0) {
          /* @__PURE__ */ console.debug(
            "map click hit test determined user clicked on existing graphic.",
            features
          );
          view
            .openPopup({
              features,
              updateLocationEnabled: true,
              shouldFocus: true,
            })
            .catch((reason) => console.error("openPopup failed", reason));
        } else {
          // Call findNearestRouteLocations
          const { x, y, spatialReference } = event.mapPoint;
          findNearestRouteLocations({
            coordinates: [x, y],
            inSR: spatialReference.wkid,
            referenceDate: new Date(),
            routeFilter: "LIKE '___' OR RelRouteType IN ('SP', 'CO', 'AR')",
            searchRadius: defaultSearchRadius,
          })
            .then((locations) => {
              /* @__PURE__ */ console.debug(
                `${findNearestRouteLocations.name} results`
              );
              const locationGraphics = locations.map(routeLocationToGraphic);
              milepostLayer
                .applyEdits({
                  addFeatures: locationGraphics,
                })
                .then((editsResult) => {
                  const nonErrorResults =
                    editsResult.addAttachmentResults.filter((editResult, i) => {
                      if (!editResult.error) {
                        return false;
                      }
                      console.error(
                        `editResult error on item ${i}`,
                        editResult.error
                      );
                      return true;
                    });

                  /* @__PURE__ */ console.debug(
                    `${nonErrorResults.length} of ${editsResult.addAttachmentResults.length} edits succeeded`,
                    nonErrorResults
                  );

                  const addedFeatures = nonErrorResults.map((f) =>
                    locationGraphics.find(
                      (g) =>
                        (
                          g.attributes as RouteLocation<
                            DateString,
                            RouteGeometry
                          >
                        ).Id === f.objectId
                    )
                  );
                  /* @__PURE__ */ console.debug("addedFeatures", addedFeatures);
                })
                .catch((reason) => console.error("addFeatures failed", reason));
            })
            .catch((reason) =>
              console.error("findNearestRouteLocations failed", reason)
            );
        }
      })
      .catch((reason) => console.error("hitTest failed", reason));
  });

  // TODO: Turn SRMP form back on once ELC for direct input of SRMP has been rewritten.

  // // Set up the form for inputting SRMPdata.
  // import("./setupForm")
  //   .then(({ setupForm }) => setupForm(view, milepostLayer))
  //   .catch((reason) => console.error("failed to setup form", reason));

  // /**
  //  * Handle the click event on the view.
  //  *
  //  * @param {__esri.ViewClickEvent} event - The click event on the view
  //  * @return {Promise<void>} A promise that resolves when the function completes
  //  */
  // async function handleViewOnClick(
  //   event: __esri.ViewClickEvent
  // ): Promise<void> {
  //   // // Test to see if the clicked point intersects any of the milepost graphics.
  //   // const hitTestResult = await view.hitTest(event, {
  //   //   include: milepostLayer,
  //   // });
  //   // // If the user clicked on a milepost graphic, open a popup for the graphic
  //   // // and exit.
  //   // if (hitTestResult.results.length > 0) {
  //   //   // Extract the features from the hit test results object's "results" property.
  //   //   const features = hitTestResult.results
  //   //     // Filter out any that are not of type "graphic".
  //   //     // Since we are only testing against a FeatureLayer,
  //   //     // all of them should be "graphic"
  //   //     .filter(isGraphicHit)
  //   //     .map((viewHit) => viewHit.graphic);
  //   //   view
  //   //     .openPopup({
  //   //       location: event.mapPoint,
  //   //       features,
  //   //     })
  //   //     .then(
  //   //       () => {},
  //   //       (reason) => {
  //   //         /* @__PURE__ */ console.error(reason);
  //   //       }
  //   //     );
  //   //   return;
  //   // }
  //   // // Add a temp loading graphic
  //   // const loadingGraphic = new Graphic({
  //   //   geometry: event.mapPoint,
  //   //   symbol: loadingSymbol,
  //   // });
  //   // view.graphics.add(loadingGraphic);
  //   // const graphicPromise = callElc(view, milepostLayer, event.mapPoint, {
  //   //   searchRadius: defaultSearchRadius,
  //   //   useCors: true,
  //   // });
  //   // graphicPromise
  //   //   .then((graphic) => {
  //   //     if (graphic) {
  //   //       view
  //   //         .openPopup({
  //   //           features: [graphic],
  //   //           fetchFeatures: true,
  //   //           shouldFocus: true,
  //   //           updateLocationEnabled: true,
  //   //         })
  //   //         .then(
  //   //           () => {},
  //   //           (reason) => {
  //   //             /* @__PURE__ */ console.error(reason);
  //   //           }
  //   //         );
  //   //     } else {
  //   //       /* @__PURE__ */ console.error("graphic was null", { event });
  //   //     }
  //   //   })
  //   //   .catch((reason) => console.error(reason))
  //   //   .finally(() => {
  //   //     // Remove the temp graphic
  //   //     view.graphics.remove(loadingGraphic);
  //   //   });
  // }

  // view.on("click", (event) => {
  //   handleViewOnClick(event).catch((reason) => console.error(reason));
  // });

  Promise.all([view.when(), milepostLayer.when()]).then(
    () => {
      // callElcFromUrl(view, milepostLayer)
      //   .then((elcResult) => {
      //     /* @__PURE__ */ console.debug("ELC result from URL", elcResult);
      //   })
      //   .catch((reason) =>
      //     console.error("Calling ELC from URL failed.", reason)
      //   );
    },
    (reason) => console.error(reason)
  );
})().catch((reason) => console.error(reason));
