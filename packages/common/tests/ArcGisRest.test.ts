import { AssertionError } from "chai";
import { expect, test } from "vitest";
import {
  enumerateQueryResponseAttributes,
  query,
} from "../src/arcgis/featureServiceQuery";

test(
  "feature service query",
  async (context) => {
    const xy: [number, number] = [-122.26103567468529, 47.463442298954895];
    const response = await query(xy);

    expect(response).toBeTypeOf("object");

    const attributes = [...enumerateQueryResponseAttributes(response)];
    try {
      expect(attributes.length).toBeLessThanOrEqual(3);
    } catch (e) {
      if (e instanceof AssertionError) {
        console.error(attributes);
        throw e;
      }
    }
    for (const [key, value] of attributes) {
      expect(key).toBeTypeOf("string");
    }
  },
  {
    timeout: 60_000,
  }
);
