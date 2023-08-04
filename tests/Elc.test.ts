import type { Route } from "wsdot-elc";
import { getRoutes } from "../src/elc";

import { expect, test } from "vitest";

/**
 * The test that is run on each route object.
 * @param route - A route
 * @param rrts - Expected RRTs. Test will fail if {@link route}'s
 * RRT is non null and not included in {@link rrts}
 */
function testRoute(route: Route, rrts: string[]) {
  const { routeId } = route;
  const { rrt } = routeId;
  if (rrt) {
    expect(rrts).toContain(rrt);
  }
}

test("ELC: Get Routes", async (_context) => {
  const rrts = ["SP", "CO", "AR"];
  const routes = await getRoutes(...rrts);

  expect(routes.length).to.be.greaterThan(0);

  // Test all of the routes to make sure only
  // expected RRTs and mainlines are included.
  for (const route of routes) {
    testRoute(route, rrts);
  }
});
