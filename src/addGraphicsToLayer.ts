import type Graphic from "@arcgis/core/Graphic";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";

/**
 * Retrieves the added graphics from the given edits result.
 * @param editsResult - The edits result to retrieve added graphics from
 * @returns The added graphics, or null if no added graphics are found
 */
function getAddedGraphics(editsResult: __esri.EditsResult): Graphic[] | null {
  const editedFeatures = editsResult.editedFeatureResults?.map(
    (r) => r.editedFeatures,
  );

  if (!editedFeatures?.length) {
    return null;
  }

  return (
    editedFeatures
      // Get the "adds" from the feature lists.
      // If "adds" is undefined, return an empty array instead.
      .map((f) => f.adds ?? [])
      // Convert Graphic[][] to a single Graphic[] containing all of the graphics.
      .flat()
  );
}

/**
 * Adds graphics to a given layer and returns the result of the edits along with the added features.
 * @param milepostLayer - The layer to which the graphics will be added
 * @param locationGraphics - The graphics to be added to the layer
 * @returns An array of the graphics that were added.
 */
export async function addGraphicsToLayer(
  milepostLayer: FeatureLayer,
  locationGraphics: Graphic[],
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!locationGraphics || locationGraphics.length === 0) {
    console.warn(`${addGraphicsToLayer.name}: No graphics to add`, {
      milepostLayer,
      locationGraphics,
    });
    return null;
  }

  // Add graphics to the layer and await for the edit to complete.
  const editsResult = await milepostLayer.applyEdits(
    {
      addFeatures: locationGraphics,
    },
    {},
  );

  /* __PURE__ */ console.debug(
    `${addGraphicsToLayer.name}: editsResult`,
    editsResult,
  );

  return getAddedGraphics(editsResult);
}
