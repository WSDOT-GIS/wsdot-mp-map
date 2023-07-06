import waExtent from "./WAExtent";
import("./index.css");

import("@arcgis/core/Map").then(async ({ default: EsriMap }) => {
  const map = new EsriMap({
    basemap: "hybrid",
  });

  import("@arcgis/core/views/MapView").then(async ({ default: MapView }) => {
    const { default: SpatialReference } = await import(
      "@arcgis/core/geometry/SpatialReference"
    );
    const view = new MapView({
      container: "viewDiv",
      map,
      spatialReference: SpatialReference.WebMercator,
      constraints: {
        geometry: waExtent,
      },
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
        group: "top-trailing",
      });
    });

    import("./elc").then(({ setupElc }) => {
      setupElc(view);
    });
  });
});
