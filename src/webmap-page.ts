/// <reference types="vite/client" />
import waExtent from "./WAExtent";
import "./components/wsdot-footer";
import "./components/wsdot-header";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import PortalItem from "@arcgis/core/portal/PortalItem";
import MapView from "@arcgis/core/views/MapView";
import "@fontsource/lato";

// In ArcGIS Online, you must create a file named .env.local
// and then add these environment variables to it.
// See https://developers.arcgis.com/arcgis-rest-js/authentication/#api-key-manager

esriConfig.apiKey = import.meta.env.VITE_WEBMAP_API_KEY;
esriConfig.portalUrl = import.meta.env.VITE_WEBMAP_PORTAL_URL;

const portalItem = new PortalItem({
  id: import.meta.env.VITE_WEBMAP_PORTAL_ITEM_ID,
});

const webmap = new WebMap({
  portalItem,
});

const view = new MapView({
  container: "viewDiv",
  map: webmap,
  extent: waExtent,
});

view.when().catch((error: unknown) => {
  console.error("Failed to load map", error);
});

import("./components/disclaimer")
  .then(({ setupDisclaimerLink }) => {
    // Setup disclaimer modal
    const link = document.querySelector<HTMLAnchorElement>("wsdot-footer");
    if (!link) {
      console.error("Failed to find disclaimer link");
    } else {
      setupDisclaimerLink(link);
    }
  })
  .catch((error: unknown) => {
    console.error("Failed to load disclaimer", error);
  });
