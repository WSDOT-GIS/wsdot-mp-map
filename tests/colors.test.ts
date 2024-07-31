import {
  highwaySignBackgroundColor,
  highwaySignTextColor,
} from "../src/colors.js";
import Color from "@arcgis/core/Color.js";
import { test, describe } from "vitest";

describe.concurrent("colors", () => {
  test("highwaySignBackgroundColor", ({ expect }) => {
    expect(highwaySignBackgroundColor).toBeInstanceOf(Color);
  });
  test("highwaySignTextColor", ({ expect }) => {
    expect(highwaySignTextColor).toBeInstanceOf(Color);
  });
});
