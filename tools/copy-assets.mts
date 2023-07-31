/**
 * This script copies files from node_modules/@arcgis/core to the public
 * folder, as described in
 * [Build with ES Modules/Working with assets/Managing assets locally](https://developers.arcgis.com/javascript/latest/es-modules/#managing-assets-locally)
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cp } from "node:fs/promises";

// Determine the input and output directories
// relative to this script file.

/**
 * The path to this file.
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * ./tools
 */
const __dirname = dirname(__filename);

const rootDir = join(__dirname, "..");

const fromPath = join(rootDir, "node_modules", "@arcgis", "core", "assets");

const toPath = join(rootDir, "public", "assets");

console.log(`Copying from ${fromPath} to ${toPath}...`);
try {
  await cp(fromPath, toPath, {
    recursive: true,
  });
} catch (cpError) {
  console.error(
    `There was an error copying the ArcGIS assets. ${
      cpError instanceof Error ? cpError.message : ""
    }`
  );
  throw cpError;
}
console.log("Copying completed.");
