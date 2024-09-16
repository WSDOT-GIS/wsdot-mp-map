/**
 * Copies Calcite assets from node_modules into public/calcite/assets.
 * See: https://developers.arcgis.com/calcite-design-system/get-started/#load-the-assets
 */
import {
  interstateShield21,
  stateRouteShield21,
  usRouteShield21,
} from "calcite-point-symbols";
import { cp, mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

/** The root path of this project */
const rootDirPath = dirname(dirname(fileURLToPath(import.meta.url)));
/** The directory to which the assets will be copied */
const destinationFolder = join(rootDirPath, "public", "calcite", "assets");
/** The folder from which the assets will be copied */
const sourceAssetsFolder = join(
  rootDirPath,
  "node_modules",
  "@esri",
  "calcite-components",
  "dist",
  "calcite",
  "assets",
);

console.log(
  `Copying Calcite assets from ${sourceAssetsFolder} to ${destinationFolder}...`,
);

console.log(`Creating destination folder if it does not already exist...`);
// Create the destination folder if it doesn't exist.
await mkdir(destinationFolder, { recursive: true });

console.log("Copying asset files...");
// Copy the files from the @wsdot/web-styles package into the destination folder.
await cp(sourceAssetsFolder, destinationFolder, {
  preserveTimestamps: true,
  recursive: true,
  filter: (src) => {
    // Exclude package.json and README.md.
    return !src.endsWith("package.json") && !src.endsWith("README.md");
  },
});

function copyCalcitePointIcons() {
  /**
   * The folder that the icon files will be written to.
   */
  const iconsFolder = join(destinationFolder, "icon");

  const iconNames = {
    interstateShield21,
    stateRouteShield21,
    usRouteShield21,
  };

  const writeIconPromises: ReturnType<typeof writeFile>[] = [];

  for (const [iconName, svgData] of Object.entries(iconNames)) {
    const iconPath = join(iconsFolder, `${iconName.replace(/21$/, "16")}.json`);
    const writePromise = writeFile(iconPath, JSON.stringify(svgData));
    writeIconPromises.push(writePromise);
    writePromise
      .then(() => {
        console.log(`Wrote ${iconPath}`);
      })
      .catch((error: unknown) => {
        console.error(`Error writing ${iconPath}`, error);
      });
  }

  return Promise.allSettled(writeIconPromises);
}

await copyCalcitePointIcons();
