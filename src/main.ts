import {
  // Rename so map variable can use this name.
  // Rename the rest to match, and to make
  // their purpose more clear.
  map as createMap,
  marker as createMarker,
  tileLayer as createTileLayer,
  Browser,
  type LeafletMouseEvent,
} from "leaflet";
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

import { SrmpControl } from "./route-input/LeafletControl";
import { SrmpSubmitEventData, srmpSubmitEventName } from "./route-input";
import { createMilepostPopup } from "./MilepostPopup";

// https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API

if (Browser.mobile) {
  console.debug("Mobile browser detected.");
} else {
  console.debug("This does not appear to be a mobile browser.");
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
