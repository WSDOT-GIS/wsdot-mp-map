import { type DivIcon, divIcon } from "leaflet";
import type { RouteLocation } from "wsdot-elc";
import { getPrefix, Milepost } from "wsdot-route-utils";
import type PointRouteLocation from "./RouteLocationExtensions";
import { RouteDescription } from "wsdot-route-utils";

export type MPSignOptions = [Milepost] | ConstructorParameters<typeof Milepost>;

export function getMilepostFromRouteLocation(
  routeLocation: RouteLocation | PointRouteLocation
) {
  const { Srmp, Back } = routeLocation;
  if (Srmp == null) {
    throw new TypeError("Srmp cannot be null or undefined.");
  }
  const mp = new Milepost(Srmp, !!Back);
  return mp;
}

/**
 * Splits a milepost into separate span elements.
 * @param milepost
 * @returns
 */
function createMpDataElement(milepost: Milepost) {
  // Make variables for Milepost properties.
  const { mp, isBack } = milepost;

  // Convert the Milepost to a string, then split into
  // the parts before and after the decimal point.
  // If the Milepost is a whole number, the second
  // element in the array will be an undefined.
  const [whole, decimal] = `${mp}`.split(".", 2) as [
    string,
    string | undefined
  ];

  // Create span elements for each of the parts of the number,
  // both pre- and post-decimal point.
  const [wholeSpan, decimalSpan] = [whole, decimal].map((
    /** 
     * The number as text, either before or after the decimal
     * point. 
     */
    s, 
    /**
     * The index of the current element of the array.
     * 
     * 0. Pre-decimal point
     * 1. Post decimal point
     */
    i) => {
    // If there was no decimal point, the second 
    // element will be undefined. In this case,
    // exit now.
    if (s === undefined) {
      return;
    }

    // Create the span corresponding to the current element
    // of the array.
    const span = document.createElement("span");
    span.append(s);
    // Specify the CSS class based on index and 
    // assign to span.
    const cssClass =
      i === 0 ? "mp-label__whole" : i === 1 ? "mp-label__decimal" : null;
    if (cssClass) {
      span.classList.add(cssClass);
    }
    // Add an additional class for back mileage
    // if applicable.
    if (isBack) {
      span.classList.add(`${cssClass}--back`);
    }
    return span;
  }) as [HTMLSpanElement, HTMLSpanElement | undefined];

  // Create a data element to contain the spans.
  const dataElement = document.createElement("data");
  // Add the milepost as string (including "B" suffix
  // where applicable) in the data elements "value" 
  // attribute.
  dataElement.value = milepost.toString();
  dataElement.classList.add("mp-label");

  // Add additional class if it's back mileage.
  if (isBack) {
    dataElement.classList.add("mp-label--back");
  }

  // Append the whole number span.
  dataElement.append(wholeSpan);

  // Add the decimal point and post-decimal point spans
  // if necessary.
  if (decimalSpan) {
    const separatorSpan = document.createElement("span");
    separatorSpan.append(".");

    separatorSpan.classList.add("mp-label__separator");

    dataElement.append(separatorSpan, decimalSpan);
  }

  return dataElement;
}

/**
 * Formats the route information for use on the map marker.
 * @param routeLocation - ELC result object.
 * @returns A string describing the route.
 */
export function createRouteLabel(
  routeLocation: Pick<RouteLocation, "Route" | "Decrease">
) {
  if (routeLocation.Route == null) {
    throw new TypeError("Route property cannot be null or undefined.");
  }
  // Get the route ID with appended "i" or "d"
  const routeId = `${routeLocation.Route}${routeLocation.Decrease ? "d" : "i"}`;

  const routeDesc = new RouteDescription(routeId, {
    allowedSuffixes: ["i", "d"],
    suffixesAreOptional: false,
  });

  let routeLabel: string;

  if (routeDesc.isMainline) {
    const prefix = getPrefix(routeDesc.sr, false);
    routeLabel = `${prefix} ${parseInt(routeDesc.sr, 10)}`;
    if (routeLocation.Decrease) {
      routeLabel += " (Dec.)";
    }
  } else {
    routeLabel = routeDesc.toString();
  }

  return routeLabel;
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
  // const mpSpan = document.createElement("span");
  // mpSpan.textContent = milepost.toString(false);
  const mpSpan = createMpDataElement(milepost);
  mpSpan.classList.add(mpTextClass);

  signDiv.append(mileLabel, mpSpan);

  return divIcon({
    html: signDiv.outerHTML,
    className: divIconClass,
  });
}

export { createMilepostIcon };
