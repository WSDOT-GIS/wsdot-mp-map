import { getElcParamsFromUrl } from "../src/elc/url.js";
import { describe, expect, test } from "vitest";

const urlRoot = "https://example.com/data/tools/Locatemp/";

// Create a shorter alias for the function return type.
// This is just to aid readability.
type ExpectedType = Exclude<ReturnType<typeof getElcParamsFromUrl>, null>;

describe("URL search parameters", () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  test("getElcParamsFromUrl", () => {
    const expected: ExpectedType = {
      Route: "005",
      Srmp: 123.45,
      Back: true,
      Decrease: false,
      ReferenceDate: expect.any(Date) as Date,
      ResponseDate: expect.any(Date) as Date,
    };
    const url = `${urlRoot}?sr=005&mp=123.45B`;
    const actual = getElcParamsFromUrl(url);
    expect(actual).toEqual(expected);
  });
  // test("AR specified", () => {
  //   const p = {
  //     SR: "503",
  //     MP: "35.23",
  //     RT: "SP",
  //   };
  //   const expected: ExpectedType = {
  //     Route: "503",
  //     Srmp: 35.23,
  //     Back: false,
  //     Decrease: false,
  //     ReferenceDate: expect.any(Date),
  //     ResponseDate: expect.any(Date),
  //   };
  // });
});
