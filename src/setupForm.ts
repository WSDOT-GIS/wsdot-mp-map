import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import type MapView from "@arcgis/core/views/MapView";
import { callElcFromForm } from "./elc";

export function setupForm(view: MapView, milepostLayer: FeatureLayer) {
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

export default setupForm;
