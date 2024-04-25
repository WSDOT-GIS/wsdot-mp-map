import {
  highwaySignBackgroundColor,
  highwaySignTextColor,
} from "../src/colors.js";
import Color from "@arcgis/core/Color.js";
import { expect, test, describe } from "vitest";

describe("colors", () => {
  test("highwaySignBackgroundColor", () => {
    expect(highwaySignBackgroundColor).toBeInstanceOf(Color);
  });
  test("highwaySignTextColor", () => {
    expect(highwaySignTextColor).toBeInstanceOf(Color);
  });
});
