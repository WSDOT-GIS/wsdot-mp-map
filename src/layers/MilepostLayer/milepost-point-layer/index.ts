import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer");
const SimpleRenderer = await $arcgis.import("@arcgis/core/renderers/SimpleRenderer");
import { createPopupTemplate } from "..";
import waExtent from "../../../WAExtent";
import { objectIdFieldName } from "../../../elc/types";
import { fields } from "../fields";
import { milepostSymbol } from "../symbol";

/**
 * Creates the {@link FeatureLayer} that displays located mileposts.
 * @param spatialReference - The {@link SpatialReference} of the layer.
 * @returns - A {@link FeatureLayer}
 */
export function createMilepostPointLayer(spatialReference: SpatialReference) {
	/**
	 * This is the symbol for the point on the route.
	 */
	const milepostLayer = new FeatureLayer({
		title: "Mileposts",
		id: "mileposts",
		listMode: "hide",
		fields: fields,
		geometryType: "point",
		objectIdField: objectIdFieldName,
		fullExtent: waExtent,
		spatialReference,
		// Since there are no features at the beginning,
		// need to add an empty array as the source.
		source: [],
		popupEnabled: true,
		hasM: true,
	});

	milepostLayer.renderer = createRenderer();
	createPopupTemplate(milepostLayer);

	return milepostLayer;
}

/**
 * Creates the {@link SimpleRenderer} for the milepost layer.
 * @returns - The renderer
 */
function createRenderer() {
	const renderer = new SimpleRenderer({
		symbol: milepostSymbol,
	});
	return renderer;
}
