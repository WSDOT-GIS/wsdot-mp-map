import findNearestResult from "./sample-responses/find_nearest.json";
import findResult from "./sample-responses/find.json";

export async function createDebugGraphic() {
	const [{ default: Graphic }, { default: Polyline }] = await Promise.all([
		import("@arcgis/core/Graphic"),
		import("@arcgis/core/geometry/Polyline"),
	]);

	const {
		EventPoint: { x: clickX, y: clickY },
		RouteGeometry: _,
		...findNearestAttributes
	} = findNearestResult;
	const {
		RouteGeometry: { x: mpX, y: mpY },
		...findAttributes
	} = findResult;

	const polyline = new Polyline({
		paths: [
			[
				[clickX, clickY],
				[mpX, mpY],
			],
		],
		spatialReference: {
			wkid: 3857,
		},
	});

	return new Graphic({
		geometry: polyline,
		attributes: {
			...findNearestAttributes,
			...findAttributes,
		},
	});
}
