import waExtent from "./WAExtent";

import("./index.css");

async function createLayers() {
  const MapImageLayer = (await import("@arcgis/core/layers/MapImageLayer"))
    .default;
  const mpLayer = new MapImageLayer({
    portalItem: {
      id: "03ec5ff3609f45caa849d5afa4d92e9e",
    },
  });
  return [mpLayer];
}

import("@arcgis/core/Map").then(async ({ default: EsriMap }) => {
  const map = new EsriMap({
    basemap: "hybrid",
    layers: await createLayers(),
  });

  import("@arcgis/core/views/MapView").then(({ default: MapView }) => {
    const view = new MapView({
      container: "viewDiv",
      map,
      extent: waExtent,
    });

    import("./widgets/setupSearch").then(({ setupSearch }) => {
      setupSearch(view).then((search) => {
        search.view.ui.add(search, {
          index: 0,
          position: "top-trailing",
        });
      });
    });

    import("./widgets/expandGroups").then(({ setupWidgets }) => {
      setupWidgets(view, "top-trailing", {
         group: "top-trailing"
      });
    });
  });
});
