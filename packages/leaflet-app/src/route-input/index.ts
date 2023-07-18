import { routeRe } from "wsdot-elc";
import { Milepost, RouteDescription } from "wsdot-route-utils";
import { compareElements } from "./utils";
import { DomEvent } from "leaflet";
import "./MilepostInput";
import type MilepostInput from "./MilepostInput";

export interface ContainerOptions {
  /**
   * Optionally create a container element to place the label and input into.
   * This can either be an {@link HTMLElement} or a parameters to create a
   * new element.
   * @example
   * // Create controls and contain them in a new div element.
   * const containerOptions: ContainerOptions = {
   *   outerControlContainer: ["div"],
   * };
   * const [routeInput, routeLabel, routeContainer] =
   *   createRouteIdInput(containerOptions);
   * const [mpInput, mpLabel, mpContainer] = createMPInput(containerOptions);
   */
  outerControlContainer?:
    | HTMLElement
    | Parameters<typeof Document.prototype.createElement>;
}

/**
 * Options used for setting properties of input DOM elements.
 */
export type InputOptions = Partial<
  Pick<
    HTMLInputElement,
    "type" | "placeholder" | "title" | "required" | "id" | "name"
  >
> & {
  /** The inner text for the control's correpsonding label. */
  labelText: string;
  /** Regular expression to use for the text input pattern property. */
  pattern: RegExp;
  /** The name of the class to use for the container of the label and control (if provided.) */
  containerClassName?: string;
} & ContainerOptions;

/**
 * Creates a new id for a control that is not already in use
 * in the document.
 * @param prefix - a string
 * @returns - If there is no element on the page with an id
 * matching {@link prefix}, then {@link prefix} will be
 * returned. Otherwise, the output will be {@link prefix}
 * with an integer appended to it.
 */
function createUniqueId(prefix = "control") {
  let currentId = prefix;
  let currentControl = document.getElementById(currentId);
  if (!currentControl) {
    return currentId;
  }
  let i = 0;
  while (currentControl != null) {
    currentId = `${prefix}${i}`;
    currentControl = document.getElementById(currentId);
    i++;
  }
  return currentId;
}

function createInputAndLabel(options: InputOptions) {
  const input = document.createElement("input");

  input.type = options.type ?? "text";

  input.id = createUniqueId(options.id);
  // Add regex pattern to filter out bad route names.
  if (options.pattern) {
    input.pattern = options.pattern.source;
  }
  if (options.title) {
    input.title = options.title;
  }
  if (options.placeholder) {
    input.placeholder = options.placeholder;
  }

  if (options.name) {
    input.name = options.name;
  }

  if (options.required === true || options.required === false) {
    input.required = options.required;
  }
  const label = document.createElement("label");
  label.textContent = options.labelText;
  label.id = input.id;

  let container = options.outerControlContainer;

  const elementsToAppend = [input, label].sort(compareElements); //isCheckbox(input) ? [input, label] : [label, input];

  if (container) {
    if (!(container instanceof HTMLElement)) {
      container = document.createElement(...container);
    }
    container.append(...elementsToAppend);
  }

  if (options.containerClassName) {
    container?.classList.add(options.containerClassName);
    input.classList.add(`${options.containerClassName}__input`);
    label.classList.add(`${options.containerClassName}__label`);
  }

  return [input, label, container ?? null] as [
    HTMLInputElement,
    HTMLLabelElement,
    HTMLElement | null
  ];
}

const routeInputName = "route";
function createRouteIdInput(options?: ContainerOptions) {
  return createInputAndLabel({
    pattern: routeRe,
    title: "Please enter a valid WSDOT route identifier.",
    placeholder: "005",
    id: "routeInput",
    required: true,
    labelText: "Route ID",
    name: routeInputName,
    outerControlContainer: options?.outerControlContainer,
  });
}

const milepostInputName = "milepost";
function createMPInput(
  options?: ContainerOptions
): [MilepostInput, HTMLLabelElement, HTMLElement | null] {
  const input = document.createElement("milepost-input") as MilepostInput;
  const label = document.createElement("label");
  label.textContent = "Milepost";
  input.id = label.htmlFor = createUniqueId("milepostInput");
  let container = options?.outerControlContainer || null;
  if (container) {
    if (!(container instanceof HTMLElement)) {
      container = document.createElement(...container);
    }
    container.append(label, input);
  }
  return [input, label, container];
}

/**
 * Appends a control and associated label, or an element containing
 * the aforementioned elements, to a parent element.
 * @param parent The parent that will have elements appended to it.
 * @param input The input control element.
 * @param label The label for the input control.
 * @param container The container for the label and the input.
 * If omitted, the {@link input} and {@link label} elements will be
 * added directly as children of {@link parent}.
 */
function appendContainerOrChildren(
  parent: HTMLElement,
  input: HTMLInputElement | MilepostInput,
  label: HTMLLabelElement,
  container: HTMLElement | null
): void {
  if (container) {
    parent.append(container);
  } else {
    parent.append(...[input, label].sort(compareElements));
  }
}

/**
 * Interface that extends the {@link HTMLFormElement}
 * so that TypeScript will know which elements have
 * been added.
 */
export interface SrmpForm extends HTMLFormElement {
  [routeInputName]: HTMLInputElement;
  [milepostInputName]: HTMLInputElement;
}

export const srmpSubmitEventName = "srmp-submit";
export function createRouteInputForm(): SrmpForm {
  const form = document.createElement("form");
  form.classList.add("mp-input");
  const containerOptions: ContainerOptions = {
    outerControlContainer: ["div"],
  };
  const [routeInput, routeLabel, routeContainer] =
    createRouteIdInput(containerOptions);

  const [mpInput, mpLabel, mpContainer] = createMPInput(containerOptions);

  const customMPElement = document.createElement(
    "milepost-input"
  ) as MilepostInput;
  appendContainerOrChildren(form, routeInput, routeLabel, routeContainer);
  appendContainerOrChildren(form, customMPElement, mpLabel, mpContainer);

  const buttonContainer = document.createElement("div");

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit";

  const resetButton = document.createElement("button");
  resetButton.type = "reset";
  resetButton.textContent = "Reset";

  buttonContainer.append(submitButton, resetButton);

  form.append(buttonContainer);

  // Handles the submit event, overriding the default behavior.
  form.addEventListener("submit", dispatchSrmpEvent, {});

  // Prevent clicks on the form from being propagated to the map.
  DomEvent.disableClickPropagation(form);
  DomEvent.disableScrollPropagation(form);

  return form as SrmpForm;

  function dispatchSrmpEvent(this: HTMLFormElement, ev: SubmitEvent) {
    try {
      const route = new RouteDescription(routeInput.value);
      const mp = mpInput.valueAsMilepost;
      if (mp == null) {
        throw new TypeError(`The Milepost input control must have a valid value.`)
      }
      const srmpEvt = new CustomEvent<SrmpSubmitEventData>(srmpSubmitEventName, {
        detail: {
          route,
          mp,
        },
      });
      form.dispatchEvent(srmpEvt);
    } finally {
      ev.preventDefault();
    }
  }
}

export interface SrmpSubmitEventData {
  route: RouteDescription,
  mp: Milepost,
}