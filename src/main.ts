import {
  map,
  tileLayer,
  LatLngBounds,
  marker,
  popup,
} from "leaflet";
import {
  type IFindNearestRouteLocationParameters,
  RouteLocator,
} from "wsdot-elc";
import "leaflet/dist/leaflet.css";
import "./style.css";
import PointRouteLocation from "./PointRouteLocation";
import { GeoUrl } from "./GeoUri";

function createPopup(routeLocation: PointRouteLocation) {
  const content = createPopupContent(routeLocation);
  const thePopup = popup({
    content,
  });

  return thePopup;
}

function createPopupContent(routeLocation: PointRouteLocation) {
  const [x, y] = routeLocation.routeGeometryXY;
  const route = `${routeLocation.Route}${routeLocation.Decrease ? " (Decrease)" : ""}`
  const srmp = `${routeLocation.Srmp}${routeLocation.Back ? "B" : ""}`
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
  const output = document.createElement("div");
  output.appendChild(frag);
  return output;
}

/**
 * Creates an HTML anchor element (<a>) for a GeoURI.
 * @param geoUri - GeoURI.
 * @param label - Label for the GeoURI.
 * @returns An HTML Anchor element.
 */
function createGeoUriAnchor(geoUri: GeoUrl, label?: string) {
  const a = document.createElement("a");
  a.href = geoUri.toString();
  a.textContent = label ?? geoUri.toString();
  a.target = "_blank";
  return a;
}

function createMarker(routeLocation: PointRouteLocation) {
  const popup = createPopup(routeLocation);

  const latLng = routeLocation.leafletLatLngLiteral;
  const outputMarker = marker(latLng).bindPopup(popup);

  return outputMarker;
}

const waExtent = new LatLngBounds([
  [45.54, -116.91],
  [49.05, -124.79],
]);

const rl = new RouteLocator("https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/exts/ElcRestSoe");

const theMap = map("map", {
  maxBounds: waExtent,
}).fitBounds(waExtent);

tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(theMap);

// document.body.querySelectorAll("a[href^='https://leafletjs.com'] .leaflet-attribution-flag")

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
    const marker = createMarker(prl)
    marker.addTo(theMap);
  }
});
