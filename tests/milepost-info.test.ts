import { describe, it } from "vitest";
import { getRouteList } from "../src/milepost-info";

// create test suite to test getRouteList function
describe.concurrent("getRouteList", () => {
	it("should return a list of routes", async ({ expect }) => {
		const routes = await getRouteList();
		expect(routes.length).toBeGreaterThan(0);
		for (const { RouteID, Direction, MinSrmp, MaxSrmp } of routes) {
			for (const x of [RouteID, Direction]) {
				expect(x).to.be.a("string");
			}
			expect(RouteID).length.to.be.at.least(3);
			expect(RouteID).length.to.not.be.greaterThan(12);
			expect(Direction).length.to.be.at.least(1);
			for (const x of [MinSrmp, MaxSrmp]) {
				expect(x).to.be.a("number");
				expect(x).to.be.at.least(0);
			}
		}
	});
});
