import type {
  // Rename imported Map class to avoid conflict
  // with JavaScript's built-in Map class.
  Map as LeafletMap,
} from "leaflet";
import { createGithubLink } from "wsdot-mp-common";

const wsdotLogoAttributionClass = "leaflet-control-attribution__wsdot-logo";

/**
 * Creates WSDOT logo <img> element.
 * @param classes - CSS classes to add to the img's classList.
 * @returns An img element inside an a element.
 */
function createWsdotLogoImgLink(theDom: Document,...classes: string[]) {
  const a = document.createElement("a");
  a.href = "https://wsdot.wa.gov/";
  a.target = "_blank";
  const wsdotImg = theDom.createElement("img");
  wsdotImg.src = "wsdot-acronym-logo.svg";
  wsdotImg.alt = "WSDOT";
  wsdotImg.classList.add(...classes);
  a.append(wsdotImg);
  return a;
}

/**
 * Customizes the map's attribution control.
 * @param map - Leaflet map
 * @returns The input map.
 */
export function customizeAttribution(map: LeafletMap) {
  const { prefix } = map.attributionControl.options;
  if (typeof prefix !== "string") {
    console.error("Could not find prefix content in map attribution control.", {
      map,
    });
    return;
  }

  // Parse the attribute prefix HTML string into a DOM object.
  const domParser = new DOMParser();
  const theDom = domParser.parseFromString(prefix, "text/html");

  // Remove the flag icon that is there by default.
  const query = ".leaflet-attribution-flag";
  theDom.querySelector(query)?.remove();

  // Add WSDOT link and separator

  const wsdotLogoAnchor = createWsdotLogoImgLink(theDom, wsdotLogoAttributionClass);
  const separator = createSeparator();
  
  // Add source link
  
  const githubLink = createGithubLink();

  /* TODO: fix scale, viewbox
  <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>GitHub</title>
  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#181717" transform="scale(0.06)">
  </path>
  </svg>
  */

  theDom.body.prepend(wsdotLogoAnchor, " ", separator, " ", githubLink, " ", separator.cloneNode(true));
  map.attributionControl.setPrefix(theDom.body.innerHTML);

  return map;

  function createSeparator() {
    const separator = theDom.createElement("span");
    separator.innerText = "|";
    separator.ariaHidden = "true";
    return separator;
  }
}
