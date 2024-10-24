import { describe, test } from "vitest";
import { GoogleUrl } from "../src/urls/google";

describe.concurrent("GoogleUrl", () => {
	test("fromLatLng", ({ expect }) => {
		const coords = [47.14290824679381, -122.51220188959343] as const;
		const url = GoogleUrl.fromLatLng(...coords);
		expect(url.toString()).toBe(
			"https://www.google.com/maps/place/47.14290824679381,-122.51220188959343",
		);
	});
});
