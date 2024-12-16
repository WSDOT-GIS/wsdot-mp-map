import type { Dirent } from "node:fs";
import { readdir } from "node:fs/promises";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const thisDir = import.meta.dirname;
const rootDir = dirname(thisDir);

const arcadeDir = join(rootDir, "src", "layers", "MilepostLayer", "arcade");

const results = await readdir(arcadeDir, {
	withFileTypes: true,
	recursive: true,
});

async function prependFileWithNameComment(result: Dirent) {
	const filePath = join(result.parentPath, result.name);
	let fileContent = await readFile(filePath, {
		encoding: "utf-8",
	});

	fileContent = `/**\n * ${result.name}\n */\n\n${fileContent}`;

	return await writeFile(filePath, fileContent, {
		encoding: "utf-8",
	});
}

const prependPromises: ReturnType<typeof prependFileWithNameComment>[] = [];

for (const result of results) {
	if (!(result.isFile() && result.name.endsWith(".arcade"))) {
		continue;
	}
	console.log(result.name);

	prependPromises.push(prependFileWithNameComment(result));
}

await Promise.all(prependPromises);
