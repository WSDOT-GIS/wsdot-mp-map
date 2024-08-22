import Collection from "@arcgis/core/core/Collection";
import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import type Field from "@arcgis/core/layers/support/Field";
import FieldInfo from "@arcgis/core/popup/FieldInfo";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
import { SimpleMarkerSymbol } from "@arcgis/core/symbols";
import waExtent from "../../WAExtent";
import { highwaySignBackgroundColor, highwaySignTextColor } from "../../colors";
import { objectIdFieldName } from "../../elc/types";
import type { MilepostExpressionInfo } from "./arcade";
import {
	expressions as arcadeExpressions,
	locationLinksContent,
} from "./arcade";
import labelClass from "./labelClass";

type FieldProperties = Required<ConstructorParameters<typeof Field>>[0];

export enum fieldNames {
	Route = "Route",
	Srmp = "Srmp",
	Back = "Back",
	Direction = "Direction",
}

export const fields = [
	{
		name: objectIdFieldName,
		type: "oid",
		valueType: "unique-identifier",
	},
	{
		name: fieldNames.Route,
		type: "string",
		valueType: "name-or-title",
	},
	{
		name: fieldNames.Direction,
		type: "string",
		domain: {
			type: "coded-value",
			codedValues: [
				{
					code: "I",
					name: "Increase",
				},
				{
					code: "D",
					name: "Decrease",
				},
			],
			name: "Direction",
		},
		defaultValue: "I",
		valueType: "type-or-category",
	},
	{
		name: fieldNames.Srmp,
		type: "double",
		valueType: "measurement",
	},
	{
		name: fieldNames.Back,
		type: "string",
		valueType: "binary",
	},
] as FieldProperties[];

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
 * Creates the {@link FeatureLayer} that displays located mileposts.
 * @param spatialReference - The {@link SpatialReference} of the layer.
 * @returns - A {@link FeatureLayer}
 */
export function createMilepostLayer(spatialReference: SpatialReference) {
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
	 * @returns The created popup template.
	 */
	function createPopupTemplate() {
		const popupTemplate = milepostLayer.createPopupTemplate({
			// Hide all of the initial fields.
			// These fields are already displayed in the popup's title.
			visibleFieldNames: new Set(),
		});

		const actions = createActionButtons();
		popupTemplate.actions = actions;

		// Import the Arcade expressions, add them to the popup template, and then
		// add them to the popup template's fieldInfos array.
		popupTemplate.expressionInfos = arcadeExpressions;

		// Append expressions to the PopupTemplate's fieldInfos array.
		for (const xi of arcadeExpressions) {
			const fieldInfo = createAndAddFieldInfoForExpression(xi);
			// Hide the GeoURI and SRViewURL fields.
			if (["geoURI"].includes(xi.name)) {
				fieldInfo.visible = false;
			}
			popupTemplate.fieldInfos.push(fieldInfo);
		}
		popupTemplate.title = "{Route} ({Direction}) @ {expression/milepostLabel}";

		if (Array.isArray(popupTemplate.content)) {
			popupTemplate.content = [locationLinksContent, ...popupTemplate.content];
		}

		return popupTemplate;
	}
	/**
	 * This is the symbol for the point on the route.
	 */
	const milepostLayer = new FeatureLayer({
		labelingInfo: [labelClass],
		title: "Mileposts",
		id: "mileposts",
		listMode: "hide",
		fields: fields,
		geometryType: "point",
		objectIdField: objectIdFieldName,
		fullExtent: waExtent,
		spatialReference,
		// Since there are no features at the beginning,
		// need to add an empty array as the source.
		source: [],
		popupEnabled: true,
		hasM: true,
	});

	milepostLayer.renderer = createRenderer();
	milepostLayer.popupTemplate = createPopupTemplate();

	return milepostLayer;
}
function createRenderer() {
	const actualMPSymbol = new SimpleMarkerSymbol({
		color: highwaySignBackgroundColor,
		size: 12,
		style: "circle",
		outline: {
			width: 1,
			color: highwaySignTextColor,
		},
	});

	const renderer = new SimpleRenderer({
		symbol: actualMPSymbol,
	});
	return renderer;
}
