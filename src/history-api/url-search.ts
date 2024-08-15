import { watch } from "@arcgis/core/core/reactiveUtils";
import { RouteDescription } from "wsdot-route-utils";

type RouteLocationAttributes = Record<
  string,
  string | number | null | undefined
> & {
  Back: string;
  Route: string;
  Srmp: number;
  Direction: string;
};

/**
 * Updates the URL search parameters with the given route location.
 * @param routeLocation - The route location to update the URL with.
 * @returns - The updated URL.
 */
export function updateUrlSearchParams(routeLocation: RouteLocationAttributes) {
  const srmp = `${routeLocation.Srmp}${routeLocation.Back}`;
  const { sr, rrt, rrq } = new RouteDescription(routeLocation.Route);
  const direction = routeLocation.Direction;

  const currentUrl = new URL(window.location.href);

  /**
   * Map of the search params and their values.
   */
  const argsMap = new Map([
    ["SR", sr],
    ["RRT", rrt],
    ["RRQ", rrq],
    ["MP", srmp],
    ["DIR", direction],
  ] as const);

  // Update the URL search parameters.
  for (const [key, value] of argsMap) {
    if (value) {
      currentUrl.searchParams.set(key, value);
    } else {
      currentUrl.searchParams.delete(key);
    }
  }

  // Update the browser's URL.
  window.history.replaceState(null, "", currentUrl.toString());

  return currentUrl;
}

const urlSearchRe = /(?<key>[^?=&]+)(?:=(?<value>[^&]*))?/g;

/**
 * Extracts the search parameters from the given string.
 * @param hash - The URL hash to extract the search parameters from.
 * @returns - The extracted search parameters.
 */
export function extractUrlSearchParams(hash: string): URLSearchParams {
  const params = new URLSearchParams();
  urlSearchRe.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = urlSearchRe.exec(hash))) {
    const { groups } = match;
    const key = groups?.key;
    const value = groups?.value;
    if (key && value) {
      params.set(key, value);
    }
  }
  return params;
}

/**
 * Moves the URL search parameters to the URL hash.
 * @param url - The URL to move the search parameters to.
 * @returns - The updated URL.
 */
export function moveUrlSearchToHash(url: URL | string) {
  url = new URL(url);

  if (url.searchParams.size) {
    url.hash += url.search;
    url.search = "";
  }
  return url;
}

/**
 * Updates the URL search params when the popup opens to match
 * the selected feature.
 * @param view - The map view.
 */
export function setupMPUrlParamsUpdate(
  view: __esri.MapView | __esri.SceneView,
) {
  function updateUrl(visible: boolean): void {
    // If the popup is not visible, remove the search params from the URL.
    if (!visible) {
      const noSearchUrl = window.location.search
        ? window.location.href.replace(window.location.search, "")
        : window.location.href;
      history.replaceState(null, "", noSearchUrl);
      return;
    }

    // If the popup is visible, update the search params in the URL.
    const feature = view.popup.selectedFeature;
    try {
      const url = updateUrlSearchParams(
        feature.attributes as RouteLocationAttributes,
      );
      history.replaceState(null, "", url.toString());
    } catch (error) {
      console.error("Failed to update URL search params.", {
        error,
        feature,
      });
    }
  }
  watch(() => view.popup.visible, updateUrl);
}
