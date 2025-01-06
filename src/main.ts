import waExtent from "./WAExtent";
import { addGraphicsToLayer } from "./addGraphicsToLayer";
import "./components/wsdot-footer";
import "./components/wsdot-header";
import { createErrorAlert } from "./createElcErrorAlert";
import "./elc";
import { findNearestRouteLocations } from "./elc";
import "./elc/arcgis";
import { routeLocationToGraphic } from "./elc/arcgis";
import "./elc/url";
import { callElcFromUrl } from "./elc/url";
import { emitErrorEvent } from "./errorEvent";
import {
	setupMPUrlParamsUpdate,
	updateUrlSearchParams,
} from "./history-api/url-search";
import "./index.css";
import "./layers/AccessControlLayer";
import { accessControlLayer } from "./layers/AccessControlLayer";
import { cityLimitsLayer } from "./layers/CityLimitsLayer";
import "./layers/MilepostLayer";
import { createMilepostLineLayer } from "./layers/MilepostLayer/milepost-line-layer";
import { createMilepostPointLayer } from "./layers/MilepostLayer/milepost-point-layer";
import "./layers/TempLayer";
import { tempLayer } from "./layers/TempLayer";
import "./layers/parcels";
import { createParcelsGroupLayer } from "./layers/parcels";
import "./types";
import { UIAddPositions, hasXAndY, isGraphicHit } from "./types";
import isInternal from "./urls/isIntranet";
import { setupSidebarCollapseButton } from "./widgets/CollapseButton";
import "./widgets/LayerList";
import { setupLayerList } from "./widgets/LayerList";
import "./widgets/setupSearch";
import Basemap from "@arcgis/core/Basemap";
import Graphic from "@arcgis/core/Graphic";
import EsriMap from "@arcgis/core/Map";
import Viewpoint from "@arcgis/core/Viewpoint";
import config from "@arcgis/core/config";
import { whenOnce } from "@arcgis/core/core/reactiveUtils";
import Polyline from "@arcgis/core/geometry/Polyline";
import PortalItem from "@arcgis/core/portal/PortalItem";
import MapView from "@arcgis/core/views/MapView";
import Expand from "@arcgis/core/widgets/Expand";
import Home from "@arcgis/core/widgets/Home";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import setupSearch from "./widgets/setupSearch";
import "@esri/calcite-components";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { defineCustomElements } from "@esri/calcite-components/dist/loader";
import "@fontsource/inconsolata";
import "@fontsource/lato";
import "@wsdot/web-styles/css/wsdot-colors.css";
import type { AnalyticsInstance } from "analytics";

let analytics: AnalyticsInstance | null = null;

import("./setupAnalytics")
	.then(({ default: a }) => {
		analytics = a;
		analytics?.page();
	})
	.catch((reason) => {
		console.error("Failed to load Tag Manager", reason);
	});

// Configure where Calcite assets are loaded from.
// See https://developers.arcgis.com/calcite-design-system/get-started/#distribution
//
// Note that the method described in
// https://developers.arcgis.com/calcite-design-system/get-started/#custom-elements
// does not seem to work.
// const calciteAssetPath = `${import.meta.env.BASE_URL}/calcite/assets`;
// defineCustomElements(window, { resourcesUrl: calciteAssetPath });

// Setup interceptors for non-Calcite icons.
// E.g., https://js.arcgis.com/calcite-components/2.13.0/assets/icon/usRouteShield16.json

defineCustomElements(window, {
	resourcesUrl: "https://js.arcgis.com/calcite-components/2.13.2/assets",
});

/**
 * Determines the host environment based on the location hostname.
 * @returns The environment type, such as QA, GitHub Pages, or Local, or null if unknown.
 */
function getHostEnvironment() {
	if (/^[^.]+qa\b/i.test(location.hostname)) {
		return "QA";
	}
	if (/\bgithub\.io\b/i.test(location.hostname)) {
		return "GitHub Pages";
	}
	if (/^localhost\b/i.test(location.hostname)) {
		return "Local";
	}
	return null;
}

type HostEnvironment = NonNullable<ReturnType<typeof getHostEnvironment>>;

function convertToClassName(environment: HostEnvironment) {
	return environment.replaceAll(/\s/g, "_").toLowerCase();
}

/**
 * Updates the document title and page title to indicate the current non-production environment.
 * @returns In a non-production environment, the environment name. Otherwise, null.
 */
const updateNonProductionTitle = () => {
	const environment = getHostEnvironment();
	// Exit if non-production environment was not detected.
	if (!environment) {
		return environment;
	}

	const suffix = ` - ${environment}`;
	document.title += suffix;

	const className = convertToClassName(environment);

	document.body.classList.add(className);

	try {
		const internal = isInternal();
		if (internal) {
			document.body.classList.add("internal", "intranet");
		}
	} catch (error) {
		console.error("Failed to determine if URL is internal", error);
	}

	// Update the title displayed on the page.
	const titleSelector = "wsdot-header > [slot='title']";
	const titleElement = document.body.querySelector(titleSelector);
	if (!titleElement) {
		console.debug("Could not find title element in wsdot-header", {
			selector: titleSelector,
		});
	} else {
		titleElement.append(suffix);
	}

	return environment;
};

// Update title to show user is using a non-production environment.
updateNonProductionTitle();

import("@arcgis/core/kernel")
	.then(({ fullVersion }) => {
		console.debug(`ArcGIS Maps SDK for JavaScript version ${fullVersion}`);
	})
	.catch((reason: unknown) => {
		console.warn("Failed to get ArcGIS JS API version", reason);
	});

import("@arcgis/core/config")
	.then(({ default: config }) => {
		config.applicationName = import.meta.env.VITE_TITLE;
		config.log.level = import.meta.env.DEV
			? "info"
			: import.meta.env.PROD
				? "none"
				: "warn";

		if (!config.log.interceptors) {
			config.log.interceptors = [];
		}

		config.log.interceptors.push((level, module, ...args) => {
			let logFunction:
				| typeof console.log
				| typeof console.error
				| typeof console.warn;
			switch (level) {
				case "error":
					logFunction = console.error;
					break;
				case "warn":
					logFunction = console.warn;
					break;
				default:
					logFunction = console.log;
					break;
			}
			/* __PURE__ */ logFunction("intercepted log", { level, module, args });

			if (
				level === "error" &&
				module === "esri.widgets.Feature.support.arcadeFeatureUtils"
			) {
				console.group(module);
				const [errorType, errorInfo] = args as [
					string,
					Record<string, unknown> & {
						error: Error;
						expressionInfo: __esri.ExpressionInfo;
						graphic: __esri.Graphic;
					},
				];

				const { error, expressionInfo, graphic } = errorInfo;

				const { name: expressionName, expression } = expressionInfo;

				console.error(errorType, {
					...errorInfo,
					error: error.message,
					errorName: error.name,
					expressionName,
					expression,
					graphic: graphic.toJSON(),
				});
				console.log(expression);
				console.groupEnd();
				return true;
			}

			return false;
		});
	})
	.catch((reason: unknown) => {
		console.error("Failed to setup app config", reason);
	});

// Show a warning to users who are using an outdated browser.
import("browser-update")
	.then(({ default: browserUpdate }) => {
		browserUpdate();
	})
	.catch((reason: unknown) => {
		console.error("Failed to setup browser update", reason);
	});

if (import.meta.hot) {
	import.meta.hot.accept("./addWsdotLogo", (mod) => {
		if (mod) {
			console.log("hot module replacement", mod);
		}
		document.querySelector(".wsdot-logo")?.remove();
	});

	import.meta.hot.accept("./history-api/url-search", (mod) => {
		if (mod) {
			console.log("hot module replacement", mod);
		}
	});
}

window.addEventListener("elc-error", (event) => {
	const reason = event.detail;
	createErrorAlert(reason);
});

window.addEventListener("format-error", (event) => {
	const reason = event.detail;
	createErrorAlert(reason);
});

const defaultSearchRadius = 3000;

const elcMainlinesOnlyFilter =
	"LIKE '___' OR RelRouteType IN ('SP', 'CO', 'AR')";

/**
 * Opens a popup with the features that were hit by the hit test.
 * @param hits - An array of graphic hits.
 * @param view - The map view.
 */
function openPopup(hits: __esri.GraphicHit[], view: MapView) {
	/* __PURE__ */ console.debug("openPopup", {
		hits: hits.map((h) => h.graphic.toJSON() as unknown),
	});
	function extractGraphic(graphicHit: __esri.GraphicHit): Graphic {
		const { graphic } = graphicHit;
		return graphic;
	}
	// Get the features that were hit by the hit test.
	const features = hits.map(extractGraphic);
	function updateUrlSearch() {
		/* __PURE__ */ console.group(
			"updateUrlSearch",
			features.map((f) => f.toJSON()),
		);
		try {
			const routeLocation = features
				.map(
					(f) =>
						f.attributes as Record<
							string,
							string | number | undefined | null
						> & {
							Back: string;
							Route: string;
							Srmp: number;
							Direction: string;
							EndSrmp: number;
							EndBack: string;
						},
				)
				.at(0);

			if (!routeLocation) {
				console.error("Could not find route location");
				return;
			}

			updateUrlSearchParams(routeLocation);
		} finally {
			/* __PURE__ */ console.groupEnd();
		}
	}
	/* __PURE__ */ console.debug("about to open popup", {
		features: features.map((f) => f.toJSON() as unknown),
	});
	view
		.openPopup({
			features,
			updateLocationEnabled: true,
			shouldFocus: true,
		})
		.then(updateUrlSearch)
		.catch((reason: unknown) => {
			console.error("openPopup failed", reason);
		});
}

function testWebGL2Support() {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (window.WebGL2RenderingContext) {
		return true;
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	}
	if (window.WebGLRenderingContext && !window.WebGL2RenderingContext) {
		console.error(
			"your browser has WebGL support, but no WebGL2 support at all",
		);
	} else {
		console.error("your browser has no WebGL support at all");
	}
	return false;
}

if (!testWebGL2Support()) {
	// Get the contents of the no-webgl template and replace the document body with them.
	const template = document.getElementById("no-webgl") as HTMLTemplateElement;
	document.body.innerHTML = template.innerHTML;
} else {
	import("./components/disclaimer")
		.then(({ setupDisclaimerLink }) => {
			// Setup disclaimer modal
			const link = document.querySelector<HTMLAnchorElement>("wsdot-footer");
			if (!link) {
				console.error("Failed to find disclaimer link");
			} else {
				setupDisclaimerLink(link);
			}
		})
		.catch((error: unknown) => {
			console.error("Failed to load disclaimer", error);
		});

	/**
	 * A function that handles the event of finding the nearest route location
	 * when the user clicks on the map.
	 * @param event - the event object containing map click details
	 * @returns - a promise that resolves to an array of {@link RouteLocation|RouteLocations}
	 */
	async function callFindNearestRouteLocation(event: __esri.ViewClickEvent) {
		/* __PURE__ */ console.group(callFindNearestRouteLocation.name);
		const { x, y, spatialReference } = event.mapPoint;
		const locations = await findNearestRouteLocations({
			coordinates: [x, y],
			inSR: spatialReference.wkid,
			referenceDate: new Date(),
			routeFilter: elcMainlinesOnlyFilter,
			searchRadius: defaultSearchRadius,
		});
		const location = locations[0];

		if (location instanceof Error) {
			throw location;
		}

		const locationGraphic = routeLocationToGraphic(location);
		if (hasXAndY(locationGraphic.geometry)) {
			const { x: routeX, y: routeY } = locationGraphic.geometry;
			locationGraphic.geometry = new Polyline({
				paths: [
					[
						[x, y],
						[routeX, routeY],
					],
				],
				spatialReference,
			});
		}
		const layer =
			locationGraphic.geometry.type === "point"
				? milepostPointLayer
				: milepostLineLayer;
		/* __PURE__ */ console.debug("location graphic", locationGraphic.toJSON());
		addGraphicsToLayer(layer, [locationGraphic])
			.then((addResults) => {
				/* __PURE__ */ console.debug(
					"addResults returned by addGraphicsToLayer",
					addResults,
				);
			})
			.catch((error: unknown) => {
				console.error("addGraphicsToLayer failed", error);
			});
		return locations;
	}

	config.applicationName = "WSDOT Mileposts";
	config.log.level = import.meta.env.DEV ? "info" : "error";

	const { request } = config;
	// This app only uses publicly available map services,
	// so we don't need to use identity.
	request.useIdentity = false;
	// Initialize httpDomains array if it does not already have a value.
	if (!request.httpsDomains) {
		request.httpsDomains = [];
	}
	request.httpsDomains.push("wsdot.wa.gov", "data.wsdot.wa.gov");

	const milepostPointLayer = createMilepostPointLayer(
		waExtent.spatialReference,
	);
	const milepostLineLayer = createMilepostLineLayer(waExtent.spatialReference);

	// Show the instructions alert once the mileposts layer has been loaded.
	milepostPointLayer.on("layerview-create", () => {
		const alert =
			document.body.querySelector<HTMLCalciteAlertElement>(
				"#instructionsAlert",
			);
		if (alert) {
			alert.open = true;
		}
		setupMPUrlParamsUpdate(view);
	});

	// Create basemaps
	const imageryHybridBasemap = new Basemap({
		portalItem: new PortalItem({
			id: "952d28d8d68c4e9ca2db7c7d68307af0",
		}),
	});

	const grayBasemap = new Basemap({
		id: "gray",
		portalItem: new PortalItem({
			id: "2d8f6dfc64244464926dd87d0eb9be86",
		}),
	});

	const map = new EsriMap({
		basemap: grayBasemap,
		layers: [
			cityLimitsLayer,
			accessControlLayer,
			tempLayer,
			milepostPointLayer,
			milepostLineLayer,
		],
	});

	map.add(createParcelsGroupLayer());

	const view = new MapView({
		container: "viewDiv",
		map,
		constraints: {
			geometry: waExtent,
			minZoom: 7,
		},
		extent: waExtent,
		popupEnabled: false,
	});

	import("./setupPopupActions")
		.then(({ setupPopupActions }) => {
			setupPopupActions(view);
		})
		.catch((error: unknown) => {
			console.error("Failed to setupPopupActions.", error);
		});

	try {
		setupSidebarCollapseButton(view);
	} catch (error) {
		console.error("Failed to setup sidebar collapse button.", error);
	}

	import("@arcgis/core/widgets/Legend")
		.then(({ default: Legend }) => {
			// We can ignore SonarLint warning. Creating the new Legend also adds it to the UI,
			// so we don't need to assign it to a variable or do anything else with it.
			new Legend({
				view: view,
				container: "legend",
			});
		})
		.catch((error: unknown) => {
			console.error("Failed to import Legend module.", error);
		});

	whenOnce(() => map.initialized)
		.then(() => {
			const shell = document.querySelector<HTMLElement>("calcite-shell");
			const loader = document.querySelector<HTMLElement>("calcite-loader");
			if (!!shell && !!loader) {
				shell.hidden = false;
				loader.hidden = true;
			}
		})
		.catch((error: unknown) => {
			console.error("Failed to initialize map.", error);
		});

	import("@arcgis/core/widgets/BasemapToggle")
		.then(({ default: BasemapToggle }) => {
			const toggle = new BasemapToggle({
				view,
				nextBasemap: imageryHybridBasemap,
			});
			view.ui.add(toggle, {
				index: 0,
				position: "bottom-trailing",
			});
		})
		.catch((error: unknown) => {
			console.error("Failed to import BasemapToggle module.", error);
		});

	// Add the loading indicator widget to the map.
	import("./widgets/LoadingIndicator").then(
		({ setupViewLoadingIndicator }) => setupViewLoadingIndicator(view),
		(reason: unknown) => {
			console.error("Failed to add loading indicator", reason);
		},
	);

	const sb = new ScaleBar({
		unit: "dual",
		view,
	});
	view.ui.add(sb, UIAddPositions.bottomLeading);

	view.popup.defaultPopupTemplateEnabled = true;

	const searchGroup = new Expand({
		icon: "search",
		content: setupSearch(view),
	});
	view.ui.add(searchGroup, {
		index: 0,
		position: UIAddPositions.topTrailing,
	});

	setupLayerList({ view, container: "layerlist" }).catch((reason: unknown) => {
		console.error("Failed to setup layer list", reason);
	});

	const home = new Home({
		view,
	});
	import("./widgets/ClearButton").then(
		({ createClearButton }) => {
			const clearButton = createClearButton({
				layers: [milepostPointLayer, milepostLineLayer, tempLayer],
			});
			view.ui.add([home, clearButton], UIAddPositions.topLeading);
		},
		(reason: unknown) => {
			console.error("Failed to setup clear button", reason);
		},
	);

	/**
	 * Handle the click event on the view.
	 * @param event - The click event on the view.
	 */
	const handleViewOnClick: __esri.ViewClickEventHandler = (event) => {
		/**
		 * If the hit test results are not graphic hits, call
		 * {@link findNearestRouteLocations}. Otherwise, open the popup.
		 * @param hitTestResult - The hit test results
		 */
		const handleHitTestResult = async (hitTestResult: __esri.HitTestResult) => {
			// Filter out hit test results that are not graphic hits.
			const graphicHits = hitTestResult.results.filter(isGraphicHit);

			// If the user clicked on a graphic, open its popup.
			if (graphicHits.length > 0) {
				openPopup(graphicHits, view);
				return;
			}

			// Add graphic to temp layer

			const tempGraphic = new Graphic({
				geometry: event.mapPoint,
			});

			const tempAddResults = await tempLayer.applyEdits({
				addFeatures: [tempGraphic],
			});
			for (const addResult of tempAddResults.addFeatureResults) {
				// addResult.error CAN be null. Esri's type def. is wrong.
				if (addResult.error != null) {
					console.error(
						"There was an error adding the temporary graphic where the user clicked.",
						addResult.error,
					);
				}
			}

			// Call findNearestRouteLocations
			try {
				await callFindNearestRouteLocation(event);
				removeTempGraphic().catch((reason: unknown) => {
					console.error("Failed to remove temporary graphic", reason);
				});
			} catch (error) {
				const message = "Could not find a route location near this location.";

				console.error(message, error);

				const handleError = (reason: unknown) => {
					console.error("Failed to remove temporary graphic", reason);
				};

				view
					.openPopup({
						title: "Route Location Not Found",
						content: message,
						location: event.mapPoint,
					})
					.catch((reason: unknown) => {
						console.error(`Popup with message "${message}" failed.`, {
							reason,
							event,
						});
					})
					.finally(() => {
						removeTempGraphic().catch(handleError);
					});
			}

			/**
			 * Removes the temporary graphic.
			 * @returns - a promise that resolves when the graphic is removed.
			 */
			function removeTempGraphic() {
				// Remove the temporary graphic
				return tempLayer.applyEdits({
					deleteFeatures: [tempGraphic],
				});
			}
		};
		view
			.hitTest(event, {
				include: [milepostPointLayer, milepostLineLayer],
			})
			.then(handleHitTestResult)
			.catch((reason: unknown) => {
				console.error("hitTest failed", reason);
			});
	};
	view.on("click", handleViewOnClick);

	// Set up the form for inputting SRMPdata.
	import("./setupForm")
		.then(({ setupForm }) => setupForm(view, milepostPointLayer))
		.catch((reason: unknown) => {
			console.error("failed to setup form", reason);
		});

	if (import.meta.env.DEV) {
		milepostPointLayer
			.when(async () => {
				const { createExportButton } = await import("./widgets/ExportButton");

				const button = createExportButton({
					layer: milepostLineLayer,
				});
				view.ui.add(button, UIAddPositions.bottomTrailing);
			})
			.catch((reason: unknown) => {
				console.error("failed to create export button", reason);
			});
	}

	Promise.all([milepostPointLayer.when(), milepostLineLayer.when()]).then(
		() => {
			/**
			 * Calls the ELC API to retrieve graphics from the URL and adds them to the milepost layer.
			 * @returns A promise that resolves when the graphics have been added to the layer and the view has been updated.
			 */
			const callElc = async () => {
				// Call the features from the URL and add them to the layer.
				const addedFeatures = await callElcFromUrl(
					milepostPointLayer,
					milepostLineLayer,
				);
				if (addedFeatures) {
					// Zoom to the first feature (if any are in the array).
					// Only expecting to ever be a single feature present.
					const feature = addedFeatures.at(0);
					if (feature) {
						const targetGeometry = feature?.geometry;

						/**
						 * The zoom target.
						 *
						 * Geometry Type           | Zoom Target
						 * ------------------------|-----------------------------------
						 * point                   | A viewpoint with a specified scale
						 * polyline (or non-point) | The feature itself.
						 */
						let goToTarget2D: Graphic | __esri.Viewpoint = feature;

						if (targetGeometry?.type === "point") {
							const scale = Number.parseFloat(import.meta.env.VITE_ZOOM_SCALE);
							goToTarget2D = new Viewpoint({
								scale,
								targetGeometry: targetGeometry,
							});
						}

						await view.goTo(goToTarget2D, {
							animate: false,
						});
					}

					view
						.openPopup({
							features: addedFeatures,
						})
						.catch((reason: unknown) => {
							console.error("Failed to open popup", reason);
						});
				}
			};
			callElc().catch((reason: unknown) => {
				emitErrorEvent(reason);
			});
		},
	);
}
