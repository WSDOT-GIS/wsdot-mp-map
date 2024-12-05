/**
 * The expression info for the primitive override for the milepost label symbol.
 * This will be used on the milepost line layer.
 */
const beginMilepostExpressionInfo = {
	expression: "`${$feature.Route}\\n${$feature.SRMP}${$feature.Back}`",
	type: "CIMExpressionInfo",
	returnType: "String",
} as const;

/**
 * The expression info for the primitive override for the end milepost label symbol.
 * This will be used on the route segment line layer.
 */
const endMilepostExpressionInfo = {
	...beginMilepostExpressionInfo,
	expression: "`${$feature.Route}\\n${$feature.EndSrmp}${$feature.EndBack}`",
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

/**
 * The primitive override for the end milepost label symbol.
 * This will be used on the route segment line layer.
 */
export const endMilepostLabelPrimitiveOverride = {
	...milepostLabelPrimitiveOverride,
	primitiveName: "endMilepostLabel",
	valueExpressionInfo: endMilepostExpressionInfo,
} as const;
