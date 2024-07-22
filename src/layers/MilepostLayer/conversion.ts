/**
 * Conversion from types returned from the ELC to attributes matching the
 * WSDOT Milepost Values layer.
 */
import type { DateString, RouteGeometry, RouteLocation } from "../../elc/types";
import { hasPaths, hasXAndY } from "../../types";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline";
import { RouteDescription } from "wsdot-route-utils";

let objectId = 0;

export interface MilepostAttributes {
  OBJECTID: number;
  RouteID: string | null;
  Direction: "I" | "D";
  SRMP: number | null;
  AheadBackInd: "A" | "B";
  ARM: number | null;
  Azimuth: number | null;
  LRS_Date: `${number}` | null;
  StateRouteNumber: string | null;
  RelRouteType: string | null;
  RelRouteQual: string | null;
  Easting?: number | null;
  Northing?: number | null;
  Latitude?: number | null;
  Longitude?: number | null;
}

export type MilepostGraphic = Omit<Graphic, "attributes"> & {
  attributes: MilepostAttributes;
};

/**
 * Converts an ELC RouteLocation to a {@link Graphic} for the milepost layer.
 * @param elcAttributes - the attributes returned from the ELC
 * @returns - A {@link Graphic} with {@link MilepostAttributes|milepost attributes}.
 */
export function convertToMilepostValues<
  D extends DateString,
  G extends RouteGeometry,
>(elcAttributes: RouteLocation<D, G>): MilepostGraphic {
  // Create geometry.
  const rp = elcAttributes.RouteGeometry;
  let geometry: Point | Polyline | undefined;
  if (rp) {
    if (hasXAndY(rp)) {
      geometry = new Point({ x: rp.x, y: rp.y });
    } else if (hasPaths(rp)) {
      geometry = new Polyline({ paths: rp.paths });
    }
  }

  // Create a RouteDescription so that we can get SR, RRT, and RRQ.
  const route = elcAttributes.Route
    ? new RouteDescription(elcAttributes.Route)
    : null;

  const mdy = elcAttributes.ResponseDate?.split("/", 3) as
    | [string, string, string]
    | undefined;

  const lrsDate = mdy
    ? ([mdy[2], mdy[0], mdy[1]].join("") as `${number}`)
    : null;

  const attributes: MilepostAttributes = {
    OBJECTID: objectId++,
    RouteID: elcAttributes.Route ?? null,
    Direction: elcAttributes.Decrease ? "D" : "I",
    SRMP: elcAttributes.Srmp ?? null,
    AheadBackInd: elcAttributes.Back ? "B" : "A",
    ARM: elcAttributes.Arm ?? null,
    Azimuth: elcAttributes.Angle ?? null,
    LRS_Date: lrsDate,
    StateRouteNumber: route?.sr ?? null,
    RelRouteType: route?.rrt ?? null,
    RelRouteQual: route?.rrq ?? null,
  };

  const graphic = new Graphic({
    attributes,
    geometry,
  });

  return graphic;
}
