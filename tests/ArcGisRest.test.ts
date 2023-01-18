import { expect, test } from "vitest";
import { query } from "../src/arcgis/featureServiceQuery";

test("feature service query", async (context) => {
  const xy: [number, number] = [-122.46286041219399, 47.21469538068594];
  const response = await query(xy);
  expect(response).toBeTypeOf("object");
});
