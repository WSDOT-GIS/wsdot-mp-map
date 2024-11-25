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
	/* __PURE__ */ console.group(addGraphicsToLayer.name, {
		milepostLayer: { ...milepostLayer },
		locationGraphics: locationGraphics.map((g) => g.toJSON() as unknown),
	});
	try {
		// Add graphics to the layer and await for the edit to complete.
		const editsResult = await milepostLayer.applyEdits(
			{
				addFeatures: locationGraphics,
			},
			{},
		);
		/* __PURE__ */ console.debug(
			"editsResult",
			editsResult.addFeatureResults.map((e) => ({ ...e })),
		);

		// Get the added features from the edits result by querying the milepost layer
		// for the features with matching object IDs.
		const query = milepostLayer.createQuery();
		/* __PURE__ */ console.debug("query", query.toJSON());
		query.objectIds = editsResult.addFeatureResults.map((r) => r.objectId);
		const results = await milepostLayer.queryFeatures(query);

		return results.features;
	} finally {
		/* __PURE__ */ console.groupEnd();
	}
}
