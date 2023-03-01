/* eslint-env: node */

import { expect, test } from "vitest";
import { getGithubUrlFromGithubPages } from "../src/Github-Link";

test("create github link", () => {
  const pagesUrl = "https://wsdot-gis.github.io/wsdot-mp-map/";
  const expectedUrl = "https://github.com/WSDOT-GIS/wsdot-mp-map";
  const outputUrl = getGithubUrlFromGithubPages(undefined, pagesUrl);
  expect(outputUrl).toMatch(new RegExp(expectedUrl, "i"))
});
