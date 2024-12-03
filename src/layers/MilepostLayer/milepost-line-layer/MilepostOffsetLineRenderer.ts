import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import { cimVectorMarker, primitiveOverrides } from "../symbol";

const clickPointSymbolLayer: __esri.CIMVectorMarker = {
	type: "CIMVectorMarker",
	enable: true,
	colorLocked: true,
	anchorPointUnits: "Relative",
	size: 10,
	markerPlacement: {
		type: "CIMMarkerPlacementAtExtremities",
		angleToLine: true,
		extremityPlacement: "JustBegin",
	},
	frame: {
		xmin: -5,
		ymin: -5,
		xmax: 5,
		ymax: 5,
	},
	markerGraphics: [
		{
			type: "CIMMarkerGraphic",
			geometry: {
				rings: [
					[
						[0, 5],
						[0.87, 4.92],
						[1.71, 4.7],
						[2.5, 4.33],
						[3.21, 3.83],
						[3.83, 3.21],
						[4.33, 2.5],
						[4.7, 1.71],
						[4.92, 0.87],
						[5, 0],
						[4.92, -0.87],
						[4.7, -1.71],
						[4.33, -2.5],
						[3.83, -3.21],
						[3.21, -3.83],
						[2.5, -4.33],
						[1.71, -4.7],
						[0.87, -4.92],
						[0, -5],
						[-0.87, -4.92],
						[-1.71, -4.7],
						[-2.5, -4.33],
						[-3.21, -3.83],
						[-3.83, -3.21],
						[-4.33, -2.5],
						[-4.7, -1.71],
						[-4.92, -0.87],
						[-5, 0],
						[-4.92, 0.87],
						[-4.7, 1.71],
						[-4.33, 2.5],
						[-3.83, 3.21],
						[-3.21, 3.83],
						[-2.5, 4.33],
						[-1.71, 4.7],
						[-0.87, 4.92],
						[0, 5],
					],
				],
			},
			symbol: {
				type: "CIMPolygonSymbol",
				symbolLayers: [
					{
						type: "CIMSolidStroke",
						enable: true,
						capStyle: "Round",
						joinStyle: "Round",
						// lineStyle3D: "Strip",
						miterLimit: 10,
						width: 0,
						// // height3D: 1,
						// // anchor3D: "Center",
						color: [110, 110, 110, 255],
					},
					{
						type: "CIMSolidFill",
						enable: true,
						color: [255, 100, 100, 255],
					},
				],
				// angleAlignment: "Map",
			},
		},
	],
	scaleSymbolsProportionally: true,
	respectFrame: true,
};
const strokeSymbolLayer: __esri.CIMSolidStroke = {
	type: "CIMSolidStroke",
	effects: [
		{
			type: "CIMGeometricEffectDashes",
			dashTemplate: [5, 3],
			lineDashEnding: "NoConstraint",
			offsetAlongLine: 0,
			// controlPointEnding: "NoConstraint",
		},
	],
	enable: true,
	colorLocked: true,
	capStyle: "Butt",
	joinStyle: "Round",
	// lineStyle3D: "Strip",
	miterLimit: 4,
	width: 2,
	// height3D: 1,
	// anchor3D: "Center",
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
		primitiveOverrides,
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
