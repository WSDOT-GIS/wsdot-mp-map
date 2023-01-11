import {
  // Rename so map variable can use this name.
  // Rename the rest to match, and to make
  // their purpose more clear.
  map as createMap,
  marker as createMarker,
  popup as createPopup,
  tileLayer as createTileLayer,
} from "leaflet";
import { GeoUrl } from "./GeoUri";
import type PointRouteLocation from "./PointRouteLocation";
import { createProgressMarker } from "./ProgressMarker";

// #region CSS and font import
// Import the Overpass font
// (https://overpassfont.org/)
import "@fontsource/overpass";
import "leaflet/dist/leaflet.css";
import "./style.css";
// #endregion
import { waExtent } from "./constants";
import { callElc } from "./elc";
import {
  createMilepostIcon,
  getMilepostFromRouteLocation,
} from "./MilepostIcon";
import { customizeAttribution } from "./attributeCustomization";

/**
 * Creates a Leaflet popup for a route location.
 * @param routeLocation - route location
 * @returns - a leaflet popup
 */
function createMilepostPopup(routeLocation: PointRouteLocation) {
  const content = createPopupContent(routeLocation);
  const thePopup = createPopup({
    content,
  });

  return thePopup;
}

const anchorTarget = "_blank";
/**
 * Creates the HTML content for a Leaflet popup.
 * @param routeLocation - a route location
 * @returns - An HTML element.
 */
function createPopupContent(routeLocation: PointRouteLocation) {
  const [x, y] = routeLocation.routeGeometryXY;
  const route = `${routeLocation.Route}${
    routeLocation.Decrease ? " (Decrease)" : ""
  }`;
  const srmp = `${routeLocation.Srmp}${routeLocation.Back ? "B" : ""}`;
  const label = `${route}@${srmp}`;

  const frag = document.createDocumentFragment();
  const srmpDiv = document.createElement("div");
  srmpDiv.innerText = label;
  frag.appendChild(srmpDiv);
  const geoDiv = document.createElement("div");
  frag.appendChild(geoDiv);

  const geoUriHelpAnchor = createGeoUriElements(x, y);

  geoDiv.appendChild(document.createTextNode(" "));

  geoDiv.appendChild(geoUriHelpAnchor);

  const output = document.createElement("div");
  output.appendChild(frag);
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
  const frag = document.createDocumentFragment();
  // Create the GeoUrl object.
  const geoUri = new GeoUrl({ x, y });
  const a = createGeoUriAnchor(geoUri);

  // Create the link to GeoURI.org "About" page.
  const geoUriHelpAnchor = document.createElement("a");
  geoUriHelpAnchor.href = "https://geouri.org/about/";
  geoUriHelpAnchor.textContent = "(What is this?)";
  geoUriHelpAnchor.target = anchorTarget;

  // Append all elements to the document fragment.
  frag.append(a, document.createTextNode(" "), geoUriHelpAnchor);
  return frag;
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
 * Creates a marker for a route location.
 * @param routeLocation - route location
 * @returns A leaflet marker
 */
function createMilepostMarker(routeLocation: PointRouteLocation) {
  const popup = createMilepostPopup(routeLocation);

  const mp = getMilepostFromRouteLocation(routeLocation);

  const mpIcon = createMilepostIcon(mp);

  const latLng = routeLocation.leafletLatLngLiteral;
  // TODO: Marker should show the milepost number on it.
  const outputMarker = createMarker(latLng, {
    icon: mpIcon,
  }).bindPopup(popup);

  return outputMarker;
}

export const theMap = createMap("map", {
  maxBounds: waExtent,
}).fitBounds(waExtent);

customizeAttribution(theMap);

createTileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(theMap);

theMap.on("click", async (e) => {
  console.log(`user clicked on ${e.latlng}`, e);
  const { latlng } = e;
  let results: PointRouteLocation[] | null = null;

  const progressMarker = createProgressMarker(latlng).addTo(theMap);

  try {
    results = await callElc(latlng);
  } catch (elcErr) {
    console.error(`ELC Error at ${latlng}`, {
      "Leaflet mouse event": e,
      "ELC Error": elcErr,
    });
  } finally {
    progressMarker.remove();
  }

  // TODO: Identify county, etc. using https://data.wsdot.wa.gov/arcgis/rest/services/DataLibrary/DataLibrary/MapServer/identify

  if (results) {
    for (const result of results) {
      console.debug("elcResult", result);
      const marker = createMilepostMarker(result);
      marker.addTo(theMap);
    }
  }
});
