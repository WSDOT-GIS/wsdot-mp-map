/**
 * Copies Calcite assets from node_modules into public/calcite/assets.
 * See: https://developers.arcgis.com/calcite-design-system/get-started/#load-the-assets
 */
import { cp, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const rootDirPath = dirname(dirname(fileURLToPath(import.meta.url)));
const destinationFolder = join(rootDirPath, "public", "calcite", "assets");
const sourceAssetsFolder = join(
  rootDirPath,
  "node_modules",
  "@esri",
  "calcite-components",
  "dist",
  "calcite",
  "assets",
);

// Create the destination folder if it doesn't exist.
await mkdir(destinationFolder, { recursive: true });

// Copy the files from the @wsdot/web-styles package into the destination folder.
await cp(sourceAssetsFolder, destinationFolder, {
  preserveTimestamps: true,
  recursive: true,
  filter: (src) => {
    // Exclude package.json and README.md.
    return !src.endsWith("package.json") && !src.endsWith("README.md");
  },
});
