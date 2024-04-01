import type { Dirent, Dir, WriteStream } from "node:fs";
import { open as openFile, opendir, type FileHandle } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

/**
 * Enumerate through all of the files in the
 * `node_modules/@arcgis/core` directory, skipping
 * the ones that match {@link excludeRegExes}.
 * @param excludeRegExes - An array of regular expressions that
 * determines which files will be excluded from being yielded.
 * @yields non-excluded file paths
 */
export async function* getArcGisFiles(excludeRegExes = [/(\.(d\.ts)|(pdf))$/]) {
  const root = "node_modules/@arcgis/core";
  /**
   * Detects if the input directory entry should be excluded.
   * @param dirEnt - a directory entry item returned from
   * {@link readdir}.
   * @returns either a string describing why the file should be
   * excluded, or false if it should not be excluded.
   */
  function isUnwanted(dirEnt: Dirent): string | boolean {
    const filePath = join(dirEnt.path, dirEnt.name);
    if (!dirEnt.isFile()) {
      return `${filePath} is not a file`;
    } else if (excludeRegExes != null) {
      for (const re of excludeRegExes) {
        if (re.test(filePath)) {
          return `${filePath} matches ${re}`;
        }
      }
    }
    return false;
  }

  const logFilePath = "dump.log";
  // Define variables outside of try statement so they can
  // be closed in finally.
  let logFile: FileHandle | null = null;
  let dirHandler: Dir | null = null;
  let logWriteStream: WriteStream | null = null;
  try {
    // Open log file for writing.
    logFile = await openFile(logFilePath, "w+");
    await logFile.truncate(0);
    logWriteStream = logFile.createWriteStream({
      encoding: "utf8",
      autoClose: true,
    });
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
      if (skipReason) {
        // Log the reason for skipping the current file and
        // then go to the next item in the directory.
        logWriteStream.write(`skipping\t: ${skipReason}\n`);
      } else {
        // Log the inclusion and yield the current file's Dirent.
        logWriteStream.write(`including:\t ${currentFilePath}\n`);
        yield pathToFileURL(currentFilePath);
      }
      // Read the next directory entry.
      currentDirent = await dirHandler.read();
    }
  } catch (error) {
    console.error("Error getting contents", error);
  } finally {
    // Close file and directory handles.
    const results = await Promise.allSettled([
      logFile?.close(),
      dirHandler?.close(),
      logWriteStream?.close(),
    ]);
    const closeInfo = results.map((r, i) => {
      const label = i === 0 ? "logfile" : i === 1 ? "directory" : "stream";
      return { label, status: r.status } as const;
    });

    console.table(closeInfo);
  }

  // const contentPaths = contents
  //   .map((f) => join(f.path, f.name))
  //   .map(pathToFileURL);
  // await writeFile(logFile, contentPaths.join("\n"));
}

getArcGisFiles();
