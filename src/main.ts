import type MapView from "@arcgis/core/views/MapView";

import("./index.css");

const defaultSearchRadius = 3000;

const elcMainlinesOnlyFilter =
  "LIKE '___' OR RelRouteType IN ('SP', 'CO', 'AR')";

function openPopup(hits: __esri.GraphicHit[], view: MapView) {
  // Get the features that were hit by the hit test.
  const features = hits.map(({ graphic }) => graphic);
  view
    .openPopup({
      features,
      updateLocationEnabled: true,
      shouldFocus: true,
    })
    .catch((reason) => console.error("openPopup failed", reason));
}

(async () => {
  // Asynchronously import modules. This helps build generate smaller chunks.
  const [
    { default: Basemap },
    { default: config },
    { default: Graphic },
    { default: EsriMap },
    { default: MapView },
    { default: ScaleBar },
    { default: Home },
    { addGraphicsToLayer },
    { routeLocationToGraphic, findNearestRouteLocations },
    { callElcFromUrl },
    { isGraphicHit, UIAddPositions },
    { accessControlLayer },
    { cityLimitsLayer },
    { createMilepostLayer },
    { parcelsLayer },
    { tempLayer },
    { waExtent },
    { setupWidgets },
    { setupSearch },
  ] = await Promise.all([
    import("@arcgis/core/Basemap"),
    import("@arcgis/core/config"),
    import("@arcgis/core/Graphic"),
    import("@arcgis/core/Map"),
    import("@arcgis/core/views/MapView"),
    import("@arcgis/core/widgets/ScaleBar"),
    import("@arcgis/core/widgets/Home"),
    import("./addGraphicsToLayer"),
    import("./elc"),
    import("./elc/url"),
    import("./types"),
    import("./layers/AccessControlLayer"),
    import("./layers/CityLimitsLayer"),
    import("./layers/MilepostLayer"),
    import("./layers/ParcelsLayer"),
    import("./layers/TempLayer"),
    import("./WAExtent"),
    import("./widgets/expandGroups"),
    import("./widgets/setupSearch"),
  ] as const);

  /**
   * A function that handles the event of finding the nearest route location
   * when the user clicks on the map.
   *
   * @param event - the event object containing map click details
   */
  async function callFindNearestRouteLocation(event: __esri.ViewClickEvent) {
    /* __PURE__ */ console.group(callFindNearestRouteLocation.name);
    /* __PURE__ */ console.debug("input event", event);
    const { x, y, spatialReference } = event.mapPoint;
    const locations = await findNearestRouteLocations({
      coordinates: [x, y],
      inSR: spatialReference.wkid,
      referenceDate: new Date(),
      routeFilter: elcMainlinesOnlyFilter,
      searchRadius: defaultSearchRadius,
    });
    /* __PURE__ */ console.debug(
      "locations returned by ELC for this location",
      locations
    );
    if (locations == null) {
      /* __PURE__ */ console.log(
        "No locations returned. Returned value is null."
      );
    } else if (!locations.length) {
      /* __PURE__ */ console.log(
        "No locations returned. Returned value is an empty array."
      );
    }
    const locationGraphics = locations.map(routeLocationToGraphic);
    const addResults = addGraphicsToLayer(milepostLayer, locationGraphics);
    /* __PURE__ */ console.debug(
      "addResults returned by addGraphicsToLayer",
      addResults
    );
    /* __PURE__ */ console.groupEnd();
    return locations;
  }

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

  const milepostLayer = createMilepostLayer(waExtent.spatialReference);

  const basemap = new Basemap({
    portalItem: {
      id: "952d28d8d68c4e9ca2db7c7d68307af0",
    },
  });
  const map = new EsriMap({
    basemap,
    layers: [
      cityLimitsLayer,
      accessControlLayer,
      parcelsLayer,
      tempLayer,
      milepostLayer,
    ],
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
    (reason) => console.error(`Failed to add loading indicator: ${reason}`)
  );

  const sb = new ScaleBar({
    unit: "dual",
    view,
  });
  view.ui.add(sb, UIAddPositions.bottomLeading);

  view.popup.defaultPopupTemplateEnabled = true;

  const search = setupSearch(view);
  search.view.ui.add(search, {
    index: 0,
    position: UIAddPositions.topTrailing,
  });

  setupWidgets(view, UIAddPositions.topTrailing, {
    group: UIAddPositions.topTrailing,
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
      view.ui.add([home, clearButton], UIAddPositions.topTrailing);
    },
    (reason) => console.error("Failed to setup clear button", reason)
  );

  /**
   * Handle the click event on the view.
   *
   * @param event - The click event on the view.
   */
  const handleViewOnClick: __esri.ViewClickEventHandler = (event) => {
    /**
     * If the hit test results are not graphic hits, call findNearestRouteLocations.
     * Otherwise, open the popup.
     * @param hitTestResult - The hit test results
     */
    const handleHitTestResult = async (hitTestResult: __esri.HitTestResult) => {
      // Filter out hit test results that are not graphic hits.
      const graphicHits = hitTestResult.results.filter(isGraphicHit);

      // If the user clicked on a graphic, open its popup.
      if (graphicHits.length > 0) {
        openPopup(graphicHits, view);
        return;
      }

      // Add graphic to temp layer

      const tempGraphic = new Graphic({
        geometry: event.mapPoint,
      });

      const tempAddResults = await tempLayer.applyEdits({
        addFeatures: [tempGraphic],
      });

      tempAddResults.addFeatureResults.forEach((r) => {
        if (r.error) {
          console.error(
            "There was an error adding the temporary graphic where the user clicked.",
            r.error
          );
        }
      });

      // Call findNearestRouteLocations
      const results = await callFindNearestRouteLocation(event);

      // Remove the temporary graphic
      tempLayer
        .applyEdits({
          deleteFeatures: [tempGraphic],
        })
        .catch((reason) =>
          console.error("Failed to remove temporary graphic", reason)
        );

      /* __PURE__ */ console.debug("ELC Results", results);
      if (!results || results.length === 0) {
        const message = "Could not find a route location near this location.";
        view
          .openPopup({
            title: "Route Location Not Found",
            content: message,
            location: event.mapPoint,
          })
          .catch((reason: unknown) =>
            console.error(`Popup with message "${message}" failed.`, {
              reason,
              event,
            })
          );
      }
    };
    view
      .hitTest(event, {
        include: milepostLayer,
      })
      .then(handleHitTestResult)
      .catch((reason) => console.error("hitTest failed", reason));
  };
  view.on("click", handleViewOnClick);

  // Set up the form for inputting SRMPdata.
  import("./setupForm")
    .then(({ setupForm }) => setupForm(view, milepostLayer))
    .catch((reason) => console.error("failed to setup form", reason));

  if (import.meta.env.DEV) {
    milepostLayer
      .when(async () => {
        const { createExportButton } = await import("./widgets/ExportButton");

        const button = createExportButton({
          layer: milepostLayer,
        });
        view.ui.add(button, UIAddPositions.bottomTrailing);
      })
      .catch((reason) =>
        console.error("failed to create export button", reason)
      );
  }

  // Once the milepost layerview has been created, check for ELC data from the URL
  // and, if present, add the location to the map.
  milepostLayer.on("layerview-create", () => {
    callElcFromUrl(milepostLayer)
      .then(async (elcGraphics) => {
        if (elcGraphics) {
          const addedFeatures = await addGraphicsToLayer(
            milepostLayer,
            elcGraphics
          );
          view.goTo(addedFeatures).catch((reason: unknown) =>
            console.error('failed to "goTo" features from URL', {
              reason,
              features: addedFeatures,
            })
          );
        }
      })
      .catch((reason) => console.error("Calling ELC from URL failed.", reason));
  });
})().catch((reason) => console.error(reason));
