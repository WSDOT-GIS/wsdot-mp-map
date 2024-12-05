const beginMilepostExpressionInfo = {
	expression: "`${$feature.Route}\\n${$feature.SRMP}${$feature.Back}`",
	type: "CIMExpressionInfo",
	returnType: "String",
} as const;
const endMilepostExpressionInfo = {
	...beginMilepostExpressionInfo,
	expression: "`${$feature.Route}\\n${$feature.EndSrmp}${$feature.EndBack}`",
} as const;
const milepostLabelPrimitiveOverride: __esri.PrimitiveOverride = {
	primitiveName: "milepostLabel",
	propertyName: "textString",
	type: "CIMPrimitiveOverride",
	valueExpressionInfo: beginMilepostExpressionInfo,
} as const;
const endMilepostLabelPrimitiveOverride: __esri.PrimitiveOverride = {
	...milepostLabelPrimitiveOverride,
	primitiveName: "endMilepostLabel",
	valueExpressionInfo: endMilepostExpressionInfo,
};

export const primitiveOverrides: __esri.PrimitiveOverride[] = [
	milepostLabelPrimitiveOverride,
];
export const routeSegmentPrimitiveOverrides = [
	milepostLabelPrimitiveOverride,
	endMilepostLabelPrimitiveOverride,
];
