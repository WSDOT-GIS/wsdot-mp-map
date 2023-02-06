import { expect, test } from "vitest";
import { createGeoHackUrl } from "../src/geohack";

test("create geohack URL", () => {
    const [lat, lng] = [45.6448,-122.6617];
    const url = createGeoHackUrl([lat, lng]);
    // Create regex to account for URL encoding of ";" character.
    const expectedRe = new RegExp(`https://geohack.toolforge.org/geohack.php\\?params=${lat}(;|(%2C))${lng}`);
    expect(url.href).toMatch(expectedRe);
})