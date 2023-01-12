import type {
  // Rename imported Map class to avoid conflict
  // with JavaScript's built-in Map class.
  Map as LeafletMap,
} from "leaflet";
import { siLeaflet, type SimpleIcon } from "simple-icons";
import { theMap } from "./main";

const wsdotLogoAttributionClass = "leaflet-control-attribution__wsdot-logo";

function convertSimpleIconToSvgElement(
  simpleIcon: SimpleIcon,
  domParser?: DOMParser
) {
  if (!domParser) {
    domParser = new DOMParser();
  }

  const { svg, hex } = simpleIcon;
  const dom = domParser.parseFromString(svg, "image/svg+xml");
  const rootNode = dom.documentElement;
  // set the path's color.
  rootNode.querySelector("path")?.setAttribute("fill", `#${hex}`);
  rootNode.classList.add("leaflet-logo");
  return document.adoptNode(rootNode);
}

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
  const element = theDom.querySelector(query);
  if (!element) {
    console.groupEnd();
    return;
  }

  const leafletIcon = convertSimpleIconToSvgElement(siLeaflet);
  element.replaceWith(leafletIcon);

  // Add WSDOT link and separator

  const wsdotLogoAnchor = createWsdotLogoImg(wsdotLogoAttributionClass);
  const separator = theDom.createElement("span");
  separator.innerText = "|";
  separator.ariaHidden = "true";

  theDom.body.prepend(wsdotLogoAnchor, " ", separator, " ");

  console.debug("post cleanup", theDom);
  console.debug("inner html", theDom.body.innerHTML);

  theMap.attributionControl.setPrefix(theDom.body.innerHTML);

  console.groupEnd();
  return theMap;

  /**
   * Creates WSDOT logo <img> element.
   * @param classes - CSS classes to add to the img's classList.
   * @returns An <img>
   */
  function createWsdotLogoImg(...classes: string[]) {
    const a = document.createElement("a");
    a.href = "https://wsdot.wa.gov/"
    a.target = "_blank"
    const wsdotImg = theDom.createElement("img");
    wsdotImg.src = "/wsdot-logo.svg";
    wsdotImg.alt = "WSDOT Logo";
    wsdotImg.classList.add(...classes);
    a.append(wsdotImg);
    return a;
  }
}
