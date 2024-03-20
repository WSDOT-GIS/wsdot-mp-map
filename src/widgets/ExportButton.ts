import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const { convertArcGisFeatureSetToGeoJson } = await import("../export");

/**
 * clear button creation options
 */
export interface ExportButtonOptions {
  /**
   * The layer that will be controlled by the button
   */
  layer: FeatureLayer;
}

/**
 * A function to perform export.
 * @param layer - the layer to export
 * @returns - a promise that resolves to the exported GeoJSON
 */
async function performExport(layer: FeatureLayer) {
  // Create the query definition.
  const query = layer.createQuery();
  // Set the output spatial reference to that used by the GeoJSON standard.
  query.outSpatialReference = SpatialReference.WGS84;
  const featureset = await layer.queryFeatures(query);

  // Exit if there are no features returned from the query.
  if (featureset.features.length === 0) {
    console.warn("no features in layer to export");
    return null;
  }
  const featureCollection = convertArcGisFeatureSetToGeoJson(featureset);
  /* __PURE__ */ console.log(
    "exported GeoJSON feature collection",
    featureCollection
  );

  return featureCollection;
}

/**
 * Generates a download link for a given GeoJSON feature collection.
 * @param featureCollection - The GeoJSON feature collection to be downloaded.
 * @param layer - The layer associated with the feature collection.
 * @returns The download link element.
 */
function createDownloadLink(
  featureCollection: object, // ReturnType<typeof convertArcGisFeatureSetToGeoJson>,
  layer: FeatureLayer
): HTMLAnchorElement {
  const json = JSON.stringify(featureCollection);

  // Create a blob from the GeoJSON string.
  const blob = new Blob([json], {
    type: "application/json",
  });

  // Create a download link.
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${layer.title}.geojson`;
  return link;
}

/**
 * Creates a button that will export all graphics on the layer associated with it.
 * @param options - button creation options
 * @returns - A button that will clear the specified graphics when cleared.
 */
export function createExportButton(options: ExportButtonOptions) {
  const button = document.createElement("button");
  button.title = "Export graphics to GeoJSON";
  button.ariaLabel = "Export";
  button.role = "button";
  button.classList.add(
    "esri-widget",
    "esri-widget--button",
    "esri-component",
    "locate-mp-clear-button"
  );

  const iconSpan = document.createElement("span");
  iconSpan.ariaHidden = "true";
  iconSpan.classList.add("esri-icon", "esri-icon-download");
  button.append(iconSpan);

  const { layer } = options;

  /**
   * buttonEventListener function handles the click event of the button.
   * It checks if a layer is specified, then performs the export operation
   * using the performExport function.
   * If the feature collection is not null, it creates a download link and
   * triggers the click event on the link to initiate the download.
   */
  function buttonEventListener() {
    if (!layer) {
      console.error("no layer specified for ExportButton");
      return;
    }

    performExport(layer)
      .then((featureCollection) => {
        if (!featureCollection) {
          alert("There were no features to export.");
          return;
        }
        // Convert GeoJSON to string.
        const link = createDownloadLink(featureCollection, layer);
        link.click();
      })
      .catch(console.error);
  }

  button.addEventListener("click", buttonEventListener, {
    passive: true,
  });

  return button;
}
