import { queryAccessControl } from "../src/layers/AccessControlLayer.js";
import Point from "@arcgis/core/geometry/Point.js";
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
import { describe, test } from "vitest";

describe.concurrent("AccessControlLayer", () => {
  test("query", async ({ expect }) => {
    const [x, y] = [-13377854.691900361, 6068328.6911837095];
    const point = new Point({
      x,
      y,
      spatialReference: SpatialReference.WebMercator,
    });
    const resultSet = await queryAccessControl(point);
    expect(resultSet).toBeInstanceOf(Set);
    expect(resultSet).toHaveLength(1);
  });
});
