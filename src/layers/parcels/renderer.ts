const Color = await $arcgis.import("@arcgis/core/Color");
const ClassBreaksRenderer = await $arcgis.import("@arcgis/core/renderers/ClassBreaksRenderer");
const ClassBreakInfo = await $arcgis.import("@arcgis/core/renderers/support/ClassBreakInfo");
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol");
import { rangeDomainProperties } from "@wsdot/land-use-codes";
import { landUseCategoryToColorMapping } from "./colors";

const defaultSymbol = new SimpleFillSymbol({
	outline: {
		color: "black",
		width: 2,
	},
});

type RangeDomainPropertiesItem = (typeof rangeDomainProperties)[number];

const createClassBreak = ({
	name: label,
	minValue,
	maxValue,
}: RangeDomainPropertiesItem): ClassBreakInfo => {
	const symbol = defaultSymbol.clone();
	symbol.outline.color = new Color(landUseCategoryToColorMapping.get(label));
	return new ClassBreakInfo({ label, minValue, maxValue, symbol });
};
const classBreaks = rangeDomainProperties.map(createClassBreak);

export const renderer = new ClassBreaksRenderer({
	defaultSymbol,
	defaultLabel: "Unknown",
	field: "LANDUSE_CD",
	classBreakInfos: classBreaks,
});

if (import.meta.hot) {
	// Update the colors in the class breaks when "./colors" is modified.
	import.meta.hot.accept("./colors", (mod) => {
		if (mod) {
			console.log("hot module replacement", mod);
		}

		renderer.classBreakInfos = rangeDomainProperties.map(createClassBreak);
	});
}
