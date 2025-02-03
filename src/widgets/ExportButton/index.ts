import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { createExportDialog } from "./export-dialog";

/**
 * clear button creation options
 */
export interface ExportButtonOptions {
	/**
	 * The layer that will be controlled by the button
	 */
	layer: FeatureLayer;
}

/**
 * Creates a button that will export all graphics on the layer associated with it.
 * @param options - button creation options
 * @returns - A button that will clear the specified graphics when cleared.
 */
export async function createExportButton(layers: Iterable<FeatureLayer>) {
	// const button = document.createElement("button");
	// button.title = "Export graphics to GeoJSON";
	// button.ariaLabel = "Export";
	// button.role = "button";
	// button.classList.add(
	// 	"esri-widget",
	// 	"esri-widget--button",
	// 	"esri-component",
	// 	"locate-mp-clear-button",
	// );

	// const iconSpan = document.createElement("span");
	// iconSpan.ariaHidden = "true";
	// iconSpan.classList.add("esri-icon", "esri-icon-download");
	// button.append(iconSpan);

	const button = document.createElement("calcite-button");
	button.id = "exportButton";
	button.title = "Export graphics to GeoJSON";
	button.iconStart = "download";

	/**
	 * buttonEventListener function handles the click event of the button.
	 * It checks if a layer is specified, then performs the export operation
	 * using the performExport function.
	 * If the feature collection is not null, it creates a download link and
	 * triggers the click event on the link to initiate the download.
	 */
	function buttonEventListener() {
		const dialog = createExportDialog(layers);
		document.body.append(dialog);
		dialog.open = true;
	}

	button.addEventListener("click", buttonEventListener, {
		passive: true,
	});

	return button;
}
