import { getRoutes } from "./elc";
import { RouteTypes } from "./elc/types";
import "./route-list.css";
import "@fontsource/lato";
import "@wsdot/web-styles/css/wsdot-colors.css";
import { RouteDescription } from "wsdot-route-utils";

const routes = await getRoutes();

const routeDescriptions = Object.entries(routes.Current).map(
  ([routeName, routeTypes]) => {
    const route = new RouteDescription(routeName);
    const { sr, rrt, rrq, shield, rrtDescription, rrqDescription } = route;
    return {
      routeObject: route,
      route: route.toString(),
      sr,
      rrt,
      rrq,
      shield,
      rrtDescription,
      rrqDescription,
      routeTypes: RouteTypes[routeTypes],
    } as const;
  },
);

const sortFunction = (
  a: (typeof routeDescriptions)[number],
  b: (typeof routeDescriptions)[number],
) => {
  if (a.route !== b.route) {
    return a.route.localeCompare(b.route);
  }
  if (a.rrq !== null && b.rrq !== null && a.rrq !== b.rrq) {
    return a.rrq.localeCompare(b.rrq);
  }
  if (a.rrt !== null && b.rrt !== null && a.rrt !== b.rrt) {
    return a.rrt.localeCompare(b.rrt);
  }
  return 0;
};
// Sort the routeDescriptions alphabetically by the "route" property, then by rrq, then by rrt.
routeDescriptions.sort(sortFunction);

const routeList =
  document.querySelector<HTMLTableSectionElement>("tbody#route-list");

if (!routeList) {
  throw new Error("Could not find element with id 'route-list'");
}

for (const routeDataRow of routeDescriptions) {
  // Create a table row using the "route-template" template and populate its slots.

  const rowElement = routeList.insertRow();

  /* __PURE__ */ console.debug("rowElement", { ...rowElement });

  for (const [key, value] of Object.entries(routeDataRow) as [
    keyof typeof routeDataRow,
    (typeof routeDataRow)[keyof typeof routeDataRow],
  ][]) {
    if (value instanceof RouteDescription) {
      if (value.isRamp) {
        rowElement.classList.add("ramp");
      } else if (value.isMainline) {
        rowElement.classList.add("mainline");
      }
      if (value.rrt != null) {
        rowElement.classList.add(`rrt-${value.rrt}`.toLocaleLowerCase());
      }
      continue;
    }
    const cell = rowElement.insertCell();
    cell.classList.add(key);
    if (value != null) {
      cell.append(value);
    }
  }

  routeList.append(rowElement);

  if (routeDataRow.rrt) {
    rowElement.dataset.rrt = routeDataRow.rrt;
  }
}

// Hide the progress bar and show the table.
const progress = document.querySelector("progress");
if (progress) {
  progress.remove();
}

const table = document.querySelector("table");
if (table) {
  table.removeAttribute("hidden");
}
