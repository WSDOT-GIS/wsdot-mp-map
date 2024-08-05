#!/usr/bin/env bun
import { JSDOM } from "jsdom";
import fs from "node:fs/promises";
import { dirname, join } from "node:path";
import { exit, stderr } from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getHtmlContent(url: string) {
  stderr.write(`\nDownloading HTML from ${url}...\n`);
  const headers = new Headers({ Accept: "text/html" });
  const response = await fetch(
    new Request(new URL(url), {
      method: "GET",
      headers,
    }),
  );
  const buffer = await response.arrayBuffer();
  stderr.write(`Parsing HTML from ${url}...\n`);
  const dom = new JSDOM(buffer);
  return dom.window.document;
}

let url = "https://build.webkit.org/#/builders/731";
let document = await getHtmlContent(url);

/*
TODO: The content is not in the initial HTML document.
Will need to run a headless browser and wait for the document to load.
*/

function getLatestSuccessfulBuildPageUrl(document: Document) {
  // Get the link to the latest successful build.
  const selector = "a.bb-buildid-link > span.results_SUCCESS";
  const spanContainingAnchor =
    document.querySelector<HTMLSpanElement>(selector);
  if (!spanContainingAnchor) {
    console.error(`No element matching selector "${selector}" found`, {
      anchors: [...document.querySelectorAll("span")].map((a) => a.outerHTML),
    });
    exit(1);
  }
  const anchor = spanContainingAnchor.parentElement as HTMLAnchorElement | null;

  if (anchor == null) {
    console.error("No anchor found");
    exit(2);
  }
  return anchor.href;
}

// Get the contents of the link.
url = getLatestSuccessfulBuildPageUrl(document);
document = await getHtmlContent(url);

function getArchiveUrl(document: Document) {
  // Get the link to the latest successful build.
  const anchor = document.querySelector<HTMLAnchorElement>(
    "a[href$='main.zip']",
  );

  if (!anchor) {
    exit("No link found");
  }

  return anchor.href;
}

url = getArchiveUrl(document);
// Extract the filename portion of the URL.
const urlObj = new URL(url);
let filename = urlObj.pathname.split("/").pop();

if (!filename) {
  exit("Could not extract filename from URL");
}

filename = join(__dirname, filename);

// Test to see if a file with this name already exists.
const alreadyExists = await fs
  .access(filename)
  .then(() => true)
  .catch(() => false);

// Exit if the file already exists.
if (alreadyExists) {
  stderr.write(`\nFile "${filename}" already exists.\n`);
  exit(0);
}

// Download the archive file and save it to disk.
stderr.write(`\nDownloading "${url}"\n...`);
const response = await fetch(url);
const buffer = await response.arrayBuffer();

stderr.write(`Writing "${filename}"\n...`);
await fs.writeFile(filename, new Uint8Array(buffer));

stderr.write(`\nDone.\n`);
