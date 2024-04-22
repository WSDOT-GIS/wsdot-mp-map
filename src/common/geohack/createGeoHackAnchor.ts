import { createGeoHackUrl } from ".";

/**
 * Creates an anchor using a URL created by {@link createGeoHackUrl}.
 * @param ghParams - The same parameters as {@link createGeoHackUrl}.
 * @returns - An <a> with an href of a GeoHack URL with text indicating the location.
 */
export function createGeoHackAnchor(
  ...ghParams: Parameters<typeof createGeoHackUrl>
) {
  const url = createGeoHackUrl(...ghParams);
  const a = document.createElement("a");
  a.href = url.toString();
  a.text = `Geohack`;
  a.target = "_blank";

  return a;
}
