import { describe, test } from "vitest";
import { getElcParamsFromUrl } from "../src/elc/url.js";

const urlRoot = "https://example.com/data/tools/Locatemp/";

// Create a shorter alias for the function return type.
// This is just to aid readability.
type ExpectedType = Exclude<ReturnType<typeof getElcParamsFromUrl>, null>;

describe.concurrent("URL search parameters", () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	test("getElcParamsFromUrl", ({ expect }) => {
		const expected: ExpectedType = {
			Route: "005",
			Srmp: 123.45,
			Back: true,
			Decrease: false,
			ReferenceDate: expect.any(Date) as Date,
			ResponseDate: expect.any(Date) as Date,
		};
		const url = `${urlRoot}?sr=005&mp=123.45B`;
		const actual = getElcParamsFromUrl(url);
		expect(actual).toEqual(expected);
	});
	test("AR specified", ({ expect }) => {
		const p = new URLSearchParams([
			["SR", "503"],
			["MP", "35.23"],
			["RT", "SP"],
		] as const);

		const expected: ExpectedType = {
			Route: "503SP",
			Srmp: 35.23,
			Back: false,
			Decrease: false,
			ReferenceDate: expect.any(Date) as Date,
			ResponseDate: expect.any(Date) as Date,
		};

		const url = new URL(`${urlRoot}?${p.toString()}`);

		const actual = getElcParamsFromUrl(url);

		expect(actual).toEqual(expected);
	});

	/*
  Works

    SR=20&mp=52&RT=SP&RRQ=ANACRT

  Doesn't work

      SR=20&mp=52&RT=SP goes to 020 @ MP 52, not the Spur (Anacortes)
  */
	// Test URL creation when an Route Type is specified but not an RRQ.
	test("Route Type specified", ({ expect }) => {
		const p = new URLSearchParams([
			["SR", "20"],
			["MP", "52"],
			["RT", "SP"],
		] as const);

		const url = new URL(`${urlRoot}?${p.toString()}`);

		const actual = getElcParamsFromUrl(url);
		const expected = {
			Route: "020SP",
			Srmp: 52,
			Back: false,
			Decrease: false,
			ReferenceDate: expect.any(Date) as Date,
			ResponseDate: expect.any(Date) as Date,
		};

		expect(actual).toEqual(expected);
	});
});

describe.concurrent("RRT w/o RRQ", () => {
	test("getElcParamsFromUrl", async ({ expect }) => {
		const p = new URLSearchParams([
			["SR", "20"],
			["MP", "52"],
			["RT", "SP"],
		] as const);
		const url = new URL(`${urlRoot}?${p.toString()}`);
		const elcParams = getElcParamsFromUrl(url);
		expect(elcParams).not.toBeNull();
		if (elcParams) {
			const { findRouteLocations } = await import("../src/elc");
			const result = await findRouteLocations({
				locations: [elcParams],
				outSR: 3857,
			});
			console.log("result", result);
			expect(result).toHaveLength(1);
			const errorResults = result.filter((r) => r instanceof Error);
			expect(errorResults).toHaveLength(1);
		}
	});
});
