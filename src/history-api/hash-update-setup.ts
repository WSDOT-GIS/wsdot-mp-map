import { updateHash } from ".";

/**
 * Sets up view events to update the URL's hash via the
 * History API.
 * @param view - The map view
 * @returns - An object containing the following properties:
 *   - zoomHandle - A handle to the view's zoom property
 *   - centerHandle - A handle to the view's center property
 *   - rotationHandle - A handle to the view's rotation property
 *   - pitchHandle - A handle to the view's pitch property
 */
export function setupHashUpdate(view: __esri.MapView) {
  // // Set view properties to match initial map location hash.
  // if (window.location.hash) {
  //   const initialMapPositionFromUrl = new MapPositionHash(window.location.hash);
  //   view.zoom = initialMapPositionFromUrl.zoom;
  //   view.center = new Point({
  //     x: initialMapPositionFromUrl.x,
  //     y: initialMapPositionFromUrl.y,
  //     spatialReference: { wkid: 3857 },
  //   });
  //   view.rotation = initialMapPositionFromUrl.bearing;
  // }

  const updateCurrentUrlHash: __esri.WatchCallback = (
    oldValue: unknown,
    newValue: unknown,
    propertyName,
    targetObject,
  ) => {
    /* __PURE__ */ console.debug("changed", {
      oldValue,
      newValue,
      propertyName,
      targetObject,
    });
    if (view.navigating) {
      /* __PURE__ */ console.debug(
        "User is currently navigating the map, so don't update hash until they're done.",
      );
      return;
    }

    const currentUrl = new URL(window.location.href);
    const newHash = updateHash(currentUrl, view);
    currentUrl.hash = newHash;
    window.history.replaceState({}, "", currentUrl);
  };

  return view.watch(
    ["zoom", "center", "rotation", "navigating"],
    updateCurrentUrlHash,
  );
}
