import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import { hasXAndY } from "../types";
import { ElcError } from "./errors";
import type {
	DateType,
	RouteGeometry,
	RouteLocation,
	SrmpRouteLocation,
} from "./types";

/**
 * This variable will be increased for each new graphic
 * and used as the object ID for the graphic.
 */
let oid = 0;

/**
 * Tests to see if an {@link RouteLocation} as valid
 * property values needed for an SRMP route location.
 * @param routeLocation - An ELC route location.
 * @returns - True if all property values are valid, false otherwise.
 */
function hasValidSrmpData<D extends DateType, G extends RouteGeometry>(
	routeLocation: RouteLocation<D, G>,
): routeLocation is SrmpRouteLocation<D, G> {
	return routeLocation.Route != null && routeLocation.Srmp != null;
}

/**
 * Creates a {@link Graphic} from a {@link RouteLocation}
 * @param routeLocation - A route location
 * @returns - A {@link Graphic}.
 */
export function routeLocationToGraphic<
	D extends DateType = DateType,
	G extends RouteGeometry = RouteGeometry,
>(routeLocation: RouteLocation<D, G>) {
	if (routeLocation instanceof ElcError) {
		throw routeLocation;
	}
	let geometry: __esri.Point | undefined;
	if (routeLocation.RouteGeometry && hasXAndY(routeLocation.RouteGeometry)) {
		const { x, y, spatialReference } = routeLocation.RouteGeometry;
		geometry = new Point({ x, y, spatialReference });
	} else {
		console.warn("Input does not have valid point geometry.", routeLocation);
	}
	let attributes:
		| (Record<string, unknown> & {
				OBJECTID: typeof oid;
				Route?: string;
				Direction: "D" | "I";
				Srmp?: number;
				Back: "B" | "";
				"Township Subdivision": null;
				City: null;
				County: null;
		  })
		| undefined;
	if (hasValidSrmpData(routeLocation)) {
		const {
			Route,
			Srmp,
			Back,
			Decrease,
			// Angle,
			// Arm,
			// ArmCalcReturnCode,
			// ArmCalcReturnMessage,
			// Distance,
			// EventPoint,
			// Id,
			// RealignmentDate,
			// ReferenceDate,
			// ResponseDate,
			// RouteGeometry,
		} = routeLocation;
		attributes = {
			OBJECTID: oid,
			Route,
			Direction: Decrease ? "D" : "I",
			Srmp,
			Back: Back ? "B" : "",
			"Township Subdivision": null,
			City: null,
			County: null,
		};
		oid++;
	} else {
		console.warn("Input does not have valid SRMP attributes.", routeLocation);
	}
	return new Graphic({
		geometry,
		attributes,
	});
}
