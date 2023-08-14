import type UI from "@arcgis/core/views/ui/UI";
import { getRoutes } from "../elc";
import type { Route } from "wsdot-elc";
/*
<select id="routetype">
    <option value=" "></option>
    <option value="SP">Spur</option>
    <option value="CO">Couplet</option>
    <option value="AR">Alternate</option>
</select>
*/
export interface RouteEventObject {
  route: string;
  type: RouteRrt | null;
  mp: number;
}

export type RouteInputEvent = CustomEvent<RouteEventObject>;

export function isRouteInputEvent(event: Event): event is RouteInputEvent {
  if (!(event instanceof CustomEvent && typeof event.detail === "object")) {
    return false;
  }

  return ["route", "type", "mp"].every((name) =>
    Object.prototype.hasOwnProperty.call(event.detail, name)
  );
}

export interface SrmpInputForm extends HTMLFormElement {
  route: HTMLInputElement;
  type: HTMLSelectElement;
  mp: HTMLInputElement;
}

export type RouteRrt = "SP" | "CO" | "AR";

type UIAddParameters = Parameters<(typeof UI)["prototype"]["add"]>;

function routeToOptions(route: Route): HTMLOptionElement[] {
  let options: HTMLOptionElement[];
  function createOption(isDecrease: boolean) {
    const option = document.createElement("option");
    option.value = route.routeId.toString();
    option.text = route.routeId.description;
    option.dataset.isDecrease = `${isDecrease}`;
    return option;
  }

  if (route.isBoth) {
    options = [true, false].map((isDecrease) => createOption(isDecrease));
  } else {
    options = [createOption(route.isDecrease)];
  }
  return options;
}

function createRouteOptionList(routes: Iterable<Route>) {
  const docFrag = document.createDocumentFragment();
  for (const route of routes) {
    const options = routeToOptions(route);
    docFrag.append(...options);
  }

  return docFrag;
}

function createRouteSelect(routes: Iterable<Route>) {
  const select = document.createElement("select");
  const options = createRouteOptionList(routes);
  select.append(options);
  return select;
}

export function createSrmpInputForm(ui: UI, position: UIAddParameters[1]) {
  const template = document.querySelector<HTMLTemplateElement>(
    "template#formTemplate"
  );
  if (!template) {
    throw new Error("Could not find template element.");
  }

  const formDocFrag = template.content;

  const form = formDocFrag
    .querySelector("form")
    ?.cloneNode(true) as SrmpInputForm;

  getRoutes("SP", "CO", "AR").then((routes) => {
    /*const select =*/ createRouteSelect(routes);
    // form.append(select);
  }, console.error);

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
