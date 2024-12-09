import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { convertToCIMSymbol } from "@arcgis/core/symbols/support/cimConversionUtils";
import { isCimVectorMarker } from "../create-cim";
import { cimVectorMarker } from "../symbol";
import {
	endMilepostLabelPrimitiveOverride,
	milepostLabelPrimitiveOverride,
} from "../symbol/primitiveOverrides";

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
const cimLineSymbol: __esri.CIMLineSymbol = {
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
const cimSymbol = new CIMSymbol({
	data: {
		primitiveOverrides: [
			milepostLabelPrimitiveOverride,
			endMilepostLabelPrimitiveOverride,
		],
		type: "CIMSymbolReference",
		symbol: cimLineSymbol,
	},
});

/**
 * Simple Renderer using a CIM symbol.
 */
export default new SimpleRenderer({
	symbol: cimSymbol,
});
