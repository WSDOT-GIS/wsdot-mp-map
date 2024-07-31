import { querySectionTownship } from "../src/layers/LandSurveyLayer";
import Point from "@arcgis/core/geometry/Point";
import { describe, test } from "vitest";

describe.concurrent("LandSurveyLayer tests", () => {
  test("querySectionTownship", async ({ expect }) => {
    const [x, y] = [-122.51220188959343, 47.14290824679381];
    const point = new Point({ x, y, spatialReference: { wkid: 4326 } });
    const features = await querySectionTownship({
      geometry: point,
    });
    expect(features).toBeTruthy();
    // console.log("township section range", features);
    expect(features.length).toBeGreaterThan(0);
  });
});
