import { cp, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDirPath = dirname(dirname(fileURLToPath(import.meta.url)));
const destinationFolder = join(rootDirPath, "src", "wsdot-web-styles");
const wsdotWebStylesFolder = join(
	rootDirPath,
	"node_modules",
	"@wsdot",
	"web-styles",
);

// Create the destination folder if it doesn't exist.
await mkdir(destinationFolder, { recursive: true });

// Copy the files from the @wsdot/web-styles package into the destination folder.
await cp(wsdotWebStylesFolder, destinationFolder, {
	preserveTimestamps: true,
	dereference: true,
	recursive: true,
	filter: (src) => {
		// Exclude package.json and README.md.
		return !src.endsWith("package.json") && !src.endsWith("README.md");
	},
});
