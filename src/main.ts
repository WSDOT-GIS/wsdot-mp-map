import Basemap from "@arcgis/core/Basemap";
import Graphic from "@arcgis/core/Graphic";
import EsriMap from "@arcgis/core/Map";
import config from "@arcgis/core/config";
import Point from "@arcgis/core/geometry/Point";
import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { distance } from "@arcgis/core/geometry/geometryEngineAsync";
import MapView from "@arcgis/core/views/MapView";
import Home from "@arcgis/core/widgets/Home";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import { createMilepostLayer } from "./MilepostLayer";
import waExtent from "./WAExtent";
import { cityLimitsLayer, roadwayCharacteristicDataLayer } from "./layers";
import {
  findNearestMilepost,
  type MilepostFeature,
  type QueryOptions,
} from "./milepostServiceQuery";
import { isGraphicHit } from "./types";
import { setupWidgets } from "./widgets/expandGroups";
import setupSearch from "./widgets/setupSearch";

const defaultSearchRadius = 3000;

interface HasDistance {
  [key: string]: unknown;
  distance: number;
}

/**
 * Validates if the input value has a distance property.
 *
 * @param value - the value to be validated
 * @return true if the value has a distance property, false otherwise
 */
const validateHasDistance = (value: unknown): value is HasDistance =>
  value != null && typeof value === "object" && "distance" in value;

/**
 * Converts a query result to a graphic object.
 *
 * @param feature - The feature to convert
 * @param spatialReference - The spatial reference for the graphic
 * @return The graphic created from the query result
 */
async function queryResultToGraphic(
  feature: MilepostFeature,
  spatialReference: SpatialReference,
  clickPoint: Point
) {
  const { geometry } = feature;
  const attributes = feature.attributes as typeof feature.attributes &
    HasDistance;
  const { x, y } = geometry;

  const point = new Point({ x, y, spatialReference });

  const graphic = new Graphic({
    geometry: point,
    attributes,
  }) as Graphic & {
    attributes: typeof attributes;
  };

  const distanceBetween = await distance(clickPoint, point, "feet");

  if (validateHasDistance(graphic.attributes)) {
    graphic.attributes.distance = distanceBetween;
  }

  return graphic;
}

async function queryMPLayerAndAddGraphics(
  defaultSearchRadius: number,
  event: __esri.ViewClickEvent,
  view: MapView
) {
  const query: QueryOptions = {
    distance: defaultSearchRadius,
    geometry: [event.mapPoint.x, event.mapPoint.y],
    inSR: view.spatialReference.wkid,
    units: "esriSRUnit_Foot",
  };
  const queryResult = await findNearestMilepost(query);

  const graphics = await Promise.all(
    queryResult.features.map((feature) =>
      queryResultToGraphic(feature, view.spatialReference, event.mapPoint)
    )
  );

  graphics.sort(function (a, b) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return a.attributes.distance - b.attributes.distance;
  });

  // TODO: Only add the results with the shortest distance.

  milepostLayer
    .applyEdits({
      addFeatures: graphics,
    })
    .catch((reason) => console.error("Failed to add graphics", reason));

  console.log("findNearestMilepost", { queryResult, graphics });
}

// import { loadingSymbol } from "./loadingSymbol";
import("./index.css");

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
    /* @__PURE__ */ console.error(`Failed to add loading indicator: ${reason}`)
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

// Set up the form for inputting SRMPdata.
import("./setupForm")
  .then(({ setupForm }) => setupForm(view, milepostLayer))
  .catch((reason) => console.error("failed to setup form", reason));

view.on("click", (event) => {
  view
    .hitTest(event, {
      include: milepostLayer,
    })
    .then((hitTestResult) => {
      const hitGraphics = hitTestResult.results
        .filter(isGraphicHit)
        .map((gh) => gh.graphic);
      if (hitGraphics.length) {
        view.popup.open({
          features: hitGraphics,
          updateLocationEnabled: true,
        });
      } else {
        queryMPLayerAndAddGraphics(defaultSearchRadius, event, view).catch(
          (reason) => console.error("failed to add graphics", reason)
        );
      }
    })
    .catch((reason) => {
      console.error("failed call to hit test", reason);
    });
});

// /**
//  * Handle the click event on the view.
//  *
//  * @param {__esri.ViewClickEvent} event - The click event on the view
//  * @return {Promise<void>} A promise that resolves when the function completes
//  */
// async function handleViewOnClick(
//   event: __esri.ViewClickEvent
// ): Promise<void> {
//   // Test to see if the clicked point intersects any of the milepost graphics.
//   const hitTestResult = await view.hitTest(event, {
//     include: milepostLayer,
//   });

//   // If the user clicked on a milepost graphic, open a popup for the graphic
//   // and exit.
//   if (hitTestResult.results.length > 0) {
//     // Extract the features from the hit test results object's "results" property.
//     const features = hitTestResult.results
//       // Filter out any that are not of type "graphic".
//       // Since we are only testing against a FeatureLayer,
//       // all of them should be "graphic"
//       .filter(isGraphicHit)
//       .map((viewHit) => viewHit.graphic);
//     view
//       .openPopup({
//         location: event.mapPoint,
//         features,
//       })
//       .then(
//         () => {},
//         (reason) => {
//           /* @__PURE__ */ console.error(reason);
//         }
//       );
//     return;
//   }

//   // Add a temp loading graphic
//   const loadingGraphic = new Graphic({
//     geometry: event.mapPoint,
//     symbol: loadingSymbol,
//   });

//   view.graphics.add(loadingGraphic);

//   const graphicPromise = callElc(view, milepostLayer, event.mapPoint, {
//     searchRadius: defaultSearchRadius,
//     useCors: true,
//   });

//   graphicPromise
//     .then((graphic) => {
//       if (graphic) {
//         view
//           .openPopup({
//             features: [graphic],
//             fetchFeatures: true,
//             shouldFocus: true,
//             updateLocationEnabled: true,
//           })
//           .then(
//             () => {},
//             (reason) => {
//               /* @__PURE__ */ console.error(reason);
//             }
//           );
//       } else {
//         /* @__PURE__ */ console.error("graphic was null", { event });
//       }
//     })
//     .catch((reason) => console.error(reason))
//     .finally(() => {
//       // Remove the temp graphic
//       view.graphics.remove(loadingGraphic);
//     });
// }

// view.on("click", (event) => {
//   handleViewOnClick(event).catch((reason) => console.error(reason));
// });

// Promise.all([view.when(), milepostLayer.when()]).then(
//   () => {
//     callElcFromUrl(view, milepostLayer)
//       .then((elcResult) => {
//         /* @__PURE__ */ console.debug("ELC result from URL", elcResult);
//       })
//       .catch((reason) =>
//         console.error("Calling ELC from URL failed.", reason)
//       );
//   },
//   (reason) => console.error(reason)
// );
