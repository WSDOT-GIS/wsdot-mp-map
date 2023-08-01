import type UI from "@arcgis/core/views/ui/UI";
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
  type: RouteType | null;
  mp: number;
}

export type RouteInputEvent = CustomEvent<{
  detail: RouteEventObject;
}>;

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

export type RouteType = "SP" | "CO" | "AR";

// function isSrmpInputForm(form: unknown): form is HTMLFormElement {
//   return (
//     !!form &&
//     form instanceof HTMLFormElement &&
//     ["route", "type", "mp"].every((name) => Object.hasOwn(form, name))
//   );
// }

type UIAddParameters = Parameters<(typeof UI)["prototype"]["add"]>;

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
