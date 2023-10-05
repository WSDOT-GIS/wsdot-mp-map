import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";

/**
 * clear button creation options
 */
export interface ClearButtonOptions {
  /**
   * The layer that will be controlled by the button
   */
  layer: FeatureLayer;
}

/**
 * Creates a button that will clear all graphics on the layer associated with it.
 * @param options - button creation options
 * @returns A button that will clear the specified graphics when cleared.
 */
export function createClearButton(options: ClearButtonOptions) {
  const button = document.createElement("button");
  button.innerText = "Clear";
  const { layer } = options;

  function clearFeatures(this: HTMLButtonElement): void {
    layer
      .queryFeatures()
      .then((features) =>
        layer.applyEdits({
          deleteFeatures: features.features,
        })
      )
      .then((editsResult) => {
        /* @__PURE__ */ console.debug("edits result", editsResult);
      })
      .catch(console.error);
  }

  button.addEventListener("click", clearFeatures);
  return button;
}
