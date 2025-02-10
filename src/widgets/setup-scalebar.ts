import type MapView from "@arcgis/core/views/MapView";

/**
 * Sets up a scalebar widget for the provided map view. The scalebar
 * is added to the view's user interface at the bottom leading position.
 * In a development environment, a numerical representation of the map's
 * scale is also added to the scalebar.
 *
 * @param view - The MapView to which the scalebar will be added.
 */
export const setupScalebar = async (view: MapView) => {
	const [{ default: ScaleBar }, { UIAddPositions }] = await Promise.all([
		import("@arcgis/core/widgets/ScaleBar"),
		import("../types"),
	]);

	const sb = new ScaleBar({
		unit: "dual",
		view,
	});
	view.ui.add(sb, UIAddPositions.bottomLeading);

	const { default: addNumericalScaleToScaleBar } = await import(
		"./addNumericalToScaleBar"
	);
	addNumericalScaleToScaleBar(sb);
};
