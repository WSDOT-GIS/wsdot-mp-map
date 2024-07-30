import type Graphic from "@arcgis/core/Graphic";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";

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

  const query = milepostLayer.createQuery();
  query.objectIds = editsResult.addFeatureResults.map((r) => r.objectId);
  const results = await milepostLayer.queryFeatures(query);

  return results.features;
}

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      console.log("hot module replacement", newModule);
    }
  });
}
