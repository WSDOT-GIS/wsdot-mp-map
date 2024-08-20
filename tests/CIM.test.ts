import renderer from "../src/layers/MilepostLayer/MilepostOffsetLineRenderer";
import { describe, test } from "vitest";

describe.concurrent(
  "CIM renderer from JSON exported from ArcGIS Online",
  () => {
    test("renderer was created successfully", ({ expect }) => {
      expect(renderer).toBeDefined();
    });
  },
);
