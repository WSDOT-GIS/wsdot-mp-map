import { LatLngBounds } from "leaflet";

export const gpsWkid = 4326;

/**
 * The extent of WA as defined by [EPSG:1416](https://epsg.io/1416-area)
 */
export const waExtent = new LatLngBounds([
  [45.54, -116.91],
  [49.05, -124.79],
]);
