import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import type MapView from "@arcgis/core/views/MapView";
import {
  RouteLocator,
  type IFindNearestRouteLocationParameters,
  type RouteLocation,
  type IRouteLocation,
} from "wsdot-elc";
import { createMilepostLayer, ElcAttributes } from "./MilepostLayer";

const defaultSearchRadius = 200;

type ElcSetupOptions = Pick<
  IFindNearestRouteLocationParameters,
  "searchRadius" | "useCors"
>;

type PointProperties = Pick<Point, "x" | "y" | "spatialReference">;

interface ValidRouteLocation extends IRouteLocation {
  Route: string;
  Srmp: number;
}

/**
 * Tests to see if an {@link IRouteLocation} as valid
 * property values needed for an SRMP route location.
 * @param routeLocation - An ELC route location.
 * @returns - True if all property values are valid, false otherwise.
 */
function hasValidSrmpData(
  routeLocation: IRouteLocation
): routeLocation is ValidRouteLocation {
  return (
    routeLocation && routeLocation.Route != null && routeLocation.Srmp != null
  );
}

let oid = 0;

/**
 * Creates a {@link Graphic} from a {@link IRouteLocation}
 * @param routeLocation - A route location
 * @returns - A {@link Graphic}.
 */
function routeLocationToGraphic(routeLocation: IRouteLocation): Graphic {
  let geometry;
  if (isPoint(routeLocation.RouteGeometry)) {
    const { x, y, spatialReference } = routeLocation.RouteGeometry;
    geometry = new Point({ x, y, spatialReference });
  } else {
    console.warn("Input does not have valid point geometry.", routeLocation);
  }
  let attributes;
  if (hasValidSrmpData(routeLocation)) {
    const { Route, Srmp, Back } = routeLocation;
    attributes = {
      OBJECTID: oid,
      Route,
      Srmp,
      Back: Back ? "B" : "",
    } as ElcAttributes;
    oid++;
  } else {
    console.warn("Input does not have valid SRMP attributes.", routeLocation);
  }
  return new Graphic({
    geometry,
    attributes,
  });
}

/**
 * Determines if an input geometry object has both "x" and "y"
 * properties which are both numbers.
 * @param geometry - Value from {@link RouteLocation.RouteGeometry}
 * @returns - `true` if {@link geometry} has "x" and "y" properties
 * with numeric values, `false` otherwise.
 */
function isPoint(
  geometry: RouteLocation["RouteGeometry"]
): geometry is PointProperties {
  if (geometry == null) {
    return false;
  }
  for (const name of ["x", "y"]) {
    if (!Object.hasOwn(geometry, name) || typeof geometry[name] !== "number") {
      return false;
    }
  }
  return true;
}

/**
 * Set up the route location (ELC) functionality in the map view.
 * @param view
 * @param options
 */
export async function setupElc(
  view: MapView,
  options: ElcSetupOptions = {
    searchRadius: defaultSearchRadius,
    useCors: true,
  }
) {
  async function callElc(event: __esri.ViewClickEvent): Promise<void> {
    const { mapPoint } = event;
    const { x, y, spatialReference } = mapPoint;
    const { wkid } = spatialReference;
    const { searchRadius } = options;
    const inputParameters: IFindNearestRouteLocationParameters = {
      coordinates: [x, y],
      inSR: wkid,
      outSR: wkid,
      searchRadius,
      referenceDate: new Date(),
    };
    const routeLocator = new RouteLocator();
    const elcResponse = await routeLocator.findNearestRouteLocations(
      inputParameters
    );

    console.debug("ELC Response", { inputParameters, elcResponse });

    // Show a popup and exit if no results were returned.
    if (elcResponse.length < 1) {
      const message = "No routes within search radius.";
      console.debug(message, elcResponse);
      view.popup.open({
        content: message,
        location: mapPoint,
      });
      return;
    }

    const [routeLocation] = elcResponse;

    // Show a popup and exit if the RouteGeometry is not a point.
    if (!isPoint(routeLocation.RouteGeometry)) {
      const message = "Unexpected output from ELC.";
      console.warn(message, elcResponse);
      view.popup.open({
        content: message,
        location: mapPoint,
      });
      return;
    }

    const graphic = routeLocationToGraphic(routeLocation);
    // Add location to the layer.
    mpLayer.applyEdits({
      addFeatures: [graphic],
    });
  }

  const mpLayer = createMilepostLayer(view.spatialReference);
  view.map.add(mpLayer);

  view.on("click", callElc);
}
