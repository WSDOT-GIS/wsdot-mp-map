import type Graphic from "@arcgis/core/Graphic";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { type DateString, type RouteGeometry, type RouteLocation } from "./elc";

/**
 * Adds graphics to a given layer and returns the result of the edits along with the added features.
 *
 * @param milepostLayer - The layer to which the graphics will be added
 * @param locationGraphics - The graphics to be added to the layer
 * @returns An object containing the edits result and the added features
 */
export async function addGraphicsToLayer(
  milepostLayer: FeatureLayer,
  locationGraphics: Graphic[]
) {
  const editsResult = await milepostLayer.applyEdits({
    addFeatures: locationGraphics,
  });

  const nonErrorResults = editsResult.addFeatureResults.filter(
    (editResult, i) => {
      if (editResult.error) {
        console.error(`editResult error on item ${i}`, editResult.error);
        return false;
      }
      return true;
    }
  );

  /* @__PURE__ */ console.debug(
    `${nonErrorResults.length} of ${editsResult.addFeatureResults.length} edits succeeded`,
    nonErrorResults
  );

  const addedFeatures = nonErrorResults
    .map((f) => {
      const graphic = locationGraphics.find((g) => {
        const Id = (g.attributes as RouteLocation<DateString, RouteGeometry>)
          .Id;
        return Id === f.objectId;
      });
      return graphic;
    })
    .filter((g) => g !== undefined) as Graphic[];
  /* @__PURE__ */ console.debug("addedFeatures", addedFeatures);

  return { editsResult, addedFeatures };
}
