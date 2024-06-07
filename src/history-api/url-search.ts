import { RouteDescription } from "wsdot-route-utils";

/**
 * Updates the URL search parameters with the given route location.
 * @param routeLocation - The route location to update the URL with.
 * @returns - The updated URL.
 */
export function updateUrlSearchParams(
  routeLocation: Record<string, string | number | null | undefined> & {
    Back: string;
    Route: string;
    Srmp: number;
    Direction: string;
  },
) {
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
