import type ScaleBar from "@arcgis/core/widgets/ScaleBar";

/**
 * Enhances the provided ScaleBar widget by adding a numerical representation
 * of the map's current scale. This function locates the DOM element
 * associated with the scalebar, generates a new element to display the
 * numerical scale, and integrates it into the scalebar's DOM. It also sets
 * up a watcher on the view's scale property to update this numerical
 * display whenever the scale changes.
 *
 * @param scalebar - The ScaleBar widget instance to which the numerical
 * representation of the map scale will be added.
 */
export default function addNumericalScaleToScaleBar(scalebar: ScaleBar) {
	/**
	 * Creates a new element to display the map scale as a number.
	 * Finds the scalebar widget's DOM element, creates a new element to
	 * display the map scale, and appends it to the scalebar element.
	 * Finally, it watches the view's scale property and updates the
	 * element whenever the scale changes.
	 */
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
 
		/**
		 * Updates the display of the numerical scale value.
		 *
		 * @param this - The view accessor.
		 * @param newValue - The new value of the view's scale property.
		 * @param _oldValue - The previous value of the view's scale property. (Currently unused)
		 * @param _propertyName - The name of the view property that changed. (Currently unused)
		 * @param _target - The target accessor. (Currently unused)
		 */
		function updateScale(
			this: __esri.Accessor,
			newValue: number,
			_oldValue: number,
			_propertyName: string,
			_target: __esri.Accessor,
		) {
			scaleDiv.textContent = `Scale: ${newValue}`;
		}
		
		// Watch the view's scale property and update the numerical scale display when the scale changes.
		scalebar.view.watch("scale", updateScale);
	}

	scalebar.when().then(addScaleNumberToBar);
}
