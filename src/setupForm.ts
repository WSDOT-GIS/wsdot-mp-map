import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import type MapView from "@arcgis/core/views/MapView";
import { addGraphicsToLayer } from "./addGraphicsToLayer";
import { findRouteLocations } from "./elc";
import {
  createSrmpInputForm,
  type RouteInputEvent,
} from "./widgets/SrmpInputForm";
import { routeLocationToGraphic } from "./elc/arcgis";
import type Graphic from "@arcgis/core/Graphic";
import { ElcError } from "./elc/errors";

// type GoToTarget2D = __esri.GoToTarget2D;

/**
 * Sets up the form for user input and adds event listener to capture SRMP input.
 * @param view - The map view object
 * @param milepostLayer - The feature layer for mileposts
 * @returns - The created SRMP input form
 */
export async function setupForm(view: MapView, milepostLayer: FeatureLayer) {
  const form = await createSrmpInputForm(view.ui, {
    index: 0,
    position: "top-leading",
  });
  form.addEventListener(
    "srmp-input",
    (event: RouteInputEvent) => {
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
/**
 * Add SRMP from form to the map view.
 * @param event - the route input event
 * @param view - the map view
 * @param milepostLayer - the feature layer for mileposts
 * @returns a promise that resolves when the function is complete
 */
async function addSrmpFromForm(
  event: RouteInputEvent,
  view: MapView,
  milepostLayer: FeatureLayer
) {
  /* __PURE__ */ console.group(addSrmpFromForm.name);
  /* __PURE__ */ console.debug("event", event);
  const { route, mp, back } = event.detail;

  // Pad the route if necessary and append the type if there is one.
  const routeId = route.toString().replace(/[idr]$/, "");
  const decrease = route.isDecrease;
  // Create the reference date for ELC call to now, then set time to midnight.
  const referenceDate = new Date();
  referenceDate.setHours(0, 0, 0, 0);

  const routeLocations = await findRouteLocations({
    locations: [{ Route: routeId, Srmp: mp, Back: back, Decrease: decrease }],
    outSR: view.spatialReference.wkid,
    referenceDate,
  });
  /* @__PURE__ */ console.debug("routeLocations", routeLocations);

  // Separate success and error route location results.
  const graphics: Graphic[] = [];
  const errors = new Map<number, ElcError>();
  for (const [i, rl] of routeLocations.entries()) {
    if (rl instanceof ElcError) {
      errors.set(i, rl);
    } else {
      graphics.push(routeLocationToGraphic(rl));
    }
  }

  if (errors.size > 0) {
    console.error(
      `ELC encountered errors with ${errors.size} locations`,
      errors
    );
  }

  if (graphics.length > 0) {
    /* __PURE__ */ console.debug("graphics", graphics);
    let addFeatureResults: Graphic[] | null = null;
    try {
      addFeatureResults = await addGraphicsToLayer(milepostLayer, graphics);
      /* @__PURE__ */ console.debug("addedFeatures", {
        allGraphics: graphics,
        addFeatureResults,
      });
    } catch (error) {
      console.error("Error adding SRMP from form", error);
    }
    /* __PURE__ */ console.groupEnd();
    return addFeatureResults;
  }
}

export default setupForm;
