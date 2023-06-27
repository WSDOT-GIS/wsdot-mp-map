import {
  enumerateQueryResponseAttributes,
  query,
  AttributeValue,
  GeoUrl,
  createGeoHackAnchor
} from "wsdot-mp-common";
import { Browser, popup as createPopup } from "leaflet";
import type PointRouteLocation from "./RouteLocationExtensions";
import { createGeoMicroformat } from "./formatting";

const srmpPopupCssClass = "srmp-popup";
const geoHackCssClass = `${srmpPopupCssClass}__geohack`;
const anchorTarget = "_blank";
const mobileOrDesktopCssClass = `${srmpPopupCssClass}--${
  Browser.mobile ? "mobile" : "desktop"
}`;
const geohackAnchorCssClass = `${geoHackCssClass}__anchor`;
const geoUriCssClass = `${srmpPopupCssClass}__geouri`;
const geoUriCssMobileOrDesktopClass = `${mobileOrDesktopCssClass}__geouri`;

/**
 * Creates the HTML content for a Leaflet popup.
 * @param routeLocation - a route location
 * @returns - An HTML element.
 */
function createPopupContent(routeLocation: PointRouteLocation) {
  // Query the feature service but don't await.
  const serviceQueryPromise = queryFeatureService(routeLocation);

  const [x, y] = routeLocation.routeGeometryXY;
  // Create label for route + SRMP.
  const route = `${routeLocation.Route}${
    routeLocation.Decrease ? " (Decrease)" : ""
  }`;
  const srmp = `${routeLocation.Srmp}${routeLocation.Back ? "B" : ""}`;
  const label = `${route} @ ${srmp}`;

  
  // Create a document fragment to construct popup div contents.
  const frag = document.createDocumentFragment();
  // Create divs for different sections of the popup.
  // SRMP, GeoURI, etc.
  const srmpDiv = document.createElement("div");
  srmpDiv.innerText = label;
  frag.appendChild(srmpDiv);
  const geoDiv = document.createElement("div");
  frag.appendChild(geoDiv);
  
  
  const hGeo = createGeoMicroformat([y,x], "span");
  frag.appendChild(hGeo);

  // Create an anchor with a GeoURI. This is not of much
  // use for desktop users unless they've installed a
  // browser plug-in on their own.
  // CSS can be used to hide this or make it less prominent
  // on desktop browsers via CSS classes.
  const geoUriSection = createGeoUriElements(x, y);

  // Append the GeoURI, separated by a space.
  geoDiv.append(" ", geoUriSection);

  // Create GeoHack URL
  const geoHackDiv = document.createElement("div");
  geoHackDiv.classList.add(geoHackCssClass);
  const geoHackAnchor = createGeoHackAnchor([y, x]);
  geoHackAnchor.classList.add(geohackAnchorCssClass);
  geoHackDiv.append(geoHackAnchor);

  frag.append(geoHackDiv);

  const output = document.createElement("div");
  // Detect if the browser is on mobile or not and add
  // a CSS class for different styling, such as hiding
  // GeoURIs.
  output.classList.add(mobileOrDesktopCssClass);
  output.appendChild(frag);

  // When the service query has completed, add the data it
  // returns to the popup.
  serviceQueryPromise.then((o) => {
    const dl = convertObjectToDl(o);
    output.appendChild(dl);
  });

  return output;
}

/**
 * Creates a document fragment with a {@link https://geouri.org Geo URI} link
 * along with an explanation of what a Geo URI is.
 * @param x - Longitude
 * @param y - Latitude
 * @returns A document fragment with a {@link https://geouri.org Geo URI} link
 */
function createGeoUriElements(x: number, y: number) {
  const container = document.createElement("div");
  container.classList.add(geoUriCssClass, geoUriCssMobileOrDesktopClass);
  // Create the GeoUrl object.
  const geoUri = new GeoUrl({ x, y });
  const a = createGeoUriAnchor(geoUri);

  // Create the link to GeoURI.org "About" page.
  const geoUriHelpAnchor = document.createElement("a");
  geoUriHelpAnchor.href = "https://geouri.org/about/";
  geoUriHelpAnchor.textContent = "(What is this?)";
  geoUriHelpAnchor.target = anchorTarget;

  // Append all elements to the document fragment.
  container.append(a, document.createTextNode(" "), geoUriHelpAnchor);
  return container;
}

/**
 * Creates an HTML anchor element (<a>) for a GeoURI.
 * @param geoUri - GeoURI.
 * @param label - Text for the GeoURI anchor.
 * @returns An HTML Anchor element.
 */
function createGeoUriAnchor(geoUri: GeoUrl, label = "Geo URI") {
  const a = document.createElement("a");
  a.href = geoUri.toString();
  a.textContent = label ?? geoUri.toString();
  a.target = anchorTarget;
  return a;
}

/**
 * Creates an HTML definition list showing the properties
 * of a JavaScript object.
 * @param o - An object.
 * @param aliases - A mapping of the object's property names to more descriptive,
 * user-friendly labels for the definition term (dt) elements. The most likely source for such
 * aliases will be a feature class for feature set's "fields" property.
 * If omitted, or for property names not specified in the mapping, the
 * original property name will be used in the dt element.
 * @returns
 */
function convertObjectToDl(
  o: Record<string, AttributeValue>,
  aliases?: Map<string, string>
) {
  const dl = document.createElement("dl");
  for (const key in o) {
    if (Object.prototype.hasOwnProperty.call(o, key)) {
      const value = o[key];
      const alias = aliases?.get(key) ?? key;
      const dt = document.createElement("dt");
      dt.textContent = alias;
      const dd = document.createElement("dd");
      dd.textContent = `${value}`;
      dl.append(dt, dd);
    }
  }
  return dl;
}

/**
 * Queries a feature service for features that contain the input point.
 * @param result - An ELC result object containing a point location.
 * @returns The results of a feature server query.
 */
async function queryFeatureService(result: PointRouteLocation) {
  const r = await query(result.routeGeometryXY);
  const output: Record<string, AttributeValue> = {};
  for (const [key, value] of enumerateQueryResponseAttributes(r)) {
    output[key] = value;
  }
  return output;
}

/**
 * Creates a Leaflet popup for a route location.
 * @param routeLocation - route location
 * @returns - a leaflet popup
 */
export function createMilepostPopup(routeLocation: PointRouteLocation) {
  const content = createPopupContent(routeLocation);
  const thePopup = createPopup({
    content,
  });

  return thePopup;
}
