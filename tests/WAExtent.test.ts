import { waExtent } from "../src/WAExtent";
import { describe, it } from "vitest";

describe.concurrent("waExtent", () => {
  it("has the correct spatial reference", ({ expect }) => {
    expect(waExtent.spatialReference.isWebMercator).toBe(true);
  });

  it("has the correct xmin value", ({ expect }) => {
    expect(waExtent.xmin).toBeCloseTo(-13891559.256092377);
  });

  it("has the correct ymin value", ({ expect }) => {
    expect(waExtent.ymin).toBeCloseTo(5706937.852318744);
  });

  it("has the correct xmax value", ({ expect }) => {
    expect(waExtent.xmax).toBeCloseTo(-13014361.668641392);
  });

  it("has the correct ymax value", ({ expect }) => {
    expect(waExtent.ymax).toBeCloseTo(6283349.610269844);
  });
});
