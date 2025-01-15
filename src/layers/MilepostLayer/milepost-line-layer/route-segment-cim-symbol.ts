const { default: CIMSymbol } = await import(
	"@arcgis/core/symbols/CimSymbol.js"
);

const cimOffsetAndMilepostLineSymbol: __esri.CIMLineSymbol = {
	type: "CIMLineSymbol",
	symbolLayers: [
		{
			type: "CIMSolidStroke",
			enable: true,
			capStyle: "Butt",
			joinStyle: "Round",
			miterLimit: 10,
			width: 2,
			color: [0, 0, 0, 255],
		},
		{
			type: "CIMVectorMarker",
			enable: true,
			size: 32,
			colorLocked: true,
			anchorPointUnits: "Relative",
			frame: {
				xmin: -5,
				ymin: -5,
				xmax: 5,
				ymax: 5,
			},
			markerGraphics: [
				{
					type: "CIMMarkerGraphic",
					primitiveName: "startpointText",
					geometry: {
						x: 0,
						y: 0,
					},
					symbol: {
						type: "CIMTextSymbol",
						fontFamilyName: "Arial",
						fontStyleName: "Bold",
						height: 4,
						horizontalAlignment: "Center",
						offsetX: 0,
						offsetY: 5.5,
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
						verticalAlignment: "Center",
					},
					textString: "1",
				},
			],
			scaleSymbolsProportionally: true,
			respectFrame: true,
			markerPlacement: {
				type: "CIMMarkerPlacementAtExtremities",
				angleToLine: false,
				offset: 0,
				extremityPlacement: "JustBegin",
				offsetAlongLine: 0,
			},
		},
		{
			type: "CIMVectorMarker",
			enable: true,
			size: 32,
			colorLocked: true,
			anchorPointUnits: "Relative",
			frame: {
				xmin: -5,
				ymin: -5,
				xmax: 5,
				ymax: 5,
			},
			markerGraphics: [
				{
					type: "CIMMarkerGraphic",
					primitiveName: "endpointText",
					geometry: {
						x: 0,
						y: 0,
					},
					symbol: {
						type: "CIMTextSymbol",
						fontFamilyName: "Arial",
						fontStyleName: "Bold",
						height: 4,
						horizontalAlignment: "Center",
						offsetX: 0,
						offsetY: 5.5,
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
						verticalAlignment: "Center",
					},
					textString: "1",
				},
			],
			scaleSymbolsProportionally: true,
			respectFrame: true,
			markerPlacement: {
				type: "CIMMarkerPlacementAtExtremities",
				angleToLine: false,
				offset: 0,
				extremityPlacement: "JustEnd",
				offsetAlongLine: 0,
			},
		},
		{
			type: "CIMVectorMarker",
			enable: true,
			anchorPoint: {
				x: 0,
				y: -0.5,
			},
			anchorPointUnits: "Relative",
			size: 36.8,
			frame: {
				xmin: 0,
				ymin: 0,
				xmax: 17,
				ymax: 17,
			},
			markerGraphics: [
				{
					type: "CIMMarkerGraphic",
					geometry: {
						rings: [
							[
								[8.5, 0.2],
								[7.06, 0.33],
								[5.66, 0.7],
								[4.35, 1.31],
								[3.16, 2.14],
								[2.14, 3.16],
								[1.31, 4.35],
								[0.7, 5.66],
								[0.33, 7.06],
								[0.2, 8.5],
								[0.33, 9.94],
								[0.7, 11.34],
								[1.31, 12.65],
								[2.14, 13.84],
								[3.16, 14.86],
								[4.35, 15.69],
								[5.66, 16.3],
								[7.06, 16.67],
								[8.5, 16.8],
								[9.94, 16.67],
								[11.34, 16.3],
								[12.65, 15.69],
								[13.84, 14.86],
								[14.86, 13.84],
								[15.69, 12.65],
								[16.3, 11.34],
								[16.67, 9.94],
								[16.8, 8.5],
								[16.67, 7.06],
								[16.3, 5.66],
								[15.69, 4.35],
								[14.86, 3.16],
								[13.84, 2.14],
								[12.65, 1.31],
								[11.34, 0.7],
								[9.94, 0.33],
								[8.5, 0.2],
							],
						],
					},
					symbol: {
						type: "CIMPolygonSymbol",
						symbolLayers: [
							{
								type: "CIMSolidFill",
								enable: true,
								color: [1, 115, 92, 255],
							},
						],
					},
				},
			],
			scaleSymbolsProportionally: true,
			respectFrame: true,
			markerPlacement: {
				type: "CIMMarkerPlacementAtExtremities",
				angleToLine: false,
				offset: 0,
				extremityPlacement: "Both",
				offsetAlongLine: 0,
			},
		},
		{
			type: "CIMVectorMarker",
			enable: true,
			anchorPoint: {
				x: 0,
				y: 0,
			},
			anchorPointUnits: "Relative",
			size: 4,
			frame: {
				xmin: 0,
				ymin: 0,
				xmax: 39.7,
				ymax: 17,
			},
			markerGraphics: [
				{
					type: "CIMMarkerGraphic",
					geometry: {
						rings: [
							[
								[32.2, 0],
								[7.4, 0],
								[6, 0.2],
								[4.6, 0.6],
								[3.3, 1.4],
								[2.2, 2.5],
								[1.2, 3.8],
								[0.6, 5.2],
								[0.1, 6.8],
								[0, 8.5],
								[0.1, 10.2],
								[0.6, 11.8],
								[1.2, 13.2],
								[2.2, 14.5],
								[3.3, 15.6],
								[4.6, 16.4],
								[6, 16.8],
								[7.4, 17],
								[32.2, 17],
								[33.7, 16.8],
								[35.1, 16.4],
								[36.4, 15.6],
								[37.5, 14.5],
								[38.4, 13.2],
								[39.1, 11.7],
								[39.6, 10.2],
								[39.7, 8.5],
								[39.6, 6.8],
								[39.1, 5.3],
								[38.4, 3.8],
								[37.5, 2.5],
								[36.4, 1.4],
								[35.1, 0.6],
								[33.7, 0.2],
								[32.2, 0],
							],
						],
					},
					symbol: {
						type: "CIMPolygonSymbol",
						symbolLayers: [
							{
								type: "CIMSolidFill",
								enable: true,
								color: [170, 170, 170, 255],
							},
						],
					},
				},
			],
			scaleSymbolsProportionally: true,
			respectFrame: true,
			markerPlacement: {
				type: "CIMMarkerPlacementAtExtremities",
				angleToLine: false,
				offset: 0,
				extremityPlacement: "Both",
				offsetAlongLine: 0,
			},
		},
	],
};

export const lineSegmentCimSymbol = new CIMSymbol({
	data: {
		type: "CIMSymbolReference",
		symbol: cimOffsetAndMilepostLineSymbol,
		primitiveOverrides: [
			{
				primitiveName: "startpointText",
				propertyName: "textString",
				type: "CIMPrimitiveOverride",
				valueExpressionInfo: {
					expression: "`${$feature.SRMP}${$feature.Back}`",
					type: "CIMExpressionInfo",
				},
			},
			{
				primitiveName: "endpointText",
				propertyName: "textString",
				type: "CIMPrimitiveOverride",
				valueExpressionInfo: {
					expression: "`${$feature.EndSrmp}${$feature.EndBack}`",
					type: "CIMExpressionInfo",
				},
			},
		],
	},
});

export default lineSegmentCimSymbol;
