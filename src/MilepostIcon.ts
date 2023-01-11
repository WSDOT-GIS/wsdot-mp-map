import { type DivIcon, divIcon } from "leaflet";
import type { RouteLocation } from "wsdot-elc";
import { Milepost } from "wsdot-route-utils";
import type PointRouteLocation from "./PointRouteLocation";

export type MPSignOptions = [Milepost] | ConstructorParameters<typeof Milepost>;

export function getMilepostFromRouteLocation(routeLocation: RouteLocation | PointRouteLocation ) {
  const { Srmp, Back } = routeLocation;
  if (Srmp == null) {
    throw new TypeError("Srmp cannot be null or undefined.");
  }
  const mp = new Milepost(Srmp, !!Back);
  return mp;
}

const divIconClass = "mp-sign-icon";
const mpLabelClass = `${divIconClass}__mile-label`;
const mpTextClass = `${divIconClass}__mp-text`;
/**
 *
 * @param options - Defines route ID and milepost
 * @returns
 */
function createMilepostIcon(milepost: Milepost): DivIcon;
function createMilepostIcon(
  ...mpAndBack: ConstructorParameters<typeof Milepost>
): DivIcon;
function createMilepostIcon(...args: MPSignOptions): DivIcon {
  const signDiv = document.createElement("div");

  let milepost: Milepost;
  if (args.length === 2) {
    milepost = new Milepost(...args);
  } else if (args[0] instanceof Milepost) {
    [milepost] = args;
  } else {
    throw new TypeError(`Parameter type(s) not correct: ${args}`);
  }

  // Create the span for the horizontal "MILE" text.
  const mileLabel = document.createElement("span");
  mileLabel.textContent = "Mile";
  mileLabel.classList.add(mpLabelClass);

  // Create the span for the vertical milepost number text.
  const mpSpan = document.createElement("span");
  mpSpan.classList.add(mpTextClass);
  mpSpan.textContent = milepost.toString(false);

  signDiv.append(mileLabel, mpSpan);

  return divIcon({
    html: signDiv.outerHTML,
    className: divIconClass,
  });
}

export { createMilepostIcon };
