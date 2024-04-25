import { waExtent } from "../src/WAExtent";
import { describe, expect, it } from "vitest";

describe("waExtent", () => {
  it("has the correct spatial reference", () => {
    expect(waExtent.spatialReference.isWebMercator).toBe(true);
  });

  it("has the correct xmin value", () => {
    expect(waExtent.xmin).toBeCloseTo(-13891559.256092377);
  });

  it("has the correct ymin value", () => {
    expect(waExtent.ymin).toBeCloseTo(5706937.852318744);
  });

  it("has the correct xmax value", () => {
    expect(waExtent.xmax).toBeCloseTo(-13014361.668641392);
  });

  it("has the correct ymax value", () => {
    expect(waExtent.ymax).toBeCloseTo(6283349.610269844);
  });
});
