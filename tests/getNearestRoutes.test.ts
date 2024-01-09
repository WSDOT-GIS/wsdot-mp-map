import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { expect, suite, test } from "vitest";
import { LayerIds, getNearestRoutes } from "../src/getNearestRoutes";

suite("getNearestRoutes", () => {
  test("should return an array of route polylines", async () => {
    const spatialReference = new SpatialReference({ wkid: 4326 });
    const [x, y] = [-122.29868060014564, 47.59028558797249];
    const point = new Point({
      x,
      y,
      spatialReference,
    });
    const result = await getNearestRoutes({
      point: point,
      distance: 1,
      units: "miles",
      elcUrl:
        "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer",
      layerIds: [LayerIds.increase, LayerIds.decrease],
    });
    expect(result).toBeInstanceOf(Map);
    for (const [direction, routes] of result.entries()) {
      console.log(direction, routes);
    }
  });
});
