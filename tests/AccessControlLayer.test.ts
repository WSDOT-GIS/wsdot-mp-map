import Point from "@arcgis/core/geometry/Point.js";
import { expect, suite, test } from "vitest";
import { queryAccessControl } from "../src/layers/AccessControlLayer.js";

suite("AccessControlLayer", () => {
  test("query", async () => {
    const [x, y] = [-122.17437137649887, 47.58053024024835];
    const point = new Point({ x, y, spatialReference: { wkid: 4326 } });
    const result = await queryAccessControl(point);
    expect(result).toBeInstanceOf(Set);
  });
});
