import { divIcon } from "leaflet";
import { Milepost } from "wsdot-route-utils";

export type MPSignOptions = Milepost | ConstructorParameters<typeof Milepost>;

const divIconClass = "mp-sign-icon";
const mpLabelClass = `${divIconClass}__mile-label`;
const mpTextClass = `${divIconClass}__mp-text`;
/**
 *
 * @param options - Defines route ID and milepost
 * @returns
 */
export function createMilepostIcon(
  milepost: MPSignOptions
): ReturnType<typeof divIcon> {
  const signDiv = document.createElement("div");

  if (!(milepost instanceof Milepost)) {
    milepost = new Milepost(...milepost);
  }

  // Create the span for the horizontal "MILE" text.
  const mileLabel = document.createElement("span");
  mileLabel.textContent = "Mile";
  mileLabel.classList.add(mpLabelClass);

  // Create the span for the vertical milepost number text.
  const mpSpan = document.createElement("span");
  mpSpan.classList.add(mpTextClass);
  mpSpan.textContent = milepost.toString(false);

  signDiv.append(mileLabel, mpSpan);

  return divIcon({
    html: signDiv.outerHTML,
    className: divIconClass,
  });
}
