import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import ExpressionInfo from "@arcgis/core/popup/ExpressionInfo";
import { TextSymbol } from "@arcgis/core/symbols";
import { createPopupTemplate } from "..";
import waExtent from "../../../WAExtent";
import { highwaySignTextColor } from "../../../colors";
import { objectIdFieldName } from "../../../elc/types";
import { routeSegmentLabelExpressionInfo } from "../arcade";
import { segmentFields as fields } from "../fields";
import MilepostOffsetLineRenderer from "./MilepostOffsetLineRenderer";

const lineSegmentLabelClass = new LabelClass({
	where: "EndSrmp IS NOT NULL",
	labelExpressionInfo: routeSegmentLabelExpressionInfo,
	labelPlacement: "above-along",
	labelPosition: "curved",
	minScale: 144447.638572,
	allowOverrun: true,
	repeatLabel: false,
	symbol: new TextSymbol({
		color: highwaySignTextColor,
		verticalAlignment: "baseline",
		haloColor: "black",
		haloSize: 2.5,
		// // The background only shows up when zoomed out enough that the label overruns its polyline feature.
		// backgroundColor: highwaySignBackgroundColor,
		// borderLineColor: highwaySignTextColor,
		// borderLineSize: 1,
		font: {
			family: "Arial",
			size: 10,
			weight: "bold",
		},
	}),
});

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
	popupTemplate.expressionInfos.push(
		new ExpressionInfo({
			name: "routeSegmentLabel",
			...routeSegmentLabelExpressionInfo,
		}),
	);
	popupTemplate.title = "{expression/routeSegmentLabel}";
	lineLayer.popupTemplate = popupTemplate;

	return lineLayer;
}
