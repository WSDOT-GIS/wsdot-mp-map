import {
  type DateType,
  type RouteGeometry,
  type RouteLocation,
  type SrmpRouteLocation,
} from "./types";

const [{ default: Graphic }, { default: Point }, { hasXAndY }] =
  await Promise.all([
    import("@arcgis/core/Graphic"),
    import("@arcgis/core/geometry/Point"),
    import("../types"),
  ]);

/**
 * This variable will be increased for each new graphic
 * and used as the object ID for the graphic.
 */
let oid = 0;

/**
 * Tests to see if an {@link RouteLocation} as valid
 * property values needed for an SRMP route location.
 * @param routeLocation - An ELC route location.
 * @returns - True if all property values are valid, false otherwise.
 */
function hasValidSrmpData<D extends DateType, G extends RouteGeometry>(
  routeLocation: RouteLocation<D, G>
): routeLocation is SrmpRouteLocation<D, G> {
  return routeLocation?.Route != null && routeLocation.Srmp != null;
}

/**
 * Converts a date value into a number, as that's how Esri
 * uses dates.
 * @param dateValue - A value representing a date
 * @returns - A numeric representation of the input date
 * value for use with Esri feature layers.
 */
function convertDate(dateValue: unknown): number | null {
  if (dateValue == null) {
    return null;
  } else if (dateValue instanceof Date) {
    return dateValue.getTime();
  } else if (typeof dateValue === "number") {
    return dateValue;
  } else if (typeof dateValue === "string") {
    const output = Date.parse(dateValue);
    if (!isNaN(output)) {
      return output;
    } else {
      console.warn("Invalid date value", dateValue);
    }
  }
  return null;
}

/**
 * Creates a {@link Graphic} from a {@link RouteLocation}
 * @param routeLocation - A route location
 * @returns - A {@link Graphic}.
 */
export function routeLocationToGraphic<
  D extends DateType = DateType,
  G extends RouteGeometry = RouteGeometry,
>(routeLocation: RouteLocation<D, G>) {
  let geometry;
  if (routeLocation.RouteGeometry && hasXAndY(routeLocation.RouteGeometry)) {
    const { x, y, spatialReference } = routeLocation.RouteGeometry;
    geometry = new Point({ x, y, spatialReference });
  } else {
    console.warn("Input does not have valid point geometry.", routeLocation);
  }
  let attributes;
  if (hasValidSrmpData(routeLocation)) {
    const {
      Route,
      Srmp,
      Back,
      Angle,
      Arm,
      ArmCalcReturnCode,
      ArmCalcReturnMessage,
      Decrease,
      Distance,
      RealignmentDate,
      ReferenceDate,
      ResponseDate,
    } = routeLocation;
    attributes = {
      OBJECTID: oid,
      Route,
      Srmp,
      Back: Back ? "B" : "A",
      Angle,
      Arm,
      ArmCalcReturnCode,
      ArmCalcReturnMessage,
      Direction: Decrease ? "D" : "I",
      Distance,
      RealignmentDate: convertDate(RealignmentDate),
      ReferenceDate,
      ResponseDate,
      TownshipSubdivision: null,
      City: null,
      County: null,
    };
    oid++;
  } else {
    console.warn("Input does not have valid SRMP attributes.", routeLocation);
  }
  return new Graphic({
    geometry,
    attributes,
  });
}
