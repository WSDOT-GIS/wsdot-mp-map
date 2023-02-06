import {
  // Rename so map variable can use this name.
  // Rename the rest to match, and to make
  // their purpose more clear.
  map as createMap,
  marker as createMarker,
  popup as createPopup,
  tileLayer as createTileLayer,
  Browser,
  type LeafletMouseEvent,
} from "leaflet";
import { GeoUrl } from "./GeoUri";
import type PointRouteLocation from "./RouteLocationExtensions";
import { createProgressMarker } from "./ProgressMarker";

// #region CSS and font import
// Import the Overpass font
// (https://overpassfont.org/)
import "@fontsource/overpass";
import "leaflet/dist/leaflet.css";
import "./style.css";
// #endregion
import { waExtent } from "./constants";
import { callElcMPToPoint, callElcNearestRoute } from "./elc";
import { createMilepostIcon } from "./MilepostIcon";
import { customizeAttribution } from "./attributeCustomization";
import { isSrmpRouteLocation } from "./RouteLocationExtensions";
import {
  enumerateQueryResponseAttributes,
  query,
} from "./arcgis/featureServiceQuery";
import type { AttributeValue } from "./arcgis/typesAndInterfaces";
import { SrmpControl } from "./route-input/LeafletControl";
import { SrmpSubmitEventData, srmpSubmitEventName } from "./route-input";

// https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API

if (Browser.mobile) {
  console.debug("Mobile browser detected.");
} else {
  console.debug("This does not appear to be a mobile browser.");
}

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

  // Create an anchor with a GeoURI. This is not of much
  // use for desktop users unless they've installed a
  // browser plug-in on their own.
  // CSS can be used to hide this or make it less prominent
  // on desktop browsers via CSS classes.
  const geoUriSection = createGeoUriElements(x, y);

  // Append the GeoURI, separated by a space.
  geoDiv.append(" ", geoUriSection);

  const output = document.createElement("div");
  // Detect if the browser is on mobile or not and add
  // a CSS class for different styling, such as hiding
  // GeoURIs.
  output.classList.add(`srmp-popup--${Browser.mobile ? "mobile" : "desktop"}`);
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

  if (!isSrmpRouteLocation(routeLocation)) {
    throw new TypeError(
      "Route location must have non-null/undefined Route and Srmp properties."
    );
  }

  const mpIcon = createMilepostIcon(routeLocation);

  console.debug("Milepost icon", mpIcon);

  const latLng = routeLocation.leafletLatLngLiteral;
  
  const outputMarker = createMarker(latLng, {
    icon: mpIcon,
  }).bindPopup(popup);

  return outputMarker;
}

// Create the Leaflet map, zoom to and restrict extent
// to the EPSG-defined WA extent.
export const theMap = createMap("map", {
  maxBounds: waExtent,
}).fitBounds(waExtent);

// Customize the map's attribution control.
customizeAttribution(theMap);

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
function convertObjectToDl(o: Record<string, AttributeValue>, aliases?: Map<string, string>) {
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


// Create the basemap layer.
// TODO: Use a WSDOT basemap layer. 
createTileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(theMap);

// Set up the event handling for when the user clicks on the map.
theMap.on("click", async (e: LeafletMouseEvent) => {
  console.debug(`user clicked on ${e.latlng}`, e);
  // Extract the coordinates from the event object.
  const { latlng } = e;
  
  // Add a progress element marker to the location where the user clicked.
  // This marker will be removed once the query has completed.
  const progressMarker = createProgressMarker(latlng).addTo(theMap);

  let errorOccurred = false;

  // Make the ELC query.
  // Store the results if the query was successful.
  // Otherwise, write an error to the console.
  // Regardless of outcome, remove the progress marker.
  let results: PointRouteLocation[] | null = null;
  try {
    results = await callElcNearestRoute(latlng);
  } catch (elcErr) {
    errorOccurred = true;
    console.error(`ELC Error at ${latlng}`, {
      "Leaflet mouse event": e,
      "ELC Error": elcErr,
    });
  } finally {
    progressMarker.remove();
  }

  if (errorOccurred) {
    alert("We're sorry. An error occurred when calling the web service that provides milepost data.");
  } else if (results && results.length) {
    for (const result of results) {
      // Query for county, etc. using https://data.wsdot.wa.gov/arcgis/rest/services/DataLibrary/DataLibrary/MapServer/identify
      console.debug("elcResult", result);
      const marker = createMilepostMarker(result);
      marker.addTo(theMap);
    }
  } else {
    alert("No results. Please try clicking closer to a route.");
  }
});

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

const mpControl = new SrmpControl({
  position: "topright",
}).addTo(theMap);

mpControl.mpForm.addEventListener(
  srmpSubmitEventName,
  async (e) => {
    const { route, mp } = (e as CustomEvent<SrmpSubmitEventData>).detail;
    console.debug("User input", { route, mp });

    const results = await callElcMPToPoint(route, mp);

    if (results) {
      for (const result of results) {
        const marker = createMilepostMarker(result);
        marker.addTo(theMap);
      }
    }
  },
  {
    passive: true,
  }
);
