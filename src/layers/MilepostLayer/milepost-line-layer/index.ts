import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { createPopupTemplate, fields } from "..";
import waExtent from "../../../WAExtent";
import { objectIdFieldName } from "../../../elc/types";
import { labelClass as pointLabelClass } from "../labelClass";
import MilepostOffsetLineRenderer from "./MilepostOffsetLineRenderer";

const labelClass = pointLabelClass.clone();
// TODO: Place label at the end point of the line, where the milepost is.

/**
 * Creates a new feature layer that displays mileposts as lines.
 * @param spatialReference - The spatial reference of the layer.
 * @returns A new feature layer that displays mileposts as lines.
 */
export function createMilepostLineLayer(
	spatialReference = waExtent.spatialReference,
) {
	// Make a clone of the milepost point layer, as most of the properties
	// will be the same aside from the geometry type and renderer.
	const lineLayerProperties: __esri.FeatureLayerProperties = {
		labelingInfo: [labelClass],
		geometryType: "polyline",
		title: "Near Mileposts",
		fields,
		objectIdField: objectIdFieldName,
		id: "nearMileposts",
		listMode: "hide",
		fullExtent: waExtent,
		spatialReference,
		// Since there are no features at the beginning,
		// need to add an empty array as the source.
		renderer: MilepostOffsetLineRenderer,
		source: [],
		popupEnabled: true,
		hasM: true,
	};

	const lineLayer = new FeatureLayer(lineLayerProperties);
	lineLayer.popupTemplate = createPopupTemplate(lineLayer);

	return lineLayer;
}
