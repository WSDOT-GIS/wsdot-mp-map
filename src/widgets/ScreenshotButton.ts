import type MapView from "@arcgis/core/views/MapView";

/**
 * Sets up a screenshot button in the provided MapView.
 * When clicked, the button captures a screenshot of the map view and
 * downloads it as a PNG file.
 *
 * @param mapView - The MapView to which the screenshot button will be added.
 * @returns The created calcite-button element.
 */
export async function setupScreenshotButton(mapView: MapView) {
	await mapView.when();

	const screenshotButton = document.createElement("calcite-button");
	screenshotButton.id = "screenshotButton";
	screenshotButton.iconStart = "camera";
	screenshotButton.title = "Take Screenshot";

	mapView.ui.add(screenshotButton, {
		position: "top-left",
	});

	const buttonEventListener: NonNullable<
		typeof screenshotButton.onclick
	> = () => {
		mapView
			.takeScreenshot({
				format: "png",
				ignoreBackground: true,
			})
			.then((screenshot) => {
				const link = document.createElement("a");
				link.download = "screenshot.png";
				link.href = screenshot.dataUrl;
				link.click();
			});
	};

	screenshotButton.addEventListener("click", buttonEventListener);

	return screenshotButton;
}
