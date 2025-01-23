import type ScaleBar from "@arcgis/core/widgets/ScaleBar";

export default function addNumericalScaleToScaleBar(scalebar: ScaleBar) {
	function addScaleNumberToBar() {
		// Get the scalebar widget's DOM element
		const parent =
			typeof scalebar.container === "string"
				? document.getElementById(scalebar.container)
				: scalebar.container;
		if (!parent) {
			console.error("Failed to find parent element for scalebar");
			return;
		}

		// Create a new element to display the map scale as a number.
		const scaleDiv = document.createElement("div");
		scaleDiv.id = "scaleDiv";
		scaleDiv.classList.add("scale-as-number", "esri-widget");
		parent.appendChild(scaleDiv);

		function updateScale(
			this: __esri.Accessor,
			newValue: number,
			oldValue: number,
			propertyName: string,
			target: __esri.Accessor,
		) {
			scaleDiv.textContent = `Scale: ${newValue}`;
			/* __PURE__ */ console.debug(updateScale.name, {
				this: this,
				oldValue,
				newValue,
				propertyName,
				target,
			});
		}
		// Uncomment this section to debug scale changes 👇
		scalebar.view.watch("scale", updateScale);
	}

	scalebar.when().then(addScaleNumberToBar);
}
