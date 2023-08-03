import type View from "@arcgis/core/views/View";

/**
 * Sets up the loading indicator for a map view.
 * @param view
 * @returns - The handle for watching the view's updating property.
 */
export function setupViewLoadingIndicator(view: View) {
  const viewProgress = document.createElement("progress");
  viewProgress.textContent = "Updating map...";
  // Add the map loading indicator.
  view.ui.add(viewProgress, "bottom-trailing");
  // Make the view loading indicator only show up when the map is updating.
  return view.watch(
    "updating",
    (updating) => (viewProgress.hidden = !updating)
  );
}
