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
  button.title = "Clear all graphics";
  button.ariaLabel = "Clear";
  button.role = "button";
  button.classList.add(
    "esri-widget",
    "esri-widget--button",
    "esri-component",
    "locate-mp-clear-button"
  );

  const iconSpan = document.createElement("span");
  iconSpan.ariaHidden = "true";
  iconSpan.classList.add("esri-icon", "esri-icon-erase");
  button.append(iconSpan);

  const { layer } = options;

  /**
   * Clears all of the features from the layer.
   * @param this - the clear button
   */
  function clearFeatures(this: HTMLButtonElement): void {
    layer
      .queryFeatures()
      .then((features) =>
        layer.applyEdits({
          deleteFeatures: features.features,
        })
      )
      .catch((reason: unknown) => {
        console.error(reason);
      });
  }

  button.addEventListener("click", clearFeatures);
  return button;
}
