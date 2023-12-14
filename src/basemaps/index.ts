async function createSatelliteBasemap() {
  const [
    { default: Basemap },
    { default: MapImageLayer },
    { default: VectorTileLayer },
    { default: HybridReferenceLayerJson },
  ] = await Promise.all([
    import("@arcgis/core/Basemap"),
    import("@arcgis/core/layers/MapImageLayer"),
    import("@arcgis/core/layers/VectorTileLayer"),
    import("./hybrid_reference_layer_sans_state_routes.json"),
  ]);

  const [esriReferenceLayer, lrsLayer] = await Promise.all([
    new VectorTileLayer({
      title: "Esri Reference Layer",
      style: HybridReferenceLayerJson,
    }),
    new MapImageLayer({
      portalItem: {
        id: "9bb8291584784d1798018af06b7230e0",
      },
      blendMode: "normal",
      opacity: 0.75,
    }),
  ]);

  // Disable popups for LRS layer.
  void lrsLayer.when(() => {
    lrsLayer.allSublayers.forEach((s) => (s.popupEnabled = false));
  });

  const satelliteBasemap = Basemap.fromId("satellite");
  satelliteBasemap.referenceLayers.addMany([esriReferenceLayer, lrsLayer]);
  /* @__PURE__ */ console.debug("satelliteBasemap", {
    base: satelliteBasemap.baseLayers.toArray(),
    reference: satelliteBasemap.referenceLayers.toArray(),
  });

  return satelliteBasemap;
}
export const satelliteBasemap = await createSatelliteBasemap();
