import { addWsdotLogo } from "./addWsdotLogo";
import { createErrorAlert } from "./createElcErrorAlert";
import { emitErrorEvent } from "./errorEvent";
import { setupHashUpdate } from "./history-api/hash-update-setup";
import { updateUrlSearchParams } from "./history-api/url-search";
import type MapView from "@arcgis/core/views/MapView";
import "@esri/calcite-components";
import "@fontsource/inconsolata";
import "@fontsource/lato";
import { FormatError } from "wsdot-route-utils";

import("@wsdot/web-styles/css/wsdot-colors.css");

const wsdotLogoParentSelector = "#header-title";

function setupSidebarCollapseButton(view: MapView) {
  const sideBar = document.querySelector<HTMLCalciteShellPanelElement>(
    "calcite-shell-panel#sidebar",
  );

  if (sideBar) {
    // <calcite-button id="toggleSidebarButton" text="Toggle Sidebar" icon="collapse"></calcite-button>
    const collapseButton = document.createElement("calcite-button");
    collapseButton.setAttribute("id", "toggleSidebarButton");
    collapseButton.setAttribute("text", "Toggle Sidebar");
    collapseButton.setAttribute("icon", "collapse");
    collapseButton.addEventListener("click", () => {
      sideBar.collapsed = !sideBar.collapsed;
      setSidebarToggleIcon();
    });

    view.ui.add(collapseButton, "top-leading");

    const setSidebarToggleIcon = () => {
      collapseButton.iconStart = sideBar.collapsed
        ? "chevrons-right"
        : "chevrons-left";
    };

    setSidebarToggleIcon();
  }
}

const catchErrorAndEmitInDev = (reason: unknown) => {
  if (import.meta.env.DEV) {
    emitErrorEvent(reason);
  }
  console.error("Failed to add WSDOT logo.", reason);
};
addWsdotLogo(wsdotLogoParentSelector).catch(catchErrorAndEmitInDev);

if (import.meta.hot) {
  import.meta.hot.accept("./addWsdotLogo", (mod) => {
    if (mod) {
      console.log("hot module replacement", mod);
    }
    document.querySelector(".wsdot-logo")?.remove();
    (mod as unknown as typeof import("./addWsdotLogo"))
      .addWsdotLogo(wsdotLogoParentSelector)
      .catch(catchErrorAndEmitInDev);
  });

  import.meta.hot.accept("./history-api/url-search", (mod) => {
    if (mod) {
      console.log("hot module replacement", mod);
    }
  });
}

window.addEventListener("elc-error", (event) => {
  /* __PURE__ */ console.group("elc-error event listener");
  const reason = event.detail;
  createErrorAlert(reason);
  /* __PURE__ */ console.error("elc error", reason);
  /* __PURE__ */ console.groupEnd();
});

window.addEventListener("format-error", (event) => {
  /* __PURE__ */ console.group("error event listener");
  const reason = event.detail as FormatError;
  createErrorAlert(reason);
  /* __PURE__ */ console.error("error", reason);
  /* __PURE__ */ console.groupEnd();
});

import("./index.css");

const defaultSearchRadius = 3000;

const elcMainlinesOnlyFilter =
  "LIKE '___' OR RelRouteType IN ('SP', 'CO', 'AR')";

/**
 * Opens a popup with the features that were hit by the hit test.
 * @param hits - An array of graphic hits.
 * @param view - The map view.
 */
function openPopup(hits: __esri.GraphicHit[], view: MapView) {
  // Get the features that were hit by the hit test.
  const features = hits.map(({ graphic }) => graphic);
  const updateUrlSearch = () => {
    const routeLocation = features
      .map(
        (f) =>
          f.attributes as Record<string, string | number | undefined | null> & {
            Back: string;
            Route: string;
            Srmp: number;
            Direction: string;
          },
      )
      .at(0);

    if (!routeLocation) {
      console.error("Could not find route location");
      return;
    }

    updateUrlSearchParams(routeLocation);
  };
  view
    .openPopup({
      features,
      updateLocationEnabled: true,
      shouldFocus: true,
    })
    .then(updateUrlSearch)
    .catch((reason: unknown) => {
      console.error("openPopup failed", reason);
    });
}

(async () => {
  // Asynchronously import modules. This helps build generate smaller chunks.
  const [
    { default: Basemap },
    { default: config },
    { whenOnce },
    { default: Graphic },
    { default: PortalItem },
    { default: EsriMap },
    { default: MapView },
    { default: Home },
    { default: ScaleBar },
    { addGraphicsToLayer },
    { findNearestRouteLocations },
    { routeLocationToGraphic },
    { callElcFromUrl },
    { accessControlLayer },
    { cityLimitsLayer },
    { createMilepostLayer },
    { parcelsLayer },
    { tempLayer },
    { waExtent },
    { setupLayerList },
    { setupSearch },
    { isGraphicHit, UIAddPositions },
  ] = await Promise.all([
    import("@arcgis/core/Basemap"),
    import("@arcgis/core/config"),
    import("@arcgis/core/core/reactiveUtils"),
    import("@arcgis/core/Graphic"),
    import("@arcgis/core/portal/PortalItem"),
    import("@arcgis/core/Map"),
    import("@arcgis/core/views/MapView"),
    import("@arcgis/core/widgets/Home"),
    import("@arcgis/core/widgets/ScaleBar"),
    import("./addGraphicsToLayer"),
    import("./elc"),
    import("./elc/arcgis"),
    import("./elc/url"),
    import("./layers/AccessControlLayer"),
    import("./layers/CityLimitsLayer"),
    import("./layers/MilepostLayer"),
    import("./layers/parcels"),
    import("./layers/TempLayer"),
    import("./WAExtent"),
    import("./widgets/LayerList"),
    import("./widgets/setupSearch"),
    import("./types"),
  ] as const);

  /**
   * A function that handles the event of finding the nearest route location
   * when the user clicks on the map.
   * @param event - the event object containing map click details
   * @returns - a promise that resolves to an array of {@link RouteLocation|RouteLocations}
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
      locations,
    );
    if (!locations.length) {
      /* __PURE__ */ console.log(
        "No locations returned. Returned value is an empty array.",
      );
    }
    const location = locations[0];

    if (location instanceof Error) {
      throw location;
    }

    const locationGraphic = routeLocationToGraphic(location);
    const addResults = addGraphicsToLayer(milepostLayer, [locationGraphic]);
    /* __PURE__ */ console.debug(
      "addResults returned by addGraphicsToLayer",
      addResults,
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

  // Create basemaps

  const imageryHybridBasemap = new Basemap({
    portalItem: new PortalItem({
      id: "952d28d8d68c4e9ca2db7c7d68307af0",
    }),
  });

  const grayBasemap = new Basemap({
    id: "gray",
    portalItem: new PortalItem({
      id: "2d8f6dfc64244464926dd87d0eb9be86",
    }),
  });

  const map = new EsriMap({
    basemap: imageryHybridBasemap,
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

  setupSidebarCollapseButton(view);

  view
    .when(() => {
      setupHashUpdate(view);
    })
    .catch((error: unknown) => {
      console.error("Failed to initialize view.", error);
    });

  import("@arcgis/core/widgets/Legend")
    .then(({ default: Legend }) => {
      const legend = new Legend({
        view: view,
        container: "legend",
      });

      /* __PURE__ */ console.debug("Added legend", legend);
    })
    .catch((error: unknown) => {
      console.error("Failed to import Legend module.", error);
    });

  if (import.meta.env.DEV) {
    view.watch(["navigating"], (newValue) => {
      if (!newValue) {
        /* __PURE__ */ console.debug("scale", view.scale);
      }
    });
  }

  whenOnce(() => map.initialized)
    .then(() => {
      const shell = document.querySelector<HTMLElement>("calcite-shell");
      const loader = document.querySelector<HTMLElement>("calcite-loader");
      if (!!shell && !!loader) {
        shell.hidden = false;
        loader.hidden = true;
      }
    })
    .catch((error: unknown) => {
      console.error("Failed to initialize map.", error);
    });

  import("@arcgis/core/widgets/BasemapToggle")
    .then(({ default: BasemapToggle }) => {
      const toggle = new BasemapToggle({
        view,
        nextBasemap: grayBasemap,
      });
      view.ui.add(toggle, {
        index: 0,
        position: "bottom-trailing",
      });
    })
    .catch((error: unknown) => {
      console.error("Failed to import BasemapToggle module.", error);
    });

  // Add the loading indicator widget to the map.
  import("./widgets/LoadingIndicator").then(
    ({ setupViewLoadingIndicator }) => setupViewLoadingIndicator(view),
    (reason: unknown) => {
      console.error("Failed to add loading indicator", reason);
    },
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

  setupLayerList({ view, container: "layerlist" }).catch((reason: unknown) => {
    console.error("Failed to setup layer list", reason);
  });

  const home = new Home({
    view,
  });
  import("./widgets/ClearButton").then(
    ({ createClearButton }) => {
      const clearButton = createClearButton({
        layers: [milepostLayer, tempLayer],
      });
      view.ui.add([home, clearButton], UIAddPositions.topTrailing);
    },
    (reason) => {
      console.error("Failed to setup clear button", reason);
    },
  );

  /**
   * Handle the click event on the view.
   * @param event - The click event on the view.
   */
  const handleViewOnClick: __esri.ViewClickEventHandler = (event) => {
    /**
     * If the hit test results are not graphic hits, call
     * {@link findNearestRouteLocations}. Otherwise, open the popup.
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
        console.error(
          "There was an error adding the temporary graphic where the user clicked.",
          r.error,
        );
      });

      // Call findNearestRouteLocations
      try {
        const results = await callFindNearestRouteLocation(event);
        /* __PURE__ */ console.debug("ELC Results", results);
      } catch (error) {
        let message = "Could not find a route location near this location.";

        if (import.meta.env.DEV && error instanceof Error) {
          message += `\n${error.message}`;
        }

        const handleError = (reason: unknown) => {
          console.error("Failed to remove temporary graphic", reason);
        };

        view
          .openPopup({
            title: "Route Location Not Found",
            content: message,
            location: event.mapPoint,
          })
          .catch((reason: unknown) => {
            console.error(`Popup with message "${message}" failed.`, {
              reason,
              event,
            });
          })
          .finally(() => {
            removeTempGraphic().catch(handleError);
          });
      }

      /**
       * Removes the temporary graphic.
       * @returns - a promise that resolves when the graphic is removed.
       */
      const removeTempGraphic = () => {
        // Remove the temporary graphic
        return tempLayer.applyEdits({
          deleteFeatures: [tempGraphic],
        });
      };
    };
    view
      .hitTest(event, {
        include: milepostLayer,
      })
      .then(handleHitTestResult)
      .catch((reason: unknown) => {
        console.error("hitTest failed", reason);
      });
  };
  view.on("click", handleViewOnClick);

  // Set up the form for inputting SRMPdata.
  import("./setupForm")
    .then(({ setupForm }) => setupForm(view, milepostLayer))
    .catch((reason: unknown) => {
      console.error("failed to setup form", reason);
    });

  if (import.meta.env.DEV) {
    milepostLayer
      .when(async () => {
        const { createExportButton } = await import("./widgets/ExportButton");

        const button = createExportButton({
          layer: milepostLayer,
        });
        view.ui.add(button, UIAddPositions.bottomTrailing);
      })
      .catch((reason: unknown) => {
        console.error("failed to create export button", reason);
      });
  }

  // Once the milepost layerview has been created, check for ELC data from the URL
  // and, if present, add the location to the map.
  milepostLayer.on("layerview-create", () => {
    /* __PURE__ */ console.debug("milepost layer view created");

    /**
     * Calls the ELC API to retrieve graphics from the URL and adds them to the milepost layer.
     * @returns A promise that resolves when the graphics have been added to the layer and the view has been updated.
     */
    const callElc = async () => {
      const elcGraphics = await callElcFromUrl(milepostLayer);
      if (elcGraphics) {
        const addedFeatures = await addGraphicsToLayer(
          milepostLayer,
          elcGraphics,
        );
        await view.goTo(addedFeatures);
      }
    };
    callElc().catch((reason: unknown) => {
      /* __PURE__ */ console.error(
        "Failed to add ELC graphics from URL.",
        reason,
      );
      emitErrorEvent(reason);
    });
  });
})().catch((reason: unknown) => {
  console.error(reason);
});
