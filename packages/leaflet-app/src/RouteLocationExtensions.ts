import { latLng, LatLng, LatLngLiteral, LatLngTuple } from "leaflet";
import { IRouteLocation, RouteLocation } from "wsdot-elc";
import { Milepost, RouteDescription } from "wsdot-route-utils";

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

/**
 * An extension of {@link RouteLocation} with additional properties
 * and methods.
 */
export default class PointRouteLocation
  extends RouteLocation
  implements IPointRouteLocation
{
  declare RouteGeometry: IPointGeometry;
  declare EventPoint: IPointGeometry;
  declare Srmp: number;

  RouteDescription: RouteDescription;
  Milepost: Milepost;

  /**
   * @inheritdoc
   */
  constructor(...args: ConstructorParameters<typeof RouteLocation>) {
    super(...args);
    const rl = args[0];
    const suffixedLabel = `${rl.Route}${rl.Decrease ? "d" : "i"}`;
    this.RouteDescription = new RouteDescription(suffixedLabel, {
      suffixesAreOptional: false,
      allowedSuffixes: ["i", "d"],
    });
    if (rl.Srmp == null) {
      throw new TypeError("Srmp property cannot be null or undefined.")
    }
    this.Milepost = new Milepost(rl.Srmp, !!rl.Back);
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

/**
 * Detects if a {@link RouteLocation} contains valid SRMP data.
 * @param routeLocation 
 * @returns 
 */
export function isSrmpRouteLocation(
  routeLocation: IRouteLocation
): routeLocation is ISrmpRouteLocation {
  return !!routeLocation.Route && typeof routeLocation.Srmp === "number";
}
