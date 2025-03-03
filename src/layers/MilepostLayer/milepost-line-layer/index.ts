import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ExpressionInfo from "@arcgis/core/popup/ExpressionInfo";
import { createPopupTemplate } from "..";
import waExtent from "../../../WAExtent";
import { objectIdFieldName } from "../../../elc/types";
import { routeSegmentLabelExpressionInfo } from "../arcade";
import { segmentFields as fields } from "../fields";
import MilepostOffsetLineRenderer from "./MilepostOffsetLineRenderer";
import { lineSegmentLabelClass } from "./label";

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
		labelingInfo: [lineSegmentLabelClass],
	};

	const lineLayer = new FeatureLayer(lineLayerProperties);
	const popupTemplate = createPopupTemplate(lineLayer);
	if (popupTemplate) {
		popupTemplate.expressionInfos?.push(
			new ExpressionInfo({
				name: "routeSegmentLabel",
				expression: routeSegmentLabelExpressionInfo.expression ?? undefined,
				returnType: "string",
				title: "Route Segment Label",
			}),
		);
		popupTemplate.title = "{expression/popupTitle}";
	}
	lineLayer.popupTemplate = popupTemplate;

	if (import.meta.env.DEV) {
		lineLayer.when().then(async (layer) => {
			console.log("debugging module", { layer });
			const { nearestGraphic } = await import("./debug-graphic");
			console.log("nearestGraphic", nearestGraphic.toJSON());
		});
	}

	return lineLayer;
}
