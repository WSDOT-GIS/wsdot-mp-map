import { latLng, LatLng, LatLngLiteral, LatLngTuple } from "leaflet";
import type { IRouteLocation } from "wsdot-elc";

export interface IPointGeometry {
  x: number;
  y: number;
}

type TypeName =
  | "bigint"
  | "boolean"
  | "function"
  | "number"
  | "object"
  | "string"
  | "symbol"
  | "undefined";

function allElementsAreOfType(
  input: Iterable<unknown>,
  type: TypeName,
  minElementCount?: number,
  maxElementCount?: number
) {
  let counter = 0;
  for (const iterator of input) {
    if (!(typeof iterator === type)) {
      return false;
    }
    counter++;
  }

  let minMet = false;
  let maxMet = false;
  if (minElementCount == null || counter >= minElementCount) {
    minMet = true;
  }
  if (maxElementCount == null || counter <= maxElementCount) {
    maxMet = true;
  }

  return minMet && maxMet;
}

export function isCoordinateTuple(
  input: Iterable<unknown>
): input is [number, number] {
  return allElementsAreOfType(input, "number", 2);
}

export interface IPointRouteLocation extends IRouteLocation {
  RouteGeometry: IPointGeometry;
}

export function isPointGeometry(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any
): geometry is IPointGeometry {
  console.group(`Entering ${isPointGeometry.name}…`);
  for (const name of ["x", "y"]) {
    console.log(
      `Checking to see if object has a ${name} property that is a number…`
    );
    if (
      !(Object.hasOwn(geometry, name) && typeof geometry[name] === "number")
    ) {
      console.warn(`mismatch: ${geometry}`, geometry);
      console.groupEnd();
      return false;
    }
  }
  console.groupEnd();
  return true;
}

export function convertToLatLngTuple(input: Iterable<number>): LatLngTuple {
  if (!isCoordinateTuple(input)) {
    throw new TypeError("Input must be an iterable with at least two numbers");
  }

  const [a] = input;

  let x: number;
  let y: number;

  if (a < 0) {
    x = input[0];
    y = input[1];
  } else {
    x = input[1];
    y = input[0];
  }

  return [y, x];
}

export default class PointRouteLocation implements IPointRouteLocation {
  //#region Property definition
  RouteGeometry: IPointGeometry;
  Id?: number | null | undefined;
  Route?: string | null | undefined;
  Decrease?: boolean | null | undefined;
  Arm?: number | null | undefined;
  Srmp?: number | null | undefined;
  Back?: boolean | null | undefined;
  ReferenceDate?: string | Date | null | undefined;
  ResponseDate?: string | Date | null | undefined;
  EndArm?: number | null | undefined;
  EndSrmp?: number | null | undefined;
  EndBack?: boolean | null | undefined;
  EndReferenceDate?: string | Date | null | undefined;
  EndResponseDate?: string | Date | null | undefined;
  RealignmentDate?: string | Date | null | undefined;
  EndRealignmentDate?: string | Date | null | undefined;
  ArmCalcReturnCode?: number | null | undefined;
  ArmCalcEndReturnCode?: number | null | undefined;
  ArmCalcReturnMessage?: string | null | undefined;
  ArmCalcEndReturnMessage?: string | null | undefined;
  LocatingError?: string | null | undefined;
  EventPoint?: IPointGeometry;
  Distance?: number | null | undefined;
  Angle?: number | null | undefined;
  //#endregion

  constructor(routeLocation: IRouteLocation) {
    //#region set properties
    this.RouteGeometry = routeLocation.RouteGeometry;
    this.Id = routeLocation.Id;
    this.Route = routeLocation.Route;
    this.Decrease = routeLocation.Decrease;
    this.Arm = routeLocation.Arm;
    this.Srmp = routeLocation.Srmp;
    this.Back = routeLocation.Back;
    this.ReferenceDate = routeLocation.ReferenceDate;
    this.ResponseDate = routeLocation.ResponseDate;
    this.EndArm = routeLocation.EndArm;
    this.EndSrmp = routeLocation.EndSrmp;
    this.EndBack = routeLocation.EndBack;
    this.EndReferenceDate = routeLocation.EndReferenceDate;
    this.EndResponseDate = routeLocation.EndResponseDate;
    this.RealignmentDate = routeLocation.RealignmentDate;
    this.EndRealignmentDate = routeLocation.EndRealignmentDate;
    this.ArmCalcReturnCode = routeLocation.ArmCalcReturnCode;
    this.ArmCalcEndReturnCode = routeLocation.ArmCalcEndReturnCode;
    this.ArmCalcReturnMessage = routeLocation.ArmCalcReturnMessage;
    this.ArmCalcEndReturnMessage = routeLocation.ArmCalcEndReturnMessage;
    this.LocatingError = routeLocation.LocatingError;
    this.EventPoint = routeLocation.EventPoint;
    this.Distance = routeLocation.Distance;
    this.Angle = routeLocation.Angle;
    //#endregion
  }

  public get routeGeometryXY(): [number, number] {
    return [this.RouteGeometry.x, this.RouteGeometry.y];
  }

  public get leafletLatLngTuple(): LatLngTuple {
    const [x, y] = this.routeGeometryXY;
    return [y, x];
  }

  public get leafletLatLngLiteral(): LatLngLiteral {
    const [x, y] = this.routeGeometryXY;
    return {
      lat: y,
      lng: x,
    };
  }

  public get routeGeometryLatLng(): LatLng {
    return latLng(this.RouteGeometry.y, this.RouteGeometry.x);
  }

  public static isPointRouteLocation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routeLocation: any
  ): routeLocation is IPointRouteLocation {
    return (
      routeLocation?.RouteGeometry &&
      isPointGeometry(routeLocation.RouteGeometry)
    );
  }

  public static convertToLtLng(geometry: IPointGeometry): LatLngTuple {
    return [geometry.y, geometry.x];
  }
}

export interface ISrmpRouteLocation extends IRouteLocation {
  Route: string;
  Decrease: boolean | null;
  Srmp: number;
}

export function isSrmpRouteLocation(
  routeLocation: IRouteLocation
): routeLocation is ISrmpRouteLocation {
  return !!routeLocation.Route && (typeof routeLocation.Srmp === "number")
}
