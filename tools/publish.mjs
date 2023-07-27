import { publish } from "gh-pages";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

/**
 * The publish options type for the second parameter of the {@link publish} function.
 * @typedef {Parameters<typeof publish>[1]} PublishOptions
 */

/**
 * Asynchronous version of {@link publish}.
 * @param {string} basePath
 * @param {PublishOptions} config?
 * @returns {Promise<ReturnType<publish>>}
 */
const publishAsync = promisify(publish);

/**
 * Options for publishing to GitHub Pages.
 * @type {PublishOptions}
 */
const publishOptions = {
  // Need to set this in order to include the .nojekyll file in the published output.
  // This is needed to tell GitHub Pages that it should just serve the site as is and
  // that it is not Jekyll content.
  dotfiles: true,
};

/** The path to this very file. */
const thisScriptPath = fileURLToPath(import.meta.url);
/** The "tools" directory, which this file is in. */
const toolsDir = dirname(thisScriptPath);
/** This workspace's root. */
const rootDir = dirname(toolsDir);
/** The folder containing the built website. */
const sourceFolder = join(rootDir, "dist");

console.log(`Publishing contents of "${sourceFolder}" to GitHub pages...`);

try {
  await publishAsync(sourceFolder, publishOptions);
} catch (error) {
  console.error(error instanceof Error ? error.message : error, error);
}
console.log(`Publishing complete.`);

try {
  await readFile(join(rootDir, "package.json"), {
    encoding: "utf-8",
  });
} catch (error) {
  console.warn("Error parsing Github Pages URL.", error);
}
