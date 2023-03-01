// import { siGithub } from "simple-icons";
// import { convertSimpleIconToSvgElement } from "./SimpleIconUtils";

/** Regexp matching a GitHub repo URL */
export const githubRepoUrlRe =
  /^https:\/\/github.com\/(?<org>[^/]+)\/(?<repo>[^/]+)/i;
/** Regexp matching a Github Pages URL */
export const githubPagesUrlRe =
  /^https:\/\/(?<org>[^/]+)\.github\.io\/(?<repo>[^/]+)/i;

export type GithubRepoUrl = `https://www.github.com/${string}/${string}`;
export type GithubPagesUrl = `https://${string}.github.io/${string}`;

/**
 * Get the source URL of a Github Pages page.
 * @param throwErrorOnMismatch - If true, throw an error if URL can't
 * be parsed. Otherwise, null will be returned.
 * @returns A URL
 */
export function getGithubUrlFromGithubPages(
  throwErrorOnMismatch: true,
  githubPagesUrl?: GithubPagesUrl
): GithubRepoUrl;
export function getGithubUrlFromGithubPages(
  throwErrorOnMismatch?: false,
  githubPagesUrl?: GithubPagesUrl
): GithubRepoUrl | null;
export function getGithubUrlFromGithubPages(
  throwErrorOnMismatch?: boolean,
  githubPagesUrl?: GithubPagesUrl
) {
  const currentUrl = githubPagesUrl ?? location.href;
  const match = currentUrl.match(githubPagesUrlRe);
  if (!match) {
    if (throwErrorOnMismatch) {
      throw new Error("Could not parse source URL from this page");
    } else {
      return null;
    }
  }
  const [org, repo] = [...match].slice(1).map(s => s.toLowerCase());
  return `https://github.com/${org}/${repo}` as GithubRepoUrl;
}

/**
 * Create a link to GitHub source code.
 * @param fallbackUrl - If page isn't hosted on GitHub pages, this URL
 * will be used.
 * @returns An HTML anchor linking to app source code.
 */
export function createGithubLink(
  fallbackUrl = "https://github.com/wsdot-gis/wsdot-mp-map"
) {
  // const githubSvg = convertSimpleIconToSvgElement(siGithub);
  const a = document.createElement("a");
  // a.append(githubSvg);
  a.textContent = "Source code";
  a.href = getGithubUrlFromGithubPages() || fallbackUrl;
  a.target = "_blank";
  return a;
}
