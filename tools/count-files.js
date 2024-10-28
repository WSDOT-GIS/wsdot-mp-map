// @ts-check

/**
 * Count the number of files in the dist folder.
 * Returns an exit code of 1 if there are no files.
 */

import { opendir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { exit } from "node:process";

// Get the path to the "dist" folder.
const thisFile = import.meta.filename;
const rootDirPath = dirname(dirname(thisFile));
const targetFolder = join(rootDirPath, "dist");

console.log(`Counting files in ${targetFolder}...`);

const dir = await opendir(targetFolder, {
	recursive: true,
});

let total = 0;
for await (const dirent of dir) {
	if (dirent.isFile()) {
		total++;
	}
}

if (total < 1) {
	console.error(`THERE ARE NO FILES IN THE ${targetFolder} FOLDER!`);
	exit(1);
}
console.log(`There are ${total} files in the ${targetFolder} folder.`);
