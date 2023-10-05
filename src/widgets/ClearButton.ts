import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

interface ClearButtonOptions {
  layer: FeatureLayer;
}

export function createClearButton(options: ClearButtonOptions) {
  const button = document.createElement("button");
  button.innerText = "Clear";

  button.addEventListener("click", async () => {
    const { layer } = options;
    const features = await layer.queryFeatures();
    await layer.applyEdits({
      deleteFeatures: features.features,
    });
  });

  return button;
}
