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
  dirname(thisScriptPath),
);
const rootDirPath =
  // (root)
  dirname(
    // packages
    dirname(
      // arcgis-mp
      arcgisMPPath,
    ),
  );

const publicFolder = join(arcgisMPPath, "public");

const overpassPath = join(
  rootDirPath,
  "node_modules",
  "@fontsource",
  "overpass",
  "files",
);

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
    const fontRe =
      /(?<name>overpass)-(?<script>latin)-(?<weight>\d+)-(?<decoration>normal)/i;
    while (dirEnt) {
      try {
        if (dirEnt.isFile()) {
          const match = dirEnt.name.match(fontRe);
          if (match) {
            const source = dirEnt.path;
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
