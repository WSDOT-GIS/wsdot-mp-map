import beginOverride from "./beginOverride.arcade?raw";

/**
 * The expression info for the primitive override for the milepost label symbol.
 * This will be used on the milepost line layer.
 */
const beginMilepostExpressionInfo = {
	expression: beginOverride,
	type: "CIMExpressionInfo",
	returnType: "String",
} as const;

/**
 * The primitive override for the milepost label symbol.
 * This will be used on the milepost line layer.
 */
export const milepostLabelPrimitiveOverride = {
	primitiveName: "milepostLabel",
	propertyName: "textString",
	type: "CIMPrimitiveOverride",
	valueExpressionInfo: beginMilepostExpressionInfo,
} as const;
