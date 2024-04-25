import type { RouteAndTypeTuple } from "../../elc";
import { RouteTypes } from "../../elc/types";
import { RouteDescription } from "wsdot-route-utils";

/**
 * Retrieves the corresponding value from the {@link RouteTypes} object based on the input string.
 * @param v - The input string to be parsed as an integer or used as is.
 * @returns The corresponding value from the {@link RouteTypes} object, or `null` if not found.
 */
const getLrsType = (v: string) => {
  // Try to parse the value as an integer.
  let key: string | number = parseInt(v, 10);
  // Use the string input if parsing failed.
  if (isNaN(key)) {
    key = v;
  }
  if (Object.hasOwn(RouteTypes, key)) {
    return RouteTypes[key as keyof typeof RouteTypes];
  } else {
    return null;
  }
};

/**
 * Options for creating a label for the given route.
 */
export interface CreateLabelOptions {
  /**
   * Determines if the shield label should be included.
   * Set to `true` if the shield label should be included.
   * Set to `false` if the shield label should not be included.
   */
  includeShieldLabel?: boolean;
  /**
   * Determines if the route number should be padded with zeros.
   * Set to `true` if the route number should not be padded.
   * Set to `false` if the route number should be padded.
   */
  removeRouteNumberPadding?: boolean;
}

/**
 * Creates a label for the given route.
 * @param route - The route.
 * @param options - Options for creating the label.
 * @returns - A label for the route.
 */
function createLabelText(
  route: RouteDescription,
  options?: CreateLabelOptions,
) {
  let output = "";
  if (options?.includeShieldLabel && route.shield !== null) {
    output += route.shield === "IS" ? "I-" : `${route.shield} `;
  }
  output += options?.removeRouteNumberPadding
    ? parseInt(route.sr).toString()
    : route.sr;
  if (!route.isMainline && route.rrtDescription) {
    output += ` ${route.rrtDescription}`;
    if (route.rrqDescription) {
      output += ` ${route.rrqDescription}`;
    }
  }

  return output;
}

/**
 * A customized option element for {@link RouteSelect}.
 */
export class RouteOption extends HTMLOptionElement {
  private _lrsType: RouteTypes | null = null;

  /**
   * Indicates route type: increase, decrease, or ramp.
   * @returns - The route type, derived from the `lrs-type` attribute.
   */
  public get lrsType(): RouteTypes | null {
    return this._lrsType;
  }
  /**
   * Sets the "lrs-type" attribute.
   */
  public set lrsType(v: RouteTypes | null) {
    this._lrsType = v;

    if (v === null) {
      this.removeAttribute("lrs-type");
    } else {
      this.setAttribute("lrs-type", v.toString());
    }
  }

  /**
   * Overrides the setter for the value property
   * to ensure that it can be parsed as a {@link RouteDescription}.
   * @param v - A route ID string.
   */
  override set value(v: string) {
    try {
      const route = new RouteDescription(v);
      super.value = v;
      const labelText = createLabelText(route);
      this.textContent = labelText;
      this.shadowRoot?.append(labelText);
    } catch (error) {
      console.error(
        `Error parsing string to ${RouteDescription.name}: ${v}.`,
        error,
      );
    }
  }

  /**
   * Returns the value of the property `value` as a {@link RouteDescription}.
   * If the parsing fails, it returns `null`.
   * @returns The parsed {@link RouteDescription} or `null`.
   */
  public get valueAsRouteDescription(): RouteDescription | null {
    try {
      const route = new RouteDescription(this.value);
      return route;
    } catch (error) {
      console.error(
        `Error parsing string to ${RouteDescription.name}: ${this.value}.`,
        error,
      );
      return null;
    }
  }

  /**
   * Sets the value of the property `value` using a {@link RouteDescription} object.
   * @param v - The value to set. If null, the value is set to an empty string.
   */
  public set valueAsRouteDescription(v: RouteDescription | null) {
    if (!v) {
      this.value = "";
    } else {
      this.value = v.toString();
    }
  }

  public get supportsDecrease(): boolean | null {
    if (this.lrsType === null) {
      return null;
    }
    return (
      (this.lrsType & RouteTypes.Decrease) === RouteTypes.Decrease.valueOf()
    );
  }

  /**
   * Adds routes to a select element by creating option elements for each route.
   * @param routes - The routes to be added to the select element.
   * @yields - A {@link RouteOption} element.
   */
  public static *enumerateRouteOptions(
    routes: Iterable<Readonly<RouteAndTypeTuple>>,
  ) {
    for (const [route, routeType] of routes) {
      const option = document.createElement("option", {
        is: "route-option",
      }) as RouteOption;
      option.valueAsRouteDescription = route;
      option.lrsType = routeType;
      yield option;
    }
  }

  connectedCallback() {
    /* __PURE__ */ console.debug(`route-option element added to page.`);
  }

  disconnectedCallback() {
    /* __PURE__ */ console.debug(`route-option element removed from page.`);
  }

  adoptedCallback() {
    /* __PURE__ */ console.debug(`route-option element moved to new page.`);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    /* __PURE__ */ console.debug(
      `${RouteOption.name} attribute "${name}" has changed from "${oldValue}" to "${newValue}".`,
    );

    if (name === "lrs-type") {
      this.lrsType = getLrsType(newValue);
    }
  }
}

customElements.define("route-option", RouteOption, { extends: "option" });

export default RouteOption;
