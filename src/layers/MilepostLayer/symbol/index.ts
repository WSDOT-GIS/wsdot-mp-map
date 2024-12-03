import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";

const primitiveOverrides: __esri.PrimitiveOverride[] = [
	{
		primitiveName: "milepostLabel",
		propertyName: "textString",
		type: "CIMPrimitiveOverride",
		valueExpressionInfo: {
			expression: "`${$feature.Route}\\n${$feature.SRMP}${$feature.Back}`",
			type: "CIMExpressionInfo",
			returnType: "String",
		},
	},
];
const cimTextSymbol: __esri.CIMTextSymbol = {
	type: "CIMTextSymbol",
	angle: 0,
	fontFamilyName: "Noto Sans",
	height: 9,
	horizontalAlignment: "Center",
	offsetX: 0,
	offsetY: 0,
	strikethrough: false,
	underline: false,
	symbol: {
		type: "CIMPolygonSymbol",
		symbolLayers: [
			{
				type: "CIMSolidFill",
				enable: true,
				color: [255, 255, 255, 255],
			},
		],
	},
	haloSymbol: {
		type: "CIMPolygonSymbol",
		symbolLayers: [{ type: "CIMSolidFill", enable: true, color: [0, 0, 0, 0] }],
	},
	verticalAlignment: "Baseline",
	callout: {
		type: "CIMBackgroundCallout",
		backgroundSymbol: {
			type: "CIMPolygonSymbol",
			symbolLayers: [
				{
					type: "CIMSolidFill",
					color: [1, 115, 92, 255],
					enable: true,
				},
				{
					type: "CIMSolidStroke",
					color: [0, 0, 0, 0],
					width: 1,
					enable: true,
				},
			],
		},
	},
};
const cimMarkerGraphic: __esri.CIMMarkerGraphic = {
	type: "CIMMarkerGraphic",
	geometry: { x: 0, y: 0 },
	primitiveName: "milepostLabel",
	symbol: cimTextSymbol,
	textString: "000SPABCDEF\n0000.00B",
};
const cimVectorMarker: __esri.CIMVectorMarker = {
	type: "CIMVectorMarker",
	enable: true,
	anchorPointUnits: "Relative",
	size: 10,
	frame: { xmin: -5, ymin: -5, xmax: 5, ymax: 5 },
	markerGraphics: [cimMarkerGraphic],
	scaleSymbolsProportionally: true,
	respectFrame: true,
};
const cimPointSymbol: __esri.CIMPointSymbol = {
	type: "CIMPointSymbol",
	symbolLayers: [cimVectorMarker],
	scaleX: 1,
	angleAlignment: "Display",
};
export const milepostSymbol = new CIMSymbol({
	data: {
		primitiveOverrides,
		type: "CIMSymbolReference",
		symbol: cimPointSymbol,
	},
});

export default milepostSymbol;
