import { expect, test } from "vitest";
import { createGeoHackUrl, createGeoHackAnchor } from "../src/common/geohack";

function createExpectedUrl(lat: number, lng: number) {
  // Create regex to account for URL encoding of ";" character.
  return new RegExp(
    String.raw`https://geohack.toolforge.org/geohack.php\?params=${lat}(;|(%3B))${lng}`
  );
}

test("create geohack URL with a tuple", () => {
  const [lat, lng] = [45.6448, -122.6617];
  const url = createGeoHackUrl([lat, lng]);
  // Create regex to account for URL encoding of ";" character.
  const expectedRe = createExpectedUrl(lat, lng);
  expect(url.href).toMatch(expectedRe);
});

test("create geohack URL with an object", () => {
  const latLng = { lat: 45.6448, lng: -122.6617 };
  const url = createGeoHackUrl(latLng);
  // Create regex to account for URL encoding of ";" character.
  const expectedRe = createExpectedUrl(latLng.lat, latLng.lng);
  expect(url.href).toMatch(expectedRe);
});

test("create geohack anchor", () => {
  const latLng = [45.6448, -122.6617] as const;
  const anchor = createGeoHackAnchor(latLng);
  expect(anchor.href).toMatch(createExpectedUrl(...latLng));
  expect(anchor.text).toBe("Geohack");
  expect(anchor.target).toBe("_blank");
  expect(anchor).toBeInstanceOf(HTMLAnchorElement);
});
