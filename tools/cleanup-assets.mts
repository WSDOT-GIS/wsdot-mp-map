/**
 * @file Removes unused assets from the "assets" directory.
 * @see {@link https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/building-in-vite-includes-unnecessary-files/m-p/1237759|"Building in vite includes unnecessary files" on _Esri Community_}
 */

import type { Dirent } from "node:fs";
import { readdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * The directory that THIS file is in.
 */
const toolsDir = dirname(fileURLToPath(import.meta.url));

/**
 * The "assets" directory in the sibling "dist" directory.
 */
const assetsDir = join(dirname(toolsDir), "dist", "assets");

/**
 * Get a list of all files in the "assets" directory as an array of
 * {@link Dirent|Dirents}
 */
const dirents: Dirent[] = await readdir(assetsDir, { withFileTypes: true });

// const fileRe = /^.+-.+\.js$/;

/**
 * Matches l18n files with a language code in the form of `en_US` or `en_GB`, or `zh-Hans` or `zh-Hant`.
 */
const languageRe = /^(?<lang>[a-z]{2})_(?<region>([A-Z]{2})|([a-zA-Z]{4}))/;

/**
 * An array of {@link RegExp} object that match filenames of unneeded files.
 */
const unneeded = [
  //   /^infoFor3D/i,
  //   /^Quantization/i,
  //   /^queryZScale/i,
  //   /^t9n/i,
  /^BingMaps/i,
  /^GeoJSON/i,
  /^GeoRSS/i,
  /^integratedMeshLayer/i,
  /^KML/i,
  /^KnowledgeGraph/i,
  /^OGCFeature/i,
  /^OpenStreetMap/i,
  /^Oriented/i,
  /^PointCloud/i,
  /^RouteLayer/i,
  /^sphere/i,
  /^StreamLayer/i,
  /^Video/i,
  /^Voxel/i,
  /^WFS/i,
  /^WMT?SLayer/i,
];

/**
 * This array will be populated with the paths to the files that should be deleted.
 */
const filesToDelete: string[] = [];

// Iterate over each file or directory in the "assets" directory.
for (const dirent of dirents) {
  const { name } = dirent;

  // If the filename matches the language pattern, check if it's not English.
  const langMatch = languageRe.exec(name);
  if (langMatch?.groups) {
    const { lang, region } = langMatch.groups;
    console.log(
      // Log the filename and the language it matches.
      `${name} is a language: ${lang}-${region}.`
    );
    // If the language doesn't match English, add it to the delete list.
    if (langMatch.groups.lang !== "en") {
      console.log(`Adding ${name} to delete list.`);
      filesToDelete.push(join(dirent.path, dirent.name));
    }

    // If the filename matches one of the unneeded patterns,
  } else if (unneeded.some((re) => re.test(name))) {
    console.log(`Adding ${name} to delete list.`);
    filesToDelete.push(join(dirent.path, dirent.name));
  }
}
// Delete all of the files in the array.
// Log whether or not they were successful.
const rmPromises = filesToDelete.map((file) =>
  rm(file, {})
    .then(() => {
      console.log(`Deleted ${file}`);
    })
    .catch((error: unknown) => {
      console.error(`Failed to delete ${file}`, error);
    })
);

// Wait for all the deletes to complete.
await Promise.all(rmPromises);
