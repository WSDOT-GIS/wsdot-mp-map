import { MapPositionHash, updateHash } from ".";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { geographicToWebMercator } from "@arcgis/core/geometry/support/webMercatorUtils";
import type MapView from "@arcgis/core/views/MapView";

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
export function setupHashUpdate(view: MapView) {
  view
    .when(() => {
      // Set view properties to match initial map location hash.
      if (window.location.hash) {
        const initialMapPositionFromUrl = new MapPositionHash(
          window.location.hash,
        );
        view.zoom = initialMapPositionFromUrl.zoom;
        let center = new Point({
          x: initialMapPositionFromUrl.center[0],
          y: initialMapPositionFromUrl.center[1],
          spatialReference: SpatialReference.WGS84,
        });
        center = geographicToWebMercator(center) as Point;
        view.center = center;
        view.rotation = initialMapPositionFromUrl.bearing;
      }
    })
    .catch((error: unknown) => {
      console.error("Error when setting up hash update", error);
    });

  const updateCurrentUrlHash: __esri.WatchCallback = () =>
    /* 
    oldValue: unknown,
    newValue: unknown,
    propertyName,
    targetObject,
    */
    {
      if (view.navigating) {
        // Do not update hash during a navigation
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
