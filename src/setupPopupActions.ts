import { on } from "@arcgis/core/core/reactiveUtils";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";

/**
 * Creates a calcite-alert element.
 * @returns The created calcite-alert element.
 */
function createCalciteAlert() {
	const message = "Coordinates copied to clipboard.";
	const alert = document.createElement("calcite-alert");
	alert.kind = "success";
	alert.label = message;
	alert.scale = "s";
	alert.autoClose = true;
	alert.autoCloseDuration = "fast";
	alert.placement = "top";

	const messageElement = document.createElement("p");
	messageElement.append(message);
	messageElement.slot = "message";
	alert.append(messageElement);
	return { alert, messageElement };
}

/**
 * Sets up popup actions for the given map view.
 * @param view - The map view to set up popup actions for.
 */
export function setupPopupActions(view: __esri.MapView) {
	const { alert, messageElement } = createCalciteAlert();
	document.body.append(alert);

	const copyPointToClipboard = (point: __esri.Point) => {
		let projectedPoint = point;
		const { spatialReference } = point;
		if (spatialReference.isWebMercator) {
			projectedPoint = webMercatorToGeographic(point) as __esri.Point;
		} else if (!spatialReference.isWGS84) {
			throw new Error(
				`Unsupported spatial reference: ${spatialReference.wkid}`,
			);
		}

		const { x, y } = projectedPoint;
		messageElement.textContent = `Copied ${[y, x].map((x) => x.toFixed(3)).join(",")} to clipboard.`;

		navigator.clipboard
			.writeText([y, x].join(","))
			.then(() => {
				alert.open = true;
			})
			.catch((error: unknown) => {
				console.error("Failed to copy coordinates.", error);
			});
	};

	function isPoint(g: __esri.Geometry): g is __esri.Point {
		return g.type === "point";
	}

	const popupTriggerActionEventHandler: __esri.PopupTriggerActionEventHandler =
		(event) => {
			if (event.action.id === "copy") {
				const feature = view.popup.selectedFeature;
				if (isPoint(feature.geometry)) {
					copyPointToClipboard(feature.geometry);
				}
			}
		};
	on(() => view.popup, "trigger-action", popupTriggerActionEventHandler);
}

export default setupPopupActions;
