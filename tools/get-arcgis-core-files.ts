import type { Dirent, Dir } from "node:fs";
import { opendir } from "node:fs/promises";
import { join } from "node:path";
import { stderr, stdout } from "node:process";

/**
 * Enumerate through all of the files in the
 * `node_modules/@arcgis/core` directory, skipping
 * the ones that match {@link excludeRegExes}.
 * @param excludeRegExes - An array of regular expressions that
 * determines which files will be excluded from being yielded.
 * @yields non-excluded file paths
 */
export async function* getArcGisFiles(
  excludeRegExes: RegExp[] | null = [/(\.(d\.ts)|(pdf))$/],
) {
  const root = "node_modules/@arcgis/core";
  /**
   * Detects if the input directory entry should be excluded.
   * @param dirEnt - a directory entry item returned from
   * {@link readdir}.
   * @returns either a string describing why the file should be
   * excluded, or false if it should not be excluded.
   */
  function isUnwanted(dirEnt: Dirent) {
    const filePath = join(dirEnt.path, dirEnt.name);
    if (!dirEnt.isFile()) {
      return `${filePath} is not a file`;
    } else if (excludeRegExes != null) {
      for (const re of excludeRegExes) {
        if (re.test(filePath)) {
          return `${filePath} matches ${re.source}`;
        }
      }
    }
    return false;
  }

  // Define variables outside of try statement so they can
  // be closed in finally.
  let dirHandler: Dir | null = null;
  try {
    // Open directory for reading its items.
    dirHandler = await opendir(root, {
      recursive: true,
    });
    // Get the current directory entry.
    let currentDirent = await dirHandler.read();
    while (currentDirent !== null) {
      const currentFilePath = join(currentDirent.path, currentDirent.name);
      // Test to see if the current file should be skipped.
      const skipReason = isUnwanted(currentDirent);
      let message: string;
      if (skipReason) {
        // Log the reason for skipping the current file and
        // then go to the next item in the directory.
        message = `skipping:\t${skipReason}\n`;
      } else {
        // Log the inclusion and yield the current file's Dirent.
        message = `including:\t ${currentFilePath}\n`;
        yield currentDirent;
      }
      //   console.log(message);
      stderr.write(message);
      // Read the next directory entry.
      currentDirent = await dirHandler.read();
    }
  } catch (error) {
    console.error("Error getting contents", error);
  } finally {
    // Close file and directory handles.
    await dirHandler?.close();
  }

  // const contentPaths = contents
  //   .map((f) => join(f.path, f.name))
  //   .map(pathToFileURL);
  // await writeFile(logFile, contentPaths.join("\n"));
}

for await (const dirEnt of getArcGisFiles()) {
  stdout.write(`${join(dirEnt.path, dirEnt.name)}\n`);
}
