/**
 * This script was used to create the milepost marker symbol,
 * after which it was further modified.
 */

import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import { convertToCIMSymbol } from "@arcgis/core/symbols/support/cimConversionUtils";
import {
	highwaySignBackgroundColor,
	highwaySignTextColor,
} from "../src/colors";

const simpleSymbol = new TextSymbol({
	color: highwaySignTextColor,
	backgroundColor: highwaySignBackgroundColor,
	text: "000SPABCDEF\n0000.00B",
});

const cimSymbol = convertToCIMSymbol(
	simpleSymbol as unknown as __esri.SimpleMarkerSymbol,
);

cimSymbol.data.primitiveOverrides = [
	{
		primitiveName: "milepostLabel",
		propertyName: "textString",
		valueExpressionInfo: {
			expression: "`${$feature.Route}\\n${$feature.SRMP}${$feature.Back}`",
			type: "CIMExpressionInfo",
			returnType: "String",
		},
	},
];

if (cimSymbol.data.symbol?.symbolLayers) {
	let found = false;
	for (const layer of cimSymbol.data.symbol.symbolLayers.filter(
		(l) => l.type === "CIMVectorMarker",
	)) {
		for (const markerGraphic of layer.markerGraphics.filter(
			(g) => g.symbol.type === "CIMTextSymbol",
		)) {
			markerGraphic.primitiveName = "milepostLabel";
			found = true;
			break;
		}
		if (found) {
			break;
		}
	}
}

console.log(JSON.stringify(cimSymbol.toJSON(), null, 2));
