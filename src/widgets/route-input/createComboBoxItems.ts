/**
 * Retrieved from the following URL:
 * https://data.wsdot.wa.gov/arcgis/rest/services/Shared/AllStateRoutePoints/MapServer/0/query?where=RelRouteType+IN+%28%27%27%2C+%27SP%27%2C+%27CO%27%2C+%27AR%27%29&outFields=RouteID%2CDirection&orderByFields=RouteID&returnDistinctValues=true&f=html
 */
import sampleRoutesFeatureSet from "./sample-routes.json";

/**
 * Retrieves routes from the WSDOT AllStateRoutePoints service.
 * @returns A promise that resolves to a feature set containing routes.
 */
export async function getRoutesFromService() {
  const url = new URL(
    "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/AllStateRoutePoints/MapServer/0/query",
  );
  url.searchParams.set("where", "RelRouteType IN ('', 'SP', 'CO', 'AR')");
  url.searchParams.set("outFields", "RouteID,Direction");
  url.searchParams.set("orderByFields", "RouteID");
  url.searchParams.set("returnDistinctValues", "true");
  url.searchParams.set("returnGeometry", "false");
  url.searchParams.set("f", "json");
  const response = await fetch(url);
  return (await response.json()) as typeof sampleRoutesFeatureSet;
}

/**
 * Retrieves routes from a given feature set and organizes them into a map.
 * @param featureSet - The feature set to retrieve routes from. Defaults to sampleRoutesFeatureSet.
 * @returns A map where the keys are route IDs and the values are arrays of directions.
 */
export function getRoutes(
  featureSet: typeof sampleRoutesFeatureSet = sampleRoutesFeatureSet,
) {
  const routes = new Map<string, string[]>();
  for (const feature of featureSet.features) {
    const attributes = feature.attributes;
    const routeId = attributes.RouteID;
    const direction = attributes.Direction;
    if (routes.has(routeId)) {
      routes.get(routeId)?.push(direction);
    } else {
      routes.set(routeId, [direction]);
    }
  }
  return routes;
}

/**
 * Generates a generator function that yields a sequence of calcite-combobox-item elements
 * based on the provided routes map. Each calcite-combobox-item element contains a routeId
 * and a empty-string-separated string of directions associated with that routeId.
 * @param routes - A map where the keys are routeIds and the values are
 * arrays of directions.
 * @yields {HTMLElement} A calcite-combobox-item element with a routeId and directions.
 */
export function* getComboboxItems(routes: Map<string, string[]>) {
  for (const [routeId, directions] of routes.entries()) {
    const element = document.createElement("calcite-combobox-item");
    element.value = routeId;
    element.textLabel = routeId;
    element.dataset.directions = directions.join("");
    yield element;
  }
}
