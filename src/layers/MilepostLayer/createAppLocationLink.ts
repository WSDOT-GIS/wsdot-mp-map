import type Graphic from "@arcgis/core/Graphic";
import { getRouteParts } from "wsdot-route-utils";
import type { AttributeValue } from "../../common/arcgis/typesAndInterfaces";

/**
 * Creates an anchor element that links to the LocateMP app,
 * opened to a specific point on the LRS.
 * @param graphic - A graphic with a point geometry.
 * @returns An anchor element that links to the LocateMP app.
 */
export function createAppLocationLink(
	graphic: Pick<Graphic, "attributes" | "toJSON">,
): HTMLAnchorElement {
	// Get the Route, SRMP, Back, and Decrease attributes.
	const attributes = graphic.attributes as Record<string, AttributeValue>;

	const url = new URL(location.href);

	/**
	 * Splits a Route ID string into its component
	 * SR, RRT, and RRQ parts, and yields name/value pairs.
	 * @param value - the Route ID string
	 * @yields the SR, RRT, and RRQ parts
	 */
	function* addRouteParts(value: string) {
		const routeParts = getRouteParts(value, {
			suffixesAreOptional: true,
			throwErrorOnMatchFail: true,
		});

		// If route parts is not null and has at least one element...
		if (routeParts?.length) {
			const routePartNames = ["SR", "RRT", "RRQ"] as const;

			for (let index = 0; index < routeParts.length; index++) {
				if (index > 2) {
					break;
				}

				// Get the route part name corresponding to index.
				const routePart = routeParts[index];

				// If the route part is null, break out of the loop.
				// If there is no RRT, then there will also be no RRQ
				// (or at least there shouldn't be).
				if (!routePart) {
					break;
				}

				const routePartName = routePartNames[index];
				yield [routePartName, routePart] as const;
			}
		}
	}

	for (const kvp of Object.entries(attributes)) {
		const key = kvp[0];
		let value = kvp[1];

		if (value == null) {
			continue;
		}
		if (typeof value !== "string") {
			value = value.toString();
		}
		if (key === "Route") {
			for (const [routePartName, routePart] of addRouteParts(value)) {
				url.searchParams.set(routePartName, routePart);
			}
		} else if (key === "Srmp") {
			url.searchParams.set("MP", value);
		} else if (key === "Back") {
			url.searchParams.set("Back", value);
		} else if (key === "Direction") {
			url.searchParams.set("DIR", value);
		}
	}

	const anchor = document.createElement("a");

	anchor.href = url.toString();
	anchor.target = "_blank";
	anchor.rel = "noopener noreferrer external";
	anchor.append("Link to this location");

	return anchor;
}
