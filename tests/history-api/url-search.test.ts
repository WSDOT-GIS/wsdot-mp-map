import { describe, test } from "vitest";
import { moveUrlSearchToHash } from "../../src/history-api/url-search";

describe.concurrent("moveUrlSearchToHash", () => {
	test("moves the URL search parameters to the URL hash", ({ expect }) => {
		const x = -122.90913367530709;
		const y = 46.14502682037163;
		const zoom = 15;
		const bearing = 0;
		const pitch = 0;

		const sr = "004";
		const mp = 61.65;
		const urlRoot = "http://example.com/data/tools/Locatemp/";
		const qs = `MP=${mp}&SR=${sr}`;
		const hash = `${zoom}/${y}/${x}/${bearing}/${pitch}`;
		const url = new URL(`?${qs}#${hash}`, urlRoot);

		const updatedUrl = moveUrlSearchToHash(url);

		const expectedUrl = new URL(`#${hash}?${qs}`, urlRoot);

		expect(updatedUrl.toString()).toBe(expectedUrl.toString());
	});
});
