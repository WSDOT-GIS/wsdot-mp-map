import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import { SimpleMarkerSymbol } from "@arcgis/core/symbols";
import { createPopupTemplate, fields } from "..";
import waExtent from "../../../WAExtent";
import {
	highwaySignBackgroundColor,
	highwaySignTextColor,
} from "../../../colors";
import { objectIdFieldName } from "../../../elc/types";
import labelClass from "../labelClass";

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
		labelingInfo: [labelClass],
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
function createRenderer() {
	const actualMPSymbol = new SimpleMarkerSymbol({
		color: highwaySignBackgroundColor,
		size: 12,
		style: "circle",
		outline: {
			width: 1,
			color: highwaySignTextColor,
		},
	});

	const renderer = new SimpleRenderer({
		symbol: actualMPSymbol,
	});
	return renderer;
}
