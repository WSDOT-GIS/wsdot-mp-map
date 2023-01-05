import {
  map,
  tileLayer,
  LatLngBounds,
  marker,
  type LatLngTuple,
} from "leaflet";
import {
  type IFindNearestRouteLocationParameters,
  type IRouteLocation,
  RouteLocator,
} from "wsdot-elc";
import "leaflet/dist/leaflet.css";
import "./style.css";
import { elcSoeUrl } from "./elc";

interface IPointGeometry {
  x: number;
  y: number;
}

interface PointRouteLocation extends IRouteLocation {
  RouteGeometry: IPointGeometry
}

function isPointGeometry(geometry: any): geometry is IPointGeometry {
  console.group(`Entering ${isPointGeometry.name}…`);
  for (const name of ["x", "y"]) {
    console.log(
      `Checking to see if object has a ${name} property that is a number…`
    );
    if (
      !(Object.hasOwn(geometry, name) && typeof geometry[name] === "number")
    ) {
      console.warn(`mismatch: ${geometry}`, geometry);
      console.groupEnd();
      return false;
    }
  }
  console.groupEnd();
  return true;
}

function isPointRouteLocation(routeLocation: IRouteLocation): routeLocation is PointRouteLocation {
  return isPointGeometry(routeLocation.RouteGeometry);
}

function convertToLtLng(geometry: IPointGeometry): LatLngTuple {
  return [geometry.y, geometry.x];
}

function createPopup(routeLocation: PointRouteLocation) {

  const [x, y] = [routeLocation.RouteGeometry.x, routeLocation.RouteGeometry.y];
  return `${routeLocation.Route}${routeLocation.Decrease ? " (Decrease)" : ""}@${routeLocation.Srmp
    }${routeLocation.Back ? "B" : ""} (${x}, ${y})`;
}

function createMarker(routeLocation: IRouteLocation) {
  if (!isPointRouteLocation(routeLocation)) {
    throw new TypeError("Must be point route location")
  }
  const popup = createPopup(routeLocation);

  const outputMarker = marker(convertToLtLng(routeLocation.RouteGeometry))
    .bindPopup(popup)
    .openPopup();
  return outputMarker;
}

const waExtent = new LatLngBounds([
  [45.54, -116.91],
  [49.05, -124.79],
]);

const rl = new RouteLocator(elcSoeUrl.toString());

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
    createMarker(result).addTo(theMap);
  }
});
