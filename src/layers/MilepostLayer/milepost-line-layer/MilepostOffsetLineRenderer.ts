import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { convertToCIMSymbol } from "@arcgis/core/symbols/support/cimConversionUtils";
import { isCimVectorMarker } from "../create-cim";
import { cimVectorMarker } from "../symbol";
import { milepostLabelPrimitiveOverride } from "../symbol/primitiveOverrides";
import routeSegmentCimSymbol from "./route-segment-cim-symbol.ts";

function createClickPointSymbolLayer() {
	const clickPointSymbol = new SimpleMarkerSymbol({
		style: "circle",
		color: [255, 100, 100, 255],
		outline: {
			color: "white",
			width: 1,
		},
	});

	console.debug("clickPointSymbol", clickPointSymbol.toJSON());

	const clickPointCimSymbol = convertToCIMSymbol(clickPointSymbol);
	console.debug("cimClickPointSymbol", clickPointCimSymbol.toJSON());

	const clickPointSymbolLayer =
		clickPointCimSymbol.data.symbol?.symbolLayers?.filter(isCimVectorMarker)[0];

	if (!clickPointSymbolLayer) {
		throw new Error("clickPointSymbolLayer not found");
	}
	return clickPointSymbolLayer;
}

const clickPointSymbolLayer = createClickPointSymbolLayer();

const strokeSymbolLayer: __esri.CIMSolidStroke = {
	type: "CIMSolidStroke",
	effects: [
		{
			type: "CIMGeometricEffectDashes",
			dashTemplate: [5, 3],
			lineDashEnding: "NoConstraint",
			offsetAlongLine: 0,
		},
	],
	enable: true,
	colorLocked: true,
	capStyle: "Butt",
	joinStyle: "Round",
	miterLimit: 4,
	width: 2,
	color: [255, 100, 100, 255],
};
const cimOffsetAndMilepostLineSymbol: __esri.CIMLineSymbol = {
	type: "CIMLineSymbol",
	symbolLayers: [
		{
			...cimVectorMarker,
			markerPlacement: {
				type: "CIMMarkerPlacementAtExtremities",
				extremityPlacement: "JustEnd",
				angleToLine: false,
			},
		},
		clickPointSymbolLayer,
		strokeSymbolLayer,
	],
};

const offsetAndMilepostCimSymbol = new CIMSymbol({
	data: {
		primitiveOverrides: [milepostLabelPrimitiveOverride],
		type: "CIMSymbolReference",
		symbol: cimOffsetAndMilepostLineSymbol,
	},
});

/**
 * An Arcade expression to determine if a feature has an end milepost.
 * The Arcade expression will return "1" if the feature has an end milepost, and "0" otherwise.
 * This is used by the renderer to determine which symbol to use.
 */
export const arcadeHasEndSrmp = "IIf($feature.EndSrmp != null, '1', '0')";

/**
 * Simple Renderer using a CIM symbol.
 */
export default new UniqueValueRenderer({
	defaultSymbol: offsetAndMilepostCimSymbol,
	defaultLabel: "Clicked Milepost",
	valueExpression: arcadeHasEndSrmp,
	valueExpressionTitle: "Has an End Milepost",
	uniqueValueInfos: [
		{
			label: "Route Segment",
			symbol: routeSegmentCimSymbol,
			value: "1",
		},
	],
});
