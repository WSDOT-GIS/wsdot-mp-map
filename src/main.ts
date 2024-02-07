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
  MilepostAttributes,
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

type MPDistanceGraphic = Graphic & {
  attributes: MilepostAttributes & HasDistance;
};

/**
 * Converts a query result to a graphic object.
 *
 * @param feature - The feature to convert
 * @param spatialReference - The spatial reference for the graphic
 * @return The graphic created from the query result
 */
async function queryResultFeatureToGraphic(
  feature: MilepostFeature,
  spatialReference: SpatialReference,
  clickPoint: Point
): Promise<MPDistanceGraphic> {
  // TODO: Remove the spatialReference parameter, as clickPoint should already have this information.
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

/**
 * Group the features by RouteId
 *
 * @param features - array of MilepostFeature objects
 * @returns a Map object with RouteID as key and array of MilepostFeature as value
 */
function groupMPFeatures(features: MilepostFeature[]) {
  // Group the features by RouteId
  // const groups = Map.groupBy(features, (feature) => feature.attributes.RouteID);
  const groupedByRoute = new Map<string, Array<MilepostFeature>>();
  for (const feature of features) {
    const { RouteID } = feature.attributes;
    // Create a new group for this route ID if it doesn't exist.
    if (!groupedByRoute.has(RouteID)) {
      groupedByRoute.set(RouteID, []);
    }
    groupedByRoute.get(RouteID)!.push(feature);
  }
  return groupedByRoute;
}

/**
 * Query the milepost layer and add graphics to the map view based on the provided search radius, click event, and map view.
 *
 * @param defaultSearchRadius - The default search radius for the query
 * @param event - The click event that triggered the query
 * @param view - The map view where the graphics will be added
 * @return A promise that resolves once the graphics are added to the map
 */
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

  const groupedByRoute = groupMPFeatures(queryResult.features);

  const graphics = await Promise.all(
    [...groupedByRoute.entries()].map(async ([, features]) => {
      const graphicPromises = features.map((feature) =>
        queryResultFeatureToGraphic(
          feature,
          view.spatialReference,
          event.mapPoint
        )
      );
      const graphics = await Promise.all(graphicPromises);

      if (graphics.length > 1) {
        // Sort graphics by distance.
        graphics.sort(
          (a: MPDistanceGraphic, b: MPDistanceGraphic) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            a.attributes.distance - b.attributes.distance
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (graphics[0].attributes.distance < graphics[1].attributes.distance) {
          console.error("Sorting failed", graphics);
        }
      }
      // Return only the first graphic, which will have the shortest distance.
      return graphics[0];
    })
  );

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
  function openPopupOrGetMP(hitTestResult: __esri.HitTestResult): void {
    const hitGraphics = hitTestResult.results
      .filter(isGraphicHit)
      .map((gh) => gh.graphic);
    if (hitGraphics.length) {
      view
        .openPopup({
          features: hitGraphics,
          updateLocationEnabled: true,
        })
        .catch((reason) => console.error("failed to open popup", reason));
    } else {
      queryMPLayerAndAddGraphics(defaultSearchRadius, event, view).catch(
        (reason) => console.error("failed to add graphics", reason)
      );
    }
  }
  view
    .hitTest(event, {
      include: milepostLayer,
    })
    .then(openPopupOrGetMP)
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
