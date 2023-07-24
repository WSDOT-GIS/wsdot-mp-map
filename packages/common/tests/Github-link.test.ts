/* eslint-env: node */

/**
 * Tests the functions that convert from GitHub repo URLs to
 * Github Pages URLs and vice-versa.
 */

import { expect, test } from "vitest";
import {
  getGithubUrlFromGithubPages,
  getGithubPagesUrlFromGithubRepoUrl,
} from "../src/Github-Link";

const pagesUrl = "https://wsdot-gis.github.io/wsdot-mp-map";
const repoUrl = "https://github.com/WSDOT-GIS/wsdot-mp-map";

// Create regular expressions to match the expected responses.
const [pagesRe, repoRe] = [pagesUrl, repoUrl].map(
  (url) =>
    new RegExp(
      // Add optional trailing slash.
      String.raw`${url}\/?`
        // Excape the periods so they won't match any character.
        .replace(".", String.raw`\.`),
      // Make case-insensitive
      "i"
    )
);

test("create github repo link", () => {
  const outputUrl = getGithubUrlFromGithubPages(undefined, pagesUrl);
  expect(outputUrl).toMatch(repoRe);
});

test("create github pages link", () => {
  const outputUrl = getGithubPagesUrlFromGithubRepoUrl(undefined, repoUrl);
  expect(outputUrl).toMatch(pagesRe);
});
