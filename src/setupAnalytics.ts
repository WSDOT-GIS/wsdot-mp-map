/**
 * Sets up site analytics only if user has not opted out of tracking.
 * @module setupAnalytics
 */

import type { AnalyticsInstance } from "analytics";

/**
 * Indicates if the user has opted out of tracking.
 * @returns true if either of the following are met:
 * - `navigator.doNotTrack === "1"`
 * - `navigator.globalPrivacyControl === true`
 */
const userHasOptedOut = () =>
	navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true;

/**
 * The Tag Manager client.
 * Will be null if the user has opted out of tracking,
 * determined if any of the following are true:
 * - navigator.doNotTrack === "1"
 * - navigator.globalPrivacyControl === true
 */
let analytics: AnalyticsInstance | null = null;

// Only create the client if the user has not opted out of tracking.
if (userHasOptedOut()) {
	console.log("User has opted out of tracking. Skipping analytics setup.", {
		doNotTrack: navigator.doNotTrack,
		globalPrivacyControl: navigator.globalPrivacyControl,
	});
} else {
	const [{ default: Analytics }, { default: googleTagManager }] =
		await Promise.all([
			import("analytics"),
			import("@analytics/google-tag-manager"),
		]);

	analytics = Analytics({
		app: "Locate MP",
		debug: import.meta.env.DEV,
		plugins: [
			googleTagManager({
				dataLayerName: "dataLayer",
				containerId: import.meta.env.VITE_GOOGLE_MEASUREMENT_ID,
			}),
		],
	});

	analytics.page();
}

export default analytics;
