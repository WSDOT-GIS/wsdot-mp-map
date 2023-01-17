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
  console.group(`${createMilepostIcon.name}: ${milepost}`)
  let dataElement: HTMLDataElement;
  try {
    const { mp, isBack } = milepost;

    const [whole, decimal] = `${mp}`.split(".", 2) as [
      string,
      string | undefined
    ];

    console.debug("parts", {
      whole,
      decimal
    })

    // Create span elements for each of the parts of the number,
    // both pre- and post-decimal point.
    const [wholeSpan, decimalSpan] = [whole, decimal].map((s, i) => {
      if (s === undefined) {
        return;
      }
      const span = document.createElement("span");
      span.append(s);
      const cssClass =
        i === 0 ? "mp-label__whole" : i === 1 ? "mp-label__decimal" : null;
      if (cssClass) {
        span.classList.add(cssClass);
      }
      return span;
    }) as [HTMLSpanElement, HTMLSpanElement | undefined];

    console.debug("", {wholeSpan, decimalSpan})

    dataElement = document.createElement("data");
    dataElement.value = milepost.toString();

    dataElement.classList.add("mp-label");

    if (isBack) {
      dataElement.classList.add("mp-label--back");
    }

    dataElement.append(wholeSpan);

    if (decimalSpan) {
      const separatorSpan = document.createElement("span");
      separatorSpan.append(".");

      separatorSpan.classList.add("mp-label__separator")

      dataElement.append(separatorSpan, decimalSpan);
    }
  } finally {
    console.groupEnd();
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
