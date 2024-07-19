import Field from "@arcgis/core/layers/support/Field";

// Create an array of Field objects, each corresponding to a property of RouteLocation<DateString, RouteGeometryPoint>.
export const fieldProperties = [
  {
    name: "Arm",
    type: "double",
    alias: "ARM",
    valueType: "measurement",
  },
  {
    name: "ArmCalcReturnCode",
    type: "small-integer",
    alias: "ARM Calc Return Code",
  },
  {
    name: "ArmCalcReturnMessage",
    type: "string",
    alias: "ARM Calc Return Message",
  },
  {
    name: "ABIndicator",
    type: "string",
    length: 1,
    alias: "Ahead / Back Indicator",
  },
  {
    name: "Direction",
    type: "string",
    alias: "Decrease",
    length: 1,
  },
  {
    name: "Id",
    type: "long",
    alias: "Id",
  },
  {
    name: "RealignmentDate",
    type: "date",
    alias: "RealignmentDate",
  },
  {
    name: "ReferenceDate",
    type: "date",
    alias: "ReferenceDate",
  },
  {
    name: "ResponseDate",
    type: "date",
    alias: "ResponseDate",
  },
  {
    name: "Route",
    type: "string",
    alias: "Route",
  },
  {
    name: "RouteGeometry",
    type: "geometry",
    alias: "RouteGeometry",
  },
  {
    name: "Srmp",
    type: "double",
    alias: "Srmp",
  },
  {
    name: "EventPoint",
    type: "geometry",
    alias: "EventPoint",
  },
  {
    name: "Distance",
    type: "double",
    alias: "Distance",
  },
  {
    name: "Angle",
    type: "double",
    alias: "Angle",
  },
] as const;

export type FieldProperties = (typeof fieldProperties)[number];

export const fields = fieldProperties.map((p) => new Field(p));
