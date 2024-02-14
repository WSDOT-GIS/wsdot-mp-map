import type UI from "@arcgis/core/views/ui/UI";
/*
<select id="routetype">
    <option value=" "></option>
    <option value="SP">Spur</option>
    <option value="CO">Couplet</option>
    <option value="AR">Alternate</option>
</select>
*/

/**
 * The object that is passed to the `srmp-input` event.
 */
export interface RouteEventObject {
  route: string;
  type: RouteType | null;
  mp: number;
}

export type RouteInputEvent = CustomEvent<RouteEventObject>;

/**
 * Checks if the provided event is a RouteInputEvent.
 *
 * @param event - the event to be checked
 * @return true if the event is a RouteInputEvent, false otherwise
 */
export function isRouteInputEvent(event: Event): event is RouteInputEvent {
  return (
    event instanceof CustomEvent &&
    event.detail != null &&
    typeof event.detail === "object" &&
    ["route", "type", "mp"].every((name) => name in event.detail)
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
  route: HTMLInputElement;
  /**
   * The route type input field.
   */
  type: HTMLSelectElement;
  /**
   * The milepost input field.
   */
  mp: HTMLInputElement;

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
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof SrmpInputFormEventMap>(
    this: SrmpInputForm,
    type: K,
    listener: (this: SrmpInputForm, ev: SrmpInputFormEventMap[K]) => unknown,
    options?: boolean | EventListenerOptions
  ): void;
}

type UIAddParameters = Parameters<UI["add"]>;

type UIAddPosition = UIAddParameters[1];

/**
 * Creates an SRMP input form and adds it to the specified UI at the given position.
 *
 * @param - ui - The UI to which the form will be added
 * @param - position - The position at which the form will be added to the UI
 * @returns - The created SRMP input form
 */
export function createSrmpInputForm(
  ui: UI,
  position: UIAddPosition,
  template?: HTMLTemplateElement
) {
  // Set up default template if one is not provided.
  if (!template) {
    template =
      document.querySelector<HTMLTemplateElement>("template#formTemplate") ??
      undefined;
  }
  if (!template) {
    throw new Error("Could not find template element.");
  }

  const formDocFrag = template.content;

  const form = formDocFrag
    .querySelector("form")
    ?.cloneNode(true) as SrmpInputForm;

  if (!form) {
    throw new Error("Form was not created correctly.");
  }
  // form must be added to the document before event handling can be set up.
  ui.add(form, position);
  form.addEventListener("submit", (event) => {
    try {
      const customEvent = new CustomEvent("srmp-input", {
        detail: {
          route: form.route.value,
          type: !form.type.value ? null : form.type.value,
          mp: form.mp.valueAsNumber,
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
