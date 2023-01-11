import type {
  // Rename imported Map class to avoid conflict
  // with JavaScript's built-in Map class.
  Map as LeafletMap,
} from "leaflet";
import { theMap } from "./main";

/**
 * Customizes the map's attribution control.
 * @param map - Leaflet map
 * @returns The input map.
 */
export function customizeAttribution(map: LeafletMap) {
  const { prefix } = map.attributionControl.options;
  console.group("attribution prefix modification");
  console.debug("map prefix", prefix);
  if (typeof prefix !== "string") {
    console.groupEnd();
    return;
  }

  const domParser = new DOMParser();
  const theDom = domParser.parseFromString(prefix, "text/html");
  const query = ".leaflet-attribution-flag";
  const elements = theDom.querySelectorAll(query);
  if (!elements) {
    console.groupEnd();
    return;
  }

  // Remove elements.
  elements.forEach((element) => {
    console.debug("removing element", element);
    element.remove();
  });

  // TODO: Add WSDOT link and separator (<span aria-hidden="true">|</span>)

  const separator = theDom.createElement("span");
  separator.innerText = "|";
  separator.ariaHidden = "true";

  theDom.body.prepend(theDom.createTextNode("WSDOT "), separator);

  console.debug("post cleanup", theDom);
  console.debug("inner html", theDom.body.innerHTML);

  theMap.attributionControl.setPrefix(theDom.body.innerHTML);

  console.groupEnd();
  return theMap;
}
