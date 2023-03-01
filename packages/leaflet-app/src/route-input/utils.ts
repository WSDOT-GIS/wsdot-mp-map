import type MilepostInput from "./MilepostInput";

/**
 * Determines if an {@link HTMLInputElement} is a checkbox or radio button.
 * @param element
 */
export function isCheckbox(element: HTMLInputElement): boolean {
  return ["checkbox", "radio"].includes(element.type);
}

type InputOrLabel = HTMLLabelElement | HTMLInputElement | MilepostInput;

/**
 * Used for comparing an array of an HTMLInputElement and an HTMLLabelElement.
 * The label will be sorted before the input unless the input is a checkbox
 * or radio button, in which case the input will be sorted before the label.
 * @param a - A label or input element
 * @param b - A label or input element
 * @returns Returns a numerical value indicating the order the two elements
 * should be placed in when sorting.
 */
export function compareElements(a: InputOrLabel, b: InputOrLabel) {
  if (a instanceof HTMLInputElement && b instanceof HTMLLabelElement) {
    return isCheckbox(a) ? -1 : 1;
  } else if (a instanceof HTMLLabelElement && b instanceof HTMLInputElement) {
    return isCheckbox(b) ? 1 : -1;
  }
  return 0;
}
