import type {
  // Rename imported Map class to avoid conflict
  // with JavaScript's built-in Map class.
  Map as LeafletMap,
} from "leaflet";
import { theMap } from "./main";

const wsdotLogoAttributionClass = "leaflet-control-attribution__wsdot-logo";

/**
 * Customizes the map's attribution control.
 * @param map - Leaflet map
 * @returns The input map.
 */
export function customizeAttribution(map: LeafletMap) {
  const { prefix } = map.attributionControl.options;
  if (typeof prefix !== "string") {
    console.error("Could not find prefix content in map attribution control.", {map});
    return;
  }

  // Parse the attribute prefix HTML string into a DOM object.
  const domParser = new DOMParser();
  const theDom = domParser.parseFromString(prefix, "text/html");

  // Remove the flag icon that is there by default.
  const query = ".leaflet-attribution-flag";
  theDom.querySelector(query)?.remove()

  // Add WSDOT link and separator

  const wsdotLogoAnchor = createWsdotLogoImgLink(wsdotLogoAttributionClass);
  const separator = theDom.createElement("span");
  separator.innerText = "|";
  separator.ariaHidden = "true";

  theDom.body.prepend(wsdotLogoAnchor, " ", separator, " ");
  theMap.attributionControl.setPrefix(theDom.body.innerHTML);

  return theMap;

  /**
   * Creates WSDOT logo <img> element.
   * @param classes - CSS classes to add to the img's classList.
   * @returns An img element inside an a element.
   */
  function createWsdotLogoImgLink(...classes: string[]) {
    const a = document.createElement("a");
    a.href = "https://wsdot.wa.gov/";
    a.target = "_blank";
    const wsdotImg = theDom.createElement("img");
    wsdotImg.src = "/wsdot-acronym-logo.svg";
    wsdotImg.alt = "WSDOT Logo";
    wsdotImg.classList.add(...classes);
    a.append(wsdotImg);
    return a;
  }
}
