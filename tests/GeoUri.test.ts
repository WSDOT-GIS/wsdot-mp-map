import { describe, it } from "vitest";
// Generated by CodiumAI, then modified
import GeoUrl, { CrsLabel } from "../src/urls/GeoUri";

describe.concurrent("GeoURI", () => {
	// Should construct a GeoUrl object with valid options
	it("should construct a GeoUrl object with all valid options", ({
		expect,
	}) => {
		// Test input
		const options = {
			x: 1,
			y: 2,
			altitude: 3,
			crs: CrsLabel.wgs84,
			uncertaintyInMeters: 4,
		};

		// Expected output
		const expectedHref = `geo:${options.y.toString()},${options.x.toString()},${options.altitude.toString()},crs=${options.crs},u=${options.uncertaintyInMeters.toString()}`;
		const expectedX = 1;
		const expectedY = 2;
		const expectedAltitude = 3;
		const expectedCrs = CrsLabel.wgs84;
		const expectedUncertainty = 4;

		// Create GeoUrl object
		const geoUrl = new GeoUrl(options);

		// Assertions
		expect(geoUrl.href).toBe(expectedHref);
		expect(geoUrl.x).toBe(expectedX);
		expect(geoUrl.y).toBe(expectedY);
		expect(geoUrl.altitude).toBe(expectedAltitude);
		expect(geoUrl.crs).toBe(expectedCrs);
		expect(geoUrl.uncertainty).toBe(expectedUncertainty);
		expect(geoUrl.latLngTuple).toEqual([expectedY, expectedX]);
		expect(geoUrl.xyTuple).toEqual([expectedX, expectedY]);
	});
	it("should construct a GeoUrl object with valid options", ({ expect }) => {
		// Test input
		const options = {
			x: 1,
			y: 2,
		};

		// Expected output
		const expectedHref = `geo:${options.y.toString()},${options.x.toString()}`;
		const expectedX = options.x;
		const expectedY = options.y;

		// Create GeoUrl object
		const geoUrl = new GeoUrl(options);

		// Assertions
		expect(geoUrl.href).toBe(expectedHref);
		expect(geoUrl.x).toBe(expectedX);
		expect(geoUrl.y).toBe(expectedY);
		expect(geoUrl.altitude).toBeUndefined();
		expect(geoUrl.crs).toBeUndefined();
		expect(geoUrl.uncertainty).toBeUndefined();
		expect(geoUrl.latLngTuple).toEqual([expectedY, expectedX]);
		expect(geoUrl.xyTuple).toEqual([expectedX, expectedY]);
	});
});
