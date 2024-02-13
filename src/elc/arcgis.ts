import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import { isPoint } from "../utils";
import {
  DateType,
  RouteGeometry,
  RouteLocation,
  type SrmpRouteLocation,
} from "./types";

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
 * Creates a {@link Graphic} from a {@link RouteLocation}
 * @param routeLocation - A route location
 * @returns - A {@link Graphic}.
 */
export function routeLocationToGraphic<
  D extends DateType = DateType,
  G extends RouteGeometry = RouteGeometry,
>(routeLocation: RouteLocation<D, G>) {
  /* @__PURE__ */ console.group(routeLocationToGraphic.name);
  let geometry;
  if (isPoint(routeLocation.RouteGeometry)) {
    const { x, y, spatialReference } = routeLocation.RouteGeometry;
    geometry = new Point({ x, y, spatialReference });
  } else {
    /* @__PURE__ */ console.warn(
      "Input does not have valid point geometry.",
      routeLocation
    );
  }
  let attributes;
  if (hasValidSrmpData(routeLocation)) {
    const { Route, Srmp, Back } = routeLocation;
    attributes = {
      OBJECTID: oid,
      Route,
      Srmp,
      Back: Back ? "B" : "",
      "Township Subdivision": null,
      City: null,
      County: null,
    };
    oid++;
  } else {
    /* @__PURE__ */ console.warn(
      "Input does not have valid SRMP attributes.",
      routeLocation
    );
  }
  const graphic = new Graphic({
    geometry,
    attributes,
  });

  /* @__PURE__ */ console.groupEnd();

  return graphic;
}
