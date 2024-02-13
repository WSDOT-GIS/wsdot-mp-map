import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import type MapView from "@arcgis/core/views/MapView";
import { addGraphicsToLayer } from "./addGraphicsToLayer";
import { findRouteLocations, routeLocationToGraphic } from "./elc";
import { padRoute } from "./utils";
import { createSrmpInputForm } from "./widgets/SrmpInputForm";

export function setupForm(view: MapView, milepostLayer: FeatureLayer) {
  /* @__PURE__ */ console.debug(setupForm.name, { milepostLayer });

  const form = createSrmpInputForm(view.ui, {
    index: 0,
    position: "top-leading",
  });
  form.addEventListener(
    "srmp-input",
    ({ detail: { route, type, mp } }) => {
      /* @__PURE__ */ console.debug("User input a milepost from the form", {
        route,
        type,
        mp,
      });

      // Pad the route if necessary and append the type if there is one.
      const routeId = `${padRoute(route)}${type ?? ""}`;
      const referenceDate = new Date();
      referenceDate.setHours(0, 0, 0, 0);
      findRouteLocations({
        locations: [{ Route: routeId, Srmp: mp }],
        outSR: view.spatialReference.wkid,
        referenceDate,
      })
        .then((features) => features.map(routeLocationToGraphic))
        .then((features) => addGraphicsToLayer(milepostLayer, features))
        .then((features) => view.goTo({ target: features }))
        .catch((error: Error) => {
          if (error.name != "AbortError") {
            /* @__PURE__ */ console.error(
              `Error calling ${findRouteLocations.name}`,
              error
            );
          }
        });

      // callElcFromForm(e.detail, view, milepostLayer).then(
      //   (elcGraphic) => {
      //     if (!elcGraphic) {
      //       /* @__PURE__ */ console.log(
      //         "Returned graphic from user input",
      //         elcGraphic
      //       );
      //     } else {
      //       /* @__PURE__ */ console.warn(
      //         "User input resulted in null graphic."
      //       );
      //     }
      //   },
      //   (reason) => {
      //     /* @__PURE__ */ console.error(callElcFromForm.name, reason);
      //   }
      // );
    },
    {
      passive: true,
    }
  );
}

export default setupForm;
