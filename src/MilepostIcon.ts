import { type DivIcon, divIcon } from "leaflet";
import type { RouteLocation } from "wsdot-elc";
import { getPrefix, Milepost } from "wsdot-route-utils";
import type PointRouteLocation from "./RouteLocationExtensions";
import { RouteDescription } from "wsdot-route-utils";
import type { ISrmpRouteLocation } from "./RouteLocationExtensions";

export type MPSignOptions = [Milepost] | ConstructorParameters<typeof Milepost>;

// Defined variables for CSS class names that elements will use.
const divIconClass = "mp-sign-icon";
const routeLabelClass = `${divIconClass}__route-label`;
const mpTextClass = `${divIconClass}__mp-text`;

/**
 * Creates a Milepost from properties of a
 * {@link RouteLocation}
 * @param routeLocation - A route location with {@link RouteLocation.Srmp SRMP property}
 * value supplied.
 * @returns A {@link Milepost} object.
 */
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
  const [wholeSpan, decimalSpan] = [whole, decimal].map(
    (
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
      i
    ) => {
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
    }
  ) as [HTMLSpanElement, HTMLSpanElement | undefined];

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

  dataElement.classList.add(mpTextClass);

  return dataElement;
}

type RouteLabelParameters = Pick<RouteLocation, "Route" | "Decrease">;

/**
 * Formats the route information for use on the map marker.
 * @param routeLocation - ELC result object.
 * @returns A string describing the route.
 */
function createRouteLabel(routeLocation: RouteLabelParameters) {
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
    // This will instead be handeld in CSS "::after".
    // if (routeLocation.Decrease) {
    //   routeLabel += " (Dec.)";
    // }
  } else {
    routeLabel = routeDesc.toString();
  }

  return routeLabel;
}

function createRouteLabelElement(routeLocation: RouteLabelParameters) {
  const routeLabelText = createRouteLabel(routeLocation);
  const routeLabelSpan = document.createElement("span");
  routeLabelSpan.append(routeLabelText);
  routeLabelSpan.classList.add(routeLabelClass);
  if (routeLocation.Decrease) {
    routeLabelSpan.classList.add(`${routeLabelClass}--decrease`);
  }
  return routeLabelSpan;
}

/**
 *
 * @param options - Defines route ID and milepost
 * @returns
 */
function createMilepostIcon(routeLocation: ISrmpRouteLocation): DivIcon {
  const signDiv = document.createElement("div");

  const routeLabelElement = createRouteLabelElement(routeLocation);
  const milepost = new Milepost(routeLocation.Srmp, !!routeLocation.Back);
  const mpSpan = createMpDataElement(milepost);

  signDiv.append(routeLabelElement, mpSpan);

  return divIcon({
    html: signDiv.outerHTML,
    className: divIconClass,
  });
}

export { createMilepostIcon };
