/**
 * Copies the source files from the src folder to the dist folder.
 */
import { cp, mkdir, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = dirname(scriptPath);
const rootDirPath = dirname(scriptDir);
const sourceFolder = join(rootDirPath, "src");
const destinationFolder = join(rootDirPath, "dist", "src");

// Create the destination folder if it doesn't exist.
await mkdir(destinationFolder, { recursive: true });

/**
 * Checks if the given source is a directory or a TypeScript file.
 * @param src - The source path to check.
 * @returns A promise that resolves to a boolean indicating if the source is a directory or a TypeScript file.
 */
async function isDirectoryOrTypeScriptFile(src: string): Promise<boolean> {
  return (
    (await stat(src)).isDirectory() ||
    (/\.ts$/i.test(src) && !/\.d\.ts$/i.test(src))
  );
}
// Copy the files from the source folder into the destination folder.
await cp(join(sourceFolder), destinationFolder, {
  preserveTimestamps: true,
  filter: isDirectoryOrTypeScriptFile,
  recursive: true,
});
