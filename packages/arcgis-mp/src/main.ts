import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import waExtent from "./WAExtent";
import("./index.css");

import("@arcgis/core/Map").then(async ({ default: EsriMap }) => {
  const map = new EsriMap({
    basemap: "hybrid",
  });

  import("@arcgis/core/views/MapView").then(async ({ default: MapView }) => {
    const view = new MapView({
      container: "viewDiv",
      map,
      spatialReference: SpatialReference.WebMercator,
      constraints: {
        geometry: waExtent,
        minZoom: 7,
      },
      extent: waExtent,
      popupEnabled: true,
    });

    view.popup.defaultPopupTemplateEnabled = true;

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
