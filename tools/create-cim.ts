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

console.log(JSON.stringify(cimSymbol.toJSON()));
