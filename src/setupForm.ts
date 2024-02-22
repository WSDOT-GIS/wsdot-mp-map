import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import type MapView from "@arcgis/core/views/MapView";
import { addGraphicsToLayer } from "./addGraphicsToLayer";
import { findRouteLocations, routeLocationToGraphic } from "./elc";
import { padRoute } from "./utils";
import {
  createSrmpInputForm,
  type RouteInputEvent,
} from "./widgets/SrmpInputForm";

// type GoToTarget2D = __esri.GoToTarget2D;

/**
 * Sets up the form for user input and adds event listener to capture SRMP input.
 *
 * @param view - The map view object
 * @param milepostLayer - The feature layer for mileposts
 * @returns - The created SRMP input form
 */
export function setupForm(view: MapView, milepostLayer: FeatureLayer) {
  /* @__PURE__ */ console.debug(setupForm.name, { milepostLayer });

  const form = createSrmpInputForm(view.ui, {
    index: 0,
    position: "top-leading",
  });
  form.addEventListener(
    "srmp-input",
    (event: RouteInputEvent) => {
      /* @__PURE__ */ console.debug(
        "User has input a milepost from the form",
        event
      );

      addSrmpFromForm(event, view, milepostLayer).catch((error) => {
        console.error("Error adding SRMP from form", error);
      });
    },
    {
      passive: true,
    }
  );
  return form;
}

async function addSrmpFromForm(
  event: RouteInputEvent,
  view: MapView,
  milepostLayer: FeatureLayer
) {
  const { route, mp, type } = event.detail;

  // Pad the route if necessary and append the type if there is one.
  const routeId = `${padRoute(route)}${type ?? ""}`;
  const referenceDate = new Date();
  referenceDate.setHours(0, 0, 0, 0);

  const features = await findRouteLocations({
    locations: [{ Route: routeId, Srmp: mp }],
    outSR: view.spatialReference.wkid,
    referenceDate,
  });
  const graphics = features.map(routeLocationToGraphic);
  const { addedFeatures: g } = await addGraphicsToLayer(
    milepostLayer,
    graphics
  );
  return view.goTo({ target: g });
}

export default setupForm;
