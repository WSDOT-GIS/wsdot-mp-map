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

/**
 * The bare minimum properties for defining a point.
 */
export interface XAndY {
  x: number;
  y: number;
}

export interface WkidSpatialReference {
  wkid: number;
}

export interface RouteGeometryBase {
  __type?: `${"Polyline" | "Point"}:#Wsdot.Geometry.Contracts`;
  spatialReference: WkidSpatialReference;
}

/**
 * A {@link RouteLocation.RouteGeometry} point.
 */
export interface RouteGeometryPoint extends RouteGeometryBase, XAndY {
  __type?: `Point:#Wsdot.Geometry.Contracts`;
}

/**
 * A {@link RouteLocation.RouteGeometry} polyline.
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
 *
 * @param {string} value - The string to validate as a date string.
 * @return {boolean} True if the string is a valid date string, false otherwise.
 */
export function isDateString(value: string): value is DateString {
  return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value);
}

export type DateTypes = Date | DateString;

export interface RouteLocation<
  D extends DateTypes = Date,
  G extends RouteGeometry = RouteGeometryPoint,
> {
  Angle: number;
  Arm: number;
  ArmCalcReturnCode: number;
  ArmCalcReturnMessage: string;
  Back: boolean;
  Decrease: boolean;
  Distance: number;
  EventPoint: XAndY;
  Id: number;
  RealignmentDate: D;
  ReferenceDate: D;
  ResponseDate: D;
  Route: string;
  RouteGeometry: G;
  Srmp: number;
}

export type FindNearestRouteLocationResponse<
  D extends DateTypes = Date,
  G extends RouteGeometry = RouteGeometryPoint,
> = RouteLocation<D, G>[];
