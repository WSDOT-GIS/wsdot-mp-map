import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import type MapView from "@arcgis/core/views/MapView";
import {
  RouteLocator,
  type IFindNearestRouteLocationParameters,
  type IRouteLocation,
  RouteLocation,
} from "wsdot-elc";
import { enumerateQueryResponseAttributes, query } from "./common";
import type { AttributesObject } from "./types";
import type { RouteEventObject } from "./widgets/SrmpInputForm";
import NotImplementedError from "./common/NotImplementedError";

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
async function routeLocationToGraphic(
  routeLocation: IRouteLocation
): Promise<Graphic> {
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

  // TODO: Add Data Library attributes to graphic.
  const result = await queryDataLibrary(graphic);
  for (const key in result) {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      const value = result[key];
      (graphic.attributes as AttributesObject)[key] = value;
    }
  }

  return graphic;
}

/**
 * Queries the WSDOT Data Library feature service and updates
 * the input graphic's attributes with the response data.
 * @param graphic - A graphic.
 * @returns
 */
async function queryDataLibrary(graphic: Graphic) {
  const geometry = graphic.geometry as Point;
  const { x, y, spatialReference } = geometry;
  const queryResponse = await query([x, y], undefined, spatialReference.wkid);
  /* @__PURE__ */ console.debug("data library query response", queryResponse);
  if (!graphic.attributes) {
    /* @__PURE__ */ console.warn(
      'Graphic\'s "attributes" property is null but is expected to be an object.'
    );
  }
  const output: AttributesObject =
    (graphic.attributes as AttributesObject) || {};
  for (const [key, value] of enumerateQueryResponseAttributes(queryResponse)) {
    output[key] = value;
  }

  return output;
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
    if (
      !Object.hasOwn(geometry as Record<string, unknown>, name) ||
      typeof (geometry as Record<string, unknown>)[name] !== "number"
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Adds a graphic to the map of the ELC result.
 * @param elcResponse - Response from call to ELC
 * @param view - Map view
 * @param milepostLayer - Milepost feature layer to which the graphic will be added
 * @param mapPoint - Point the user clicked (if applicable)
 * @returns - The added graphic, or null if the graphic couldn't be added
 * (e.g., if user clicked an area outside of the search radius of a route.)
 */
async function addElcGraphic(
  elcResponse: RouteLocation[],
  view: MapView,
  milepostLayer: FeatureLayer,
  mapPoint?: Point
) {
  const [routeLocation] = elcResponse;

  // Show a popup and exit if the RouteGeometry is not a point.
  if (!isPoint(routeLocation.RouteGeometry)) {
    const message = "Unexpected output from ELC.";
    /* @__PURE__ */ console.warn(message, elcResponse);
    view
      .openPopup({
        content: message,
        location: mapPoint,
      })
      .catch((reason) =>
        /* @__PURE__ */ console.error(`Error opening popup: ${reason}`)
      );
    return null;
  }

  const graphic = await routeLocationToGraphic(routeLocation);
  // Add location to the layer.
  milepostLayer
    .applyEdits({
      addFeatures: [graphic],
    })
    .catch((reason) => console.error(reason));

  return graphic;
}

/**
 * Makes a call to the ELC and adds a point graphic to the {@link milepostLayer}.
 * @param view
 * @param milepostLayer
 * @param mapPoint
 * @param options
 * @returns
 */
export async function callElc(
  view: MapView,
  milepostLayer: FeatureLayer,
  mapPoint: Point,
  options: ElcSetupOptions
) {
  const { x, y, spatialReference } = mapPoint;
  const { wkid } = spatialReference;
  const { searchRadius } = options;
  const inputParameters: IFindNearestRouteLocationParameters = {
    coordinates: [x, y],
    inSR: wkid,
    outSR: wkid,
    searchRadius,
    useCors: true,
    referenceDate: new Date(),
  };
  const routeLocator = new RouteLocator();
  const elcResponse = await routeLocator.findNearestRouteLocations(
    inputParameters
  );

  /* @__PURE__ */ console.debug("ELC Response", {
    inputParameters,
    elcResponse,
  });

  // Show a popup and exit if no results were returned.
  if (elcResponse.length < 1) {
    const message = "No routes within search radius.";
    /* @__PURE__ */ console.debug(message, elcResponse);
    view
      .openPopup({
        content: message,
        location: mapPoint,
      })
      .catch((reason) => console.error(reason));
    return null;
  }

  const graphic = await addElcGraphic(
    elcResponse,
    view,
    milepostLayer,
    mapPoint
  );

  return graphic;
}

/**
 *
 * @param e - The event from the user submitting a milepost via the form
 * @param view - The map view
 * @param milepostLayer - The milepost layer where the result graphic will be added.
 * @param mapPoint - The point where
 */
export async function callElcFromForm(
  e: RouteEventObject,
  view: MapView,
  milepostLayer: FeatureLayer
) {
  const rl = new RouteLocator();
  /* @__PURE__ */ console.debug(
    `${callElcFromForm.name}: RouteEventObject type: ${e.type ?? "null"}`
  );
  if (e.type != null) {
    throw new NotImplementedError(
      "non-mainline types have not been implemented."
    );
  }
  const location = new RouteLocation({
    Route: e.route,
    Srmp: e.mp,
  });
  const elcResponse = await rl.findRouteLocations({
    locations: [location],
    outSR: view.spatialReference.wkid,
    referenceDate: new Date(),
  });

  const graphic = await addElcGraphic(elcResponse, view, milepostLayer);
  return graphic;
}
