import type Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import type { AttributeValue } from "../common";
import { XAndY, type AttributesObject, type TypedGraphic } from "../types";
export const objectIdFieldName = "OBJECTID";

/**
 * Find Nearest Route Locations parameters
 */
export interface FindNearestRouteLocationParameters {
  referenceDate: Date;
  coordinates: number[];
  inSR: number;
  outSR?: number;
  searchRadius: number;
  routeFilter?: string;
  lrsYear?: "Current" | `${number}`;
}

export interface WkidSpatialReference {
  wkid: number;
}

export interface RouteGeometryBase {
  __type?: `${"Polyline" | "Point"}:#Wsdot.Geometry.Contracts`;
  spatialReference: WkidSpatialReference;
}

/**
 * A {@link RouteLocation["RouteGeometry"]} point.
 */
export interface RouteGeometryPoint extends RouteGeometryBase, XAndY {
  __type?: `Point:#Wsdot.Geometry.Contracts`;
}

/**
 * A {@link RouteLocation["RouteGeometry"]} polyline.
 */
export interface RouteGeometryPolyline extends RouteGeometryBase {
  __type?: `Polyline:#Wsdot.Geometry.Contracts`;
  paths: number[][][];
}

export type RouteGeometry = RouteGeometryPoint | RouteGeometryPolyline;

/**
 * Date in the format "M/D/YYYY" or "MM/DD/YYYY".
 * Leading zeros in month and day are not required.
 *
 * This type cannot actually check the validity of the date string,
 * such as the number of digits in the month and day, etc.
 *
 * It only checks for three numbers (not even necessarily integers)
 * separated by slashes.
 */
export type DateString = `${number}/${number}/${number}`;

/**
 * Determines if a given string is a valid date in the format "M/D/YYYY" or "MM/DD/YYYY".
 * Leading zeros in month and day are not required.
 * @param value - The string to validate as a date string.
 * @returns True if the string is a valid date string, false otherwise.
 */
export function isDateString(value: unknown): value is DateString {
  return typeof value === "string" && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value);
}

export type DateType = Date | DateString;

export interface RouteLocation<D extends DateType, G extends RouteGeometry> {
  Angle?: number;
  Arm?: number;
  ArmCalcReturnCode?: number;
  ArmCalcReturnMessage?: string;
  Back?: boolean;
  Decrease?: boolean | null;
  Distance?: number;
  EventPoint?: XAndY;
  Id?: number;
  RealignmentDate?: D;
  ReferenceDate?: D;
  ResponseDate?: D;
  Route?: string;
  RouteGeometry?: G;
  Srmp?: number;
}

export type ArmRouteLocation<
  D extends DateType,
  G extends RouteGeometry,
> = RouteLocation<D, G> & Required<Pick<RouteLocation<D, G>, "Arm">>;

export type SrmpRouteLocation<
  D extends DateType,
  G extends RouteGeometry,
> = RouteLocation<D, G> & Required<Pick<RouteLocation<D, G>, "Srmp" & "Back">>;

export type ValidRouteLocationForMPInput<
  D extends DateType,
  G extends RouteGeometry,
> = ArmRouteLocation<D, G> | SrmpRouteLocation<D, G>;

export type FindNearestRouteLocationResponse<
  D extends DateType,
  G extends RouteGeometry,
> = RouteLocation<D, G>[];

export interface FindRouteLocationParameters<
  D extends DateType = DateType,
  G extends RouteGeometry = RouteGeometry,
> {
  locations: ValidRouteLocationForMPInput<D, G>[];
  referenceDate?: Date;
  outSR: number;
  lrsYear?: "Current" | `${number}`;
}

/**
 * The graphic attributes for a graphic in the Mileposts feature layer.
 */
export interface ElcAttributes
  extends Required<
    Pick<
      RouteLocation<DateString, RouteGeometryPoint>,
      "Route" | "Decrease" | "Srmp" | "Back"
    >
  > {
  [key: string]: AttributeValue;
  [objectIdFieldName]: number;
  /**
   * @inheritdoc
   */
  Route: string;
  /**
   * @inheritdoc
   */
  Srmp: number;
}

export interface LayerFeatureAttributes
  extends ElcAttributes,
    AttributesObject {
  "Township Subdivision": string | null;
  County: string | null;
  City: string | null;
}

/**
 * A milepost point {@link Graphic}.
 */
export type MilepostFeature = Graphic &
  TypedGraphic<Point, LayerFeatureAttributes>;

const elcFieldNames = [
  "Route",
  "Decrease",
  objectIdFieldName,
  "Srmp",
  "Back",
] as const;

const featureLayerAttributesFieldNames = [
  ...elcFieldNames,
  "Township Subdivision",
  "County",
  "City",
] as const;

/**
 * Determines if an object is a {@link ElcAttributes}.
 * @param input - Input object, such as {@link Graphic.attributes}
 * @returns - Returns true under the following conditions:
 * - {@link isElcAttributes} returns `true`
 * - Each string in {@link elcFieldNames} has
 *   a corresponding property in the input object.
 */
function isElcAttributes(input: unknown): input is ElcAttributes {
  return (
    !!input &&
    typeof input === "object" &&
    elcFieldNames.every((fieldName) => Object.hasOwn(input, fieldName))
  );
}

/**
 * Determines if an object is a {@link LayerFeatureAttributes}.
 * @param input - Input object
 * @returns - Returns true under the following conditions:
 * - {@link isElcAttributes} returns `true`
 * - Each string in {@link featureLayerAttributesFieldNames} has
 *   a corresponding property in the input object.
 */
function isValidAttributesObject(
  input: unknown
): input is LayerFeatureAttributes {
  return (
    isElcAttributes(input) &&
    featureLayerAttributesFieldNames.every((fieldName) =>
      Object.hasOwn(input, fieldName)
    )
  );
}

export function isMilepostFeature(
  graphic: Graphic
): graphic is MilepostFeature {
  return (
    graphic.geometry instanceof Point &&
    isValidAttributesObject(graphic.attributes)
  );
}
