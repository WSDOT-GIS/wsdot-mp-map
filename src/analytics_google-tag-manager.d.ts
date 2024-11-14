/**
 * Plugin settings.
 * @property containerId - The Container ID uniquely identifies the GTM Container.
 * @property [dataLayerName=dataLayer] - The optional name for dataLayer-object. Defaults to dataLayer.
 * @property [customScriptSrc] - Load Google Tag Manager script from a custom source
 * @property [preview] - The preview-mode environment
 * @property [auth] - The preview-mode authentication credentials
 * @property [execution] - The script execution mode
 */
interface PluginConfig {
	containerId: string;
	dataLayerName?: string;
	customScriptSrc?: string;
	preview?: string;
	auth?: string;
	execution?: string;
}

declare module "@analytics/google-tag-manager" {
	/**
	 * Google tag manager plugin
	 * @link https://getanalytics.io/plugins/google-tag-manager
	 * @link https://developers.google.com/tag-manager/
	 * @param pluginConfig - Plugin settings
	 * @return Analytics plugin
	 * @example
	 *
	 * googleTagManager({
	 *   containerId: 'GTM-123xyz'
	 * })
	 */
	export default function googleTagManager(pluginConfig: PluginConfig): {
		name: "google-tag-manager";
	};
}
