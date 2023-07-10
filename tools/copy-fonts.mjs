/**
 * Copies fonts from node_modules into public/fonts.
 * @example
 * $ node packages/arcgis-mp/tools/copy-fonts.mjs
 */

import { cp, opendir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const thisScriptPath = fileURLToPath(import.meta.url);

const arcgisMPPath = dirname(
  // tools
  dirname(thisScriptPath)
);
const rootDirPath =
  // (root)
  dirname(
    // packages
    dirname(
      // arcgis-mp
      arcgisMPPath
    )
  );

const publicFolder = join(arcgisMPPath, "public");

const overpassPath = join(
  rootDirPath,
  "node_modules",
  "@fontsource",
  "overpass",
  "files"
);

/**
 * Matches font name with groups for font's
 * - name (e.g., overpass)
 * - script (e.g. latin)
 * - weight (e.g., 300)
 * - decoration (e.g., normal or italic)
 */
const fontRe =
  /(?<fontName>overpass)-(?<script>latin)-(?<weight>\d+)-(?<decoration>normal)/i;

/**
 * Gets the output ArcGIS API-expected filename to use when copying the input file.
 * E.g. output filename: fonts/overpass-regular/0-255.pbf
 * @param {string} sourceFilename - Font file path from node_modules folder
 * @param {string} fontsFolder - the destination folder that fonts will be copied to.
 * (This function does not do the copying.)
 * @return {string|null} Returns the output path if the {@link sourceFilename} is in the expected format, `null` otherwise.
 */
function getOutputFilename(sourceFilename, fontsFolder) {
  if (!sourceFilename) {
    throw new TypeError("sourcePath cannot be null or empty string.");
  }

  const match = sourceFilename.match(fontRe);

  if (!match || !match.groups) {
    return null;
  }

  const { fontName, script, weight, decoration } = match.groups;

  const output = join(fontsFolder, `${fontName}-${decoration}`);

  return output;
}

/**
 * Enumerate through all the files in the source directory
 * that are font files that we want.
 * @yields - A tuple: source & destination paths
 */
async function* enumerateFiles() {
  /** @type {Dir} */
  let dir;
  try {
    dir = await opendir(overpassPath, {
      recursive: true,
    });

    let dirEnt = await dir.read();

    while (dirEnt) {
      try {
        if (dirEnt.isFile()) {
          const match = dirEnt.name.match(fontRe);
          if (match) {
            const source = dirEnt.path;
            // TODO: Rename files to what ArcGIS API is expecting.
            // E.g., https://<appURL>/fonts/overpass-regular/0-255.pbf
            const dest = join(publicFolder, "fonts", dirEnt.name);
            /** @type {[source: string, dest: string]} */
            const output = [source, dest];
            yield output;
          }
        }
      } finally {
        dirEnt = await dir.read();
      }
    }
  } finally {
    dir.close();
  }
}

// Start copy operations and store promises in array.
const copyPromises = [];
for await (const [source, dest] of enumerateFiles()) {
  copyPromises.push(cp(source, dest));
}

// Wait for all the copies to complete and store results.
const results = await Promise.allSettled(copyPromises);

// Separate success and failure results.
const rejected = results.filter((r) => r.status === "rejected");
const fulfilled = results.filter((r) => r.status === "fulfilled");

// Write output messages.

if (fulfilled.length) {
  console.log(`Copied ${fulfilled.length} files.`);
}

if (rejected.length) {
  console.error(`Failed to copy ${rejected.length} files.`);
}

// const overpassLocation = import.meta.url

// console.log(overpassLocation);
