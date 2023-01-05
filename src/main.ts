import { map, tileLayer, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./style.css";

const waExtent = new LatLngBounds([
  [45.54, -116.91],
  [49.05, -124.79],
]);

const theMap = map("map", {
  maxBounds: waExtent,
}).fitBounds(waExtent);

tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(theMap);
