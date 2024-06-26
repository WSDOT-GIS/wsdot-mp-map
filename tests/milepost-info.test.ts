import { getRouteList } from "../src/milepost-info";
import { describe, it, expect } from "vitest";

// create test suite to test getRouteList function
describe("getRouteList", () => {
  it("should return a list of routes", async () => {
    const routes = await getRouteList();
    expect(routes.length).toBeGreaterThan(0);
    for (const { RouteID, Direction, MinSrmp, MaxSrmp } of routes) {
      [RouteID, Direction].forEach((x) => {
        expect(x).to.be.a("string");
      });
      expect(RouteID).length.to.be.at.least(3);
      expect(RouteID).length.to.not.be.greaterThan(12);
      expect(Direction).length.to.be.at.least(1);
      [MinSrmp, MaxSrmp].forEach((x) => {
        expect(x).to.be.a("number");
        expect(x).to.be.at.least(0);
      });
    }
  });
});
