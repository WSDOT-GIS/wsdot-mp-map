import Basemap from "@arcgis/core/Basemap";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import HybridReferenceLayerJson from "./hybrid_reference_layer_sans_state_routes.json";

const esriReferenceLayer = new VectorTileLayer({
  title: "Esri Reference Layer",
  style: HybridReferenceLayerJson,
});

export const lrsLayer = new MapImageLayer({
  portalItem: {
    id: "9bb8291584784d1798018af06b7230e0",
  },
  blendMode: "normal",
  opacity: 0.75,
});

// Disable popups for LRS layer.
void lrsLayer.when(() => {
  lrsLayer.allSublayers.forEach((s) => (s.popupEnabled = false));
});

export const satelliteBasemap = Basemap.fromId("satellite");
satelliteBasemap.referenceLayers.addMany([esriReferenceLayer, lrsLayer]);
