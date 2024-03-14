import Color from "@arcgis/core/Color.js";
import { expect, test, suite } from "vitest";
import {
  highwaySignBackgroundColor,
  highwaySignTextColor,
} from "../src/colors.js";

suite("colors", () => {
  test("highwaySignBackgroundColor", () => {
    expect(highwaySignBackgroundColor).toBeInstanceOf(Color);
  });
  test("highwaySignTextColor", () => {
    expect(highwaySignTextColor).toBeInstanceOf(Color);
  });
});
