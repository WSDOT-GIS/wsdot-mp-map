import {
  geoJSON, LatLngBounds, map as createMap, marker,
  popup, tileLayer
} from "leaflet";
import {
  RouteLocator, type IFindNearestRouteLocationParameters
} from "wsdot-elc";
import { GeoUrl } from "./GeoUri";
import PointRouteLocation from "./PointRouteLocation";

// CSS and font import
import "@fontsource/overpass";
import "leaflet/dist/leaflet.css";
import "./style.css";

/**
 * Creates a Leaflet popup for a route location.
 * @param routeLocation - route location
 * @returns - a leaflet popup
 */
function createPopup(routeLocation: PointRouteLocation) {
  const content = createPopupContent(routeLocation);
  const thePopup = popup({
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
  const geoUri = new GeoUrl({
    x,
    y,
  });
  const frag = document.createDocumentFragment();
  const srmpDiv = document.createElement("div");
  srmpDiv.innerText = label;
  frag.appendChild(srmpDiv);
  const geoDiv = document.createElement("div");
  frag.appendChild(geoDiv);

  const a = createGeoUriAnchor(geoUri);
  geoDiv.appendChild(a);

  const geoUriHelpAnchor = document.createElement("a");
  geoUriHelpAnchor.href = "https://geouri.org/about/";
  geoUriHelpAnchor.textContent = "(What is this?)";
  geoUriHelpAnchor.target = anchorTarget;

  geoDiv.appendChild(document.createTextNode(" "));

  geoDiv.appendChild(geoUriHelpAnchor);

  const output = document.createElement("div");
  output.appendChild(frag);
  return output;
}

/**
 * Creates an HTML anchor element (<a>) for a GeoURI.
 * @param geoUri - GeoURI.
 * @param label - Text for the GeoURI anchor.
 * @returns An HTML Anchor element.
 */
function createGeoUriAnchor(geoUri: GeoUrl, label: string = "Geo URI") {
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
function createMarker(routeLocation: PointRouteLocation) {
  const popup = createPopup(routeLocation);

  const latLng = routeLocation.leafletLatLngLiteral;
  // TODO: Marker should show the milepost number on it.
  const outputMarker = marker(latLng).bindPopup(popup);

  return outputMarker;
}

/**
 * The extent of WA as defined by [EPSG:1416](https://epsg.io/1416-area)
 */
const waExtent = new LatLngBounds([
  [45.54, -116.91],
  [49.05, -124.79],
]);

const rl = new RouteLocator(
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/exts/ElcRestSoe"
);

const theMap = createMap("map", {
  maxBounds: waExtent,
}).fitBounds(waExtent);

tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(theMap);

const srmpLayer = geoJSON([], {}).addTo(theMap);

const gpsWkid = 4326;

theMap.on("click", async (e) => {
  console.log(`user clicked on ${e.latlng}`, e);
  const coords = [e.latlng.lng, e.latlng.lat];
  const params: IFindNearestRouteLocationParameters = {
    coordinates: coords,
    inSR: gpsWkid,
    outSR: gpsWkid,
    referenceDate: new Date(),
    searchRadius: 200,
  };

  console.log(`elc parameters: ${JSON.stringify(params, undefined, 4)}`);

  const results = await rl.findNearestRouteLocations(params);

  // TODO: Identify county, etc. using https://data.wsdot.wa.gov/arcgis/rest/services/DataLibrary/DataLibrary/MapServer/identify

  for (const result of results) {
    console.log(`elcResult ${JSON.stringify(result, undefined, 4)}`);
    const prl = new PointRouteLocation(result);
    const marker = createMarker(prl);
    marker.addTo(theMap);
  }
});
