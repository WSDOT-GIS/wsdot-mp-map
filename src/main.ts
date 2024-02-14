import { addGraphicsToLayer } from "./addGraphicsToLayer";

import("./index.css");

const defaultSearchRadius = 3000;

const elcMainlinesOnlyFilter =
  "LIKE '___' OR RelRouteType IN ('SP', 'CO', 'AR')";

(async () => {
  // Asynchronously import modules. This helps build generate smaller chunks.
  const [
    { default: Basemap },
    { default: EsriMap },
    { default: config },
    { default: MapView },
    { default: ScaleBar },
    { default: Home },
    { createMilepostLayer },
    { waExtent },
    { routeLocationToGraphic, findNearestRouteLocations, callElcFromUrl },
    { setupWidgets },
    { setupSearch },
    { isGraphicHit },
    { cityLimitsLayer, roadwayCharacteristicDataLayer },
  ] = await Promise.all([
    import("@arcgis/core/Basemap"),
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

  const handleViewOnClick = (event: __esri.ViewClickEvent): void => {
    const handleHitTestResult = (hitTestResult: __esri.HitTestResult): void => {
      const graphicHits = hitTestResult.results.filter(isGraphicHit);
      const features = graphicHits.map(({ graphic }) => graphic);
      function callFindNearestRouteLocation() {
        const { x, y, spatialReference } = event.mapPoint;
        findNearestRouteLocations({
          coordinates: [x, y],
          inSR: spatialReference.wkid,
          referenceDate: new Date(),
          routeFilter: elcMainlinesOnlyFilter,
          searchRadius: defaultSearchRadius,
        })
          .then(async (locations) => {
            /* @__PURE__ */ console.debug(
              `${findNearestRouteLocations.name} results`
            );
            const locationGraphics = locations.map(routeLocationToGraphic);
            await addGraphicsToLayer(milepostLayer, locationGraphics);
          })
          .catch((reason) =>
            console.error("findNearestRouteLocations failed", reason)
          );
      }

      function openPopup() {
        console.debug(
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
      }
      if (features.length > 0) {
        /* @__PURE__ */ openPopup();
      } else {
        // Call findNearestRouteLocations
        callFindNearestRouteLocation();
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

  milepostLayer.on("layerview-create", () => {
    callElcFromUrl(milepostLayer)
      .then(async (elcGraphics) => {
        if (!elcGraphics) {
          return;
        }
        const { addedFeatures } = await addGraphicsToLayer(
          milepostLayer,
          elcGraphics
        );
        view.goTo(addedFeatures).catch((reason: unknown) =>
          console.error('failed to "goTo" features from URL', {
            reason,
            features: addedFeatures,
          })
        );
      })
      .catch((reason) => console.error("Calling ELC from URL failed.", reason));
  });
})().catch((reason) => console.error(reason));
