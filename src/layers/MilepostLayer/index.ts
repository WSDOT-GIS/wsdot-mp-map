import Collection from "@arcgis/core/core/Collection";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import type Field from "@arcgis/core/layers/support/Field";
import FieldInfo from "@arcgis/core/popup/FieldInfo";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
import type { MilepostExpressionInfo } from "./arcade";
import {
	expressions as arcadeExpressions,
	locationLinksContent,
} from "./arcade";

export type FieldProperties = Required<ConstructorParameters<typeof Field>>[0];

const actionButtonProperties: __esri.ActionButtonProperties[] = [
	{
		active: false,
		title: "Copy coordinates",
		visible: true,
		type: "button",
		icon: "copy-to-clipboard",
		id: "copy",
	},
];

function createActionButtons() {
	return new Collection<InstanceType<typeof ActionButton>>(
		actionButtonProperties.map((ap) => new ActionButton(ap)),
	);
}

/**
 * A function that creates and adds field information for an expression.
 * @param milepostExpressionInfo - The expression information to create the field info for.
 * @returns The created field info.
 */
function createAndAddFieldInfoForExpression(
	milepostExpressionInfo: MilepostExpressionInfo,
) {
	const fieldInfo = new FieldInfo({
		fieldName: `expression/${milepostExpressionInfo.name}`,
		visible: !["webMercatorToWgs1984", "milepostLabel"].includes(
			milepostExpressionInfo.name,
		),
	});
	return fieldInfo;
}

/**
 * Creates a popup template for the milepost layer by hiding certain fields and adding arcade expressions.
 * @param milepostLayer - The milepost layer.
 * @returns The created popup template.
 */
export function createPopupTemplate(milepostLayer: FeatureLayer) {
	const popupTemplate = milepostLayer.createPopupTemplate({
		// Hide all of the initial fields.
		// These fields are already displayed in the popup's title.
		visibleFieldNames: new Set(),
	});

	if (!popupTemplate) {
		throw new TypeError("Popup template is not defined.");
	}

	const actions = createActionButtons();
	popupTemplate.actions = actions;

	// Import the Arcade expressions, add them to the popup template, and then
	// add them to the popup template's fieldInfos array.
	popupTemplate.expressionInfos = arcadeExpressions;

	// Append expressions to the PopupTemplate's fieldInfos array.
	for (const xi of arcadeExpressions) {
		const fieldInfo = createAndAddFieldInfoForExpression(xi);
		// Hide the GeoURI and SRViewURL fields.
		if (["geoURI", "popupTitle"].includes(xi.name)) {
			fieldInfo.visible = false;
		}
		if (!popupTemplate.fieldInfos) {
			popupTemplate.fieldInfos = [];
		}
		popupTemplate.fieldInfos.push(fieldInfo);
	}
	popupTemplate.title = "{expression/popupTitle}";

	if (Array.isArray(popupTemplate.content)) {
		popupTemplate.content = [locationLinksContent, ...popupTemplate.content];
	}

	milepostLayer.popupTemplate = popupTemplate;

	return popupTemplate;
}
