import { type DivIcon, divIcon } from "leaflet";
import type { RouteLocation } from "wsdot-elc";
import { getPrefix, Milepost } from "wsdot-route-utils";

import { RouteDescription } from "wsdot-route-utils";
import type PointRouteLocation from "./RouteLocationExtensions";

export type MPSignOptions = [Milepost] | ConstructorParameters<typeof Milepost>;

// Defined variables for CSS class names that elements will use.
const divIconClass = "mp-sign-icon";
const routeLabelClass = `${divIconClass}__route-label`;
const mpTextClass = `${divIconClass}__mp-text`;

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

  let routeLabel: string = routeDesc.toString();

  if (routeDesc.isMainline) {
    const prefix = getPrefix(routeDesc.sr, false);
    routeLabel = `${prefix} ${parseInt(routeDesc.sr, 10)}`;
    // The "decrease" info will be displayed via CSS "::after".
  } else if (!routeDesc.isMainline) {
    // Add custom formatting for ramps.
    routeLabel = [routeDesc.rrtDescription, routeDesc.rrqDescription].join(" ");
    console.debug(routeLabel, [
      routeDesc.rrtDescription,
      routeDesc.rrqDescription,
    ]);
  } else {
    routeLabel = routeDesc.toString();
  }

  return [routeLabel, routeDesc] as [string, RouteDescription];
}

function createRouteLabelElement(routeLocation: RouteLabelParameters) {
  /**
   * Add classes for route BEM modifiers.
   * @param element - An HTML Element.
   * @param bemModifiers - One or more BEM modifier strings.
   * Must be valid CSS strings (e.g., no spaces).
   */
  function addClasses(element: HTMLElement, ...bemModifiers: string[]) {
    bemModifiers
      .map((className) => [routeLabelClass, className].join("--"))
      .forEach((className) => element.classList.add(className));
  }

  // TODO: Make route label a data element containing
  // RRT, RRQ spans.
  const [routeLabelText, routeDescrption] = createRouteLabel(routeLocation);
  const routeDataElement = document.createElement("data");
  routeDataElement.value = routeDescrption.toString();
  routeDataElement.append(routeLabelText);
  routeDataElement.classList.add(routeLabelClass);

  // Create a list of BEM modifiers to apply to route label
  // based out route description properties.
  const modifiers = [routeLabelClass];
  if (routeDescrption.isMainline) {
    modifiers.push("mainline");
  }
  if (routeDescrption.isDecrease) {
    modifiers.push("decrease");
  }
  if (routeDescrption.isLocalCollector) {
    modifiers.push("local-collector");
  }
  if (routeDescrption.isRamp) {
    modifiers.push("ramp");
  }
  addClasses(routeDataElement, ...modifiers);
  return routeDataElement;
}

/**
 *
 * @param options - Defines route ID and milepost
 * @returns
 */
function createMilepostIcon(routeLocation: PointRouteLocation): DivIcon {
  const signDiv = document.createElement("div");

  const routeLabelElement = createRouteLabelElement(routeLocation);
  const mpSpan = createMpDataElement(routeLocation.Milepost);

  signDiv.append(routeLabelElement, mpSpan);

  return divIcon({
    html: signDiv.innerHTML,
    className: divIconClass,
  });
}

export { createMilepostIcon };
