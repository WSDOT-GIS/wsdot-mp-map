import type { RouteDescription, RrtValue, Suffix } from "wsdot-route-utils";
import {
  defaultRoutesUrl,
  enumerateRouteDescriptions,
  getRoutes,
  type ElcRoutesUrlString,
} from "../elc";
import { RouteTypes } from "../elc/types";

/**
 * Determines if the given attribute value is false.
 * @param attrValue - The attribute value.
 * @returns - Returns true if the {@link attrValue} is the string "false", case-insensitive.
 */
function isFalse(attrValue: string | null): boolean {
  return !(typeof attrValue === "string" && /false/i.test(attrValue));
}

function createLabel(route: RouteDescription) {
  let output: string;
  if (route.isMainline) {
    output = `${route.shield} ${parseInt(route.sr)}`;
  } else {
    output = `${route.sr} ${route.rrtDescription}`;
    if (route.rrqDescription) {
      output += ` ${route.rrqDescription}`;
    }
  }

  return output;
}

function* getOptions(...args: Parameters<typeof enumerateRouteDescriptions>) {
  const routeDescriptions = [...enumerateRouteDescriptions(...args)];
  routeDescriptions.sort(([routeA], [routeB]) => {
    return routeA.toString().localeCompare(routeB.toString());
  });
  for (const [route, routeType] of routeDescriptions) {
    const typesArray: Suffix[] = [];
    if (routeType === RouteTypes.Ramp) {
      typesArray.push("r");
    } else if (routeType === RouteTypes.Both) {
      typesArray.push("i", "d");
    } else if (routeType === RouteTypes.Decrease) {
      typesArray.push("d");
    } else if (routeType) {
      typesArray.push("i");
    }
    for (const routeType of typesArray) {
      const option = document.createElement("option");
      option.value = `${route.toString()}${routeType}`;

      let label = createLabel(route);

      if (routeType === "d") {
        label += " (dec.)";
      }

      option.label = label;
      option.title = label;

      yield option;
    }
  }
}

/**
 * A <select> element from which a user can select
 * state routes.
 */
export class RouteSelect extends HTMLSelectElement {
  private static readonly allowedRrtsPropertyName = "allowed-rrts";
  private static readonly includeMainlinesPropertyName = "include-mainlines";
  private static readonly includeRampsAttributeName = "include-ramps";
  private static readonly urlAttributeName = "url";

  private async addOptions(url: string) {
    const routesResponse = await getRoutes(url as ElcRoutesUrlString);
    for (const option of getOptions(routesResponse.Current)) {
      this.options.add(option);
    }
  }

  public get elcUrl(): URL | null {
    const value = this.getAttribute(RouteSelect.urlAttributeName);
    return value ? new URL(value) : null;
  }
  public set elcUrl(v: string | URL | null) {
    if (!v) {
      this.removeAttribute(RouteSelect.urlAttributeName);
    } else {
      this.setAttribute(
        RouteSelect.urlAttributeName,
        v instanceof URL ? v.href : v
      );
    }
  }

  public get includeMainlines(): boolean {
    const attrValue = this.getAttribute(
      RouteSelect.includeMainlinesPropertyName
    );
    return isFalse(attrValue);
  }
  public set includeMainlines(v: boolean) {
    this.setAttribute(
      RouteSelect.includeMainlinesPropertyName,
      v ? "true" : "false"
    );
  }

  public get includeRamps(): boolean {
    const attrValue = this.getAttribute(RouteSelect.includeRampsAttributeName);
    return isFalse(attrValue);
  }
  public set includeRamps(v: boolean) {
    this.setAttribute(
      RouteSelect.includeRampsAttributeName,
      v ? "true" : "false"
    );
  }

  public get allowedRrts(): RrtValue[] | null {
    const attributeValue = this.getAttribute(
      RouteSelect.allowedRrtsPropertyName
    );
    if (!attributeValue) {
      const splitRe = /[^[a-z0-9]]+/i;
      return attributeValue?.split(splitRe) as RrtValue[];
    }
    return null;
  }

  // TODO: Instead of setting allowedRrts, make it read only, and provide add, remove, and clear methods.

  public set allowedRrts(v: Iterable<RrtValue> | null) {
    // Convert value to an Array or null.
    let values: RrtValue[] | null;
    if (!v) {
      values = null;
    } else if (v instanceof Array) {
      values = v;
    } else {
      values = [...v];
    }

    // Remove the attribute if values is null or empty array.
    // Otherwise, set the attribute to a string consisting of
    // a space separated list of RRT values.
    if (!values?.length) {
      this.removeAttribute(RouteSelect.allowedRrtsPropertyName);
    } else {
      this.setAttribute(RouteSelect.allowedRrtsPropertyName, values.join(" "));
    }
  }

  constructor() {
    super();
    /* __PURE__ */ console.debug("RouteSelect constructor");
    this.addOptions(defaultRoutesUrl).catch((error) =>
      console.error("error adding route options from constructor", error)
    );
  }

  connectedCallback() {
    /* __PURE__ */ console.debug("Custom element added to page.");
  }

  disconnectedCallback() {
    /* __PURE__ */ console.debug("Custom element removed from page.");
  }

  adoptedCallback() {
    /* __PURE__ */ console.debug("Custom element moved to new page.");
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    /* __PURE__ */ console.debug(
      `Attribute ${name} has changed from ${oldValue} to ${newValue}.`
    );
    if (name === RouteSelect.urlAttributeName) {
      for (const option of this.querySelectorAll("option")) {
        option.remove();
      }
      this.addOptions(newValue).catch((error) =>
        console.error("error adding options", error)
      );
    }
  }
}

customElements.define("route-select", RouteSelect, {
  extends: "select",
});

export default RouteSelect;
