import type Point from "@arcgis/core/geometry/Point";
import { executeQueryJSON } from "@arcgis/core/rest/query";
import Query from "@arcgis/core/rest/support/Query";

/**
 * ELC Map Service layer IDs.
 */
export enum LayerIds {
  increase = 1,
  decrease = 2,
}

/**
 * Valid LRS directions
 */
type DirectionString = "Increase" | "Decrease";

const layerIdToLabel = new Map<LayerIds, DirectionString>([
  [LayerIds.increase, "Increase"],
  [LayerIds.decrease, "Decrease"],
]);

/**
 * Measurement units for the search radius distance.
 */
type Units = Required<__esri.QueryProperties["units"]>;

/**
 * Options for retrieving the nearest routes.
 * Provides details for searching routes based on proximity to a specified point.
 */
export interface GetNearestRoutesOptions {
  /** The point from which to search for the nearest routes. */
  point: Point;

  /** The search radius distance from the point. */
  distance: number;

  /** The units for the search radius distance. */
  units: Units;

  /** The URL to the ELC REST service. */
  elcUrl: "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer";

  /**
   * The layer IDs to search: Increase and/or decrease.
   */
  layerIds: LayerIds[];
}

/**
 * Get the route polylines nearest to the given point.
 * @param options - Options for the getNearestRoutes function
 * @returns - An array of route polylines.
 * @throws - Throws an error if no layer IDs are provided.
 */
export async function getNearestRoutes(options: GetNearestRoutesOptions) {
  const { point, distance, units, elcUrl, layerIds } = options;

  if (!layerIds.length) {
    throw new Error("Must include at least one direction.");
  }

  // Create layer URLs corresponding to the layer IDs.
  const urls = layerIds.map((id) => {
    const direction = layerIdToLabel.get(id);
    if (!direction) {
      throw TypeError("The direction cannot be undefined");
    }
    const output = {
      direction: direction,
      url: `${elcUrl}/${id}`,
    };
    return output;
  });

  /**
   * "WHERE" statement to select routes where the RouteID is three characters
   * or has RRT of SP, CO, or AR (Spur, Couplet, or Alternate Routes, respectively).
   */
  const where = "RouteID LIKE '___' OR RelRouteType IN ('SP', 'CO', 'AR')";

  // Create the Query object to avoid autocasting.
  const query = new Query({
    where,
    outFields: ["RouteID"],
    geometry: point,
    distance,
    units,
    returnGeometry: true,
    returnM: true,
  });

  // Start the queries for both directions.
  const queryPromises = urls.map(({ direction, url }) =>
    executeQueryJSON(url, query).then((featureSet) => {
      const routes = featureSet.features.map((feature) => ({
        routeId: (feature.attributes as unknown as Record<"RouteID", string>)
          .RouteID,
        geometry: feature.geometry,
      }));
      return {
        direction,
        routes,
      };
    })
  );

  // Wait for all the queries to complete.
  // Each query returns an array of objects with the direction and featureSet.
  // The results can then be used with the Map constructor.
  const results = await Promise.all(queryPromises).then((results) =>
    results.map(
      ({ direction, routes }) =>
        // Must cast to make it a tuple, where each element is of a specific type
        // rather than an array where both elements could be either type.
        [direction, routes] as [typeof direction, typeof routes]
    )
  );

  return new Map(results);
}
