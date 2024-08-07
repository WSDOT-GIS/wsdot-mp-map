import {
  getComboboxItems,
  getRoutes,
  getRoutesFromService,
} from "./createComboBoxItems";
import type { CalciteCombobox } from "@esri/calcite-components/dist/components/calcite-combobox";
import { RouteDescription } from "wsdot-route-utils";

/**
 * The object that is passed to the `srmp-input` event.
 */
export interface RouteEventObject {
  route: InstanceType<typeof RouteDescription>;
  mp: number;
  back: boolean;
  decrease: boolean;
}

export type RouteInputEvent = CustomEvent<RouteEventObject>;

/**
 * Checks if the provided event is a RouteInputEvent.
 * @param event - the event to be checked
 * @returns true if the event is a RouteInputEvent, false otherwise
 */
export function isRouteInputEvent(event: Event): event is RouteInputEvent {
  return (
    event instanceof CustomEvent &&
    event.detail != null &&
    typeof event.detail === "object" &&
    ["route", "back", "mp"].every((name) => name in event.detail)
  );
}

/**
 * The supported Related Route Type (RRT) values for this application.
 */
export type RouteType = "SP" | "CO" | "AR";

interface SrmpInputFormEventMap extends HTMLElementEventMap {
  "srmp-input": RouteInputEvent;
}

/**
 * The form that is used to input a route and milepost.
 */
export interface SrmpInputForm extends HTMLFormElement {
  /**
   * The route input field.
   */
  route: InstanceType<typeof CalciteCombobox>;
  /**
   * The milepost input field.
   */
  mp: HTMLInputElement;
  back: HTMLInputElement;
  decrease: HTMLInputElement;

  /*
  addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOutputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOutputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  */

  addEventListener<K extends keyof SrmpInputFormEventMap>(
    this: SrmpInputForm,
    type: K,
    listener: (this: SrmpInputForm, ev: SrmpInputFormEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;

  removeEventListener<K extends keyof SrmpInputFormEventMap>(
    this: SrmpInputForm,
    type: K,
    listener: (this: SrmpInputForm, ev: SrmpInputFormEventMap[K]) => unknown,
    options?: boolean | EventListenerOptions,
  ): void;
}

/**
 * Creates an SRMP input form and adds it to the specified UI at the given position.
 * @returns - The created SRMP input form
 */
export async function createSrmpInputForm() {
  const formSelector = "form#route-input-form";
  const form = document.querySelector<SrmpInputForm>(formSelector);

  if (!form) {
    const message = `Form querySelector did not return any results for "${formSelector}".`;
    throw new Error(message);
  }

  const routeElement = form.querySelector("#routeInput");
  if (!routeElement) {
    throw new Error("route element not found");
  }
  const routeFeatures = await getRoutesFromService();
  const routes = getRoutes(routeFeatures);
  routeElement.append(...getComboboxItems(routes));

  routeElement.addEventListener("change", () => {
    form.dispatchEvent(new CustomEvent("srmp-input"));
  });

  routeElement.addEventListener("change", (event: Event) => {
    const selectedItems = (
      event.target as InstanceType<typeof CalciteCombobox> | null
    )?.selectedItems;

    if (selectedItems && selectedItems.length > 0) {
      const selectedItem = selectedItems[0];
      const lrsTypes = [...(selectedItem.dataset.directions ?? "")] as (
        | "d"
        | "i"
      )[];
      const decreaseCheckbox = form.decrease;
      if (lrsTypes.length > 1) {
        decreaseCheckbox.disabled = true;
      } else {
        decreaseCheckbox.disabled = false;
        const direction = lrsTypes[0];
        decreaseCheckbox.checked = direction === "d";
      }
    }
  });

  form.addEventListener("submit", (event) => {
    try {
      const routeId =
        typeof form.route.value === "string"
          ? form.route.value
          : form.route.value[0];
      const route = new RouteDescription(routeId);
      const mp = form.mp.valueAsNumber;
      const back = form.back.checked;
      const decrease = form.decrease.checked;
      const customEvent = new CustomEvent("srmp-input", {
        detail: {
          route,
          mp,
          back,
          decrease,
        },
      });
      form.dispatchEvent(customEvent);
    } finally {
      event.preventDefault();
    }
  });
  return form;
}

export default createSrmpInputForm;
