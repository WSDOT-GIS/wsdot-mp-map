import { routeRe } from "wsdot-elc";

/* <!-- old version -->
<table style="height:90px; width:600px; color:#3872ac">
    <tbody>
        <tr>
            <td style="width:100px; padding-left:2%;">State Route:</td>
            <td><input id="sr_value" type="text" style="width:60px; text-align:center;  height:25px;"></td>
            <td style="padding-left:2%; width:60px;">Type:</td>
            <td>
                <select id="routetype" style="width:80px; height:25px;">
                    <option value=" "></option>
                    <option value="SP">Spur</option>
                    <option value="CO">Couplet</option>
                    <option value="AR">Alternate</option>
                </select>
            </td>
            <td style="padding-left:1%; font-size:smaller;">*Keep empty unless on a SPUR, COUPLET or ALTERNATE route.
            </td>
        </tr>
        <tr>
            <td style="padding-left:2%;">Milepost:</td>
            <td><input id="mp_value" type="text" style="width:60px; text-align:center;  height:25px;"></td>
            <td></td>
            <td><input id="submit" type="button" value="Locate" style="width:80px;" onclick="searchFunction();"></td>
            <td></td>
        </tr>
    </tbody>
</table>
*/

import { Milepost } from "wsdot-route-utils";

const milepostRe = Milepost.milepostRegex;

export interface ContainerOptions {
  /**
   * Optionally create a container element to place the label and input into.
   */
  outerControlContainer?:
    | HTMLElement
    | Parameters<typeof Document.prototype.createElement>;
}

export type InputOptions = Partial<
  Pick<HTMLInputElement, "type" | "placeholder" | "title" | "required" | "id">
> & {
  labelText: string;
  pattern: RegExp;
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

function createInputAndLabel(
  options: InputOptions
): [HTMLInputElement, HTMLLabelElement, HTMLElement | null] {
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

  if (options.required === true || options.required === false) {
    input.required = options.required;
  }
  const label = document.createElement("label");
  label.textContent = options.labelText;
  label.id = input.id;

  let container = options.outerControlContainer;

  if (container) {
    if (!(container instanceof HTMLElement)) {
      container = document.createElement(...container);
    }
    container.append(label, input);
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

function createRouteIdInput(options?: ContainerOptions) {
  return createInputAndLabel({
    pattern: routeRe,
    title: "Please enter a valid WSDOT route identifier.",
    placeholder: "005",
    id: "routeInput",
    required: true,
    labelText: "Route ID",
    outerControlContainer: options?.outerControlContainer,
  });
}

function createMPInput(options?: ContainerOptions) {
  return createInputAndLabel({
    pattern: milepostRe,
    placeholder: "1.00",
    title: 'Enter a valid milepost w/ optional back indicator suffix, "B".',
    required: true,
    labelText: "Milepost",
    outerControlContainer: options?.outerControlContainer,
  });
}

function appendContainerOrChildren(
  parent: HTMLElement,
  input: HTMLInputElement,
  label: HTMLLabelElement,
  container: HTMLElement | null
) {
  if (container) {
    parent.append(container);
  } else {
    parent.append(input, label);
  }
}

export function createRouteInputControl(): HTMLElement {
  const root = document.createElement("div");
  const containerOptions: ContainerOptions = {
    outerControlContainer: ["div"]
  }
  const [routeInput, routeLabel, routeContainer] = createRouteIdInput(containerOptions);
  const [mpInput, mpLabel, mpContainer] = createMPInput(containerOptions);

  appendContainerOrChildren(root, routeInput, routeLabel, routeContainer);
  appendContainerOrChildren(root, mpInput, mpLabel, mpContainer);

  return root;
}
