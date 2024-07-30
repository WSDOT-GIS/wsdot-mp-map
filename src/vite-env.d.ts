/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_WEBMAP_API_KEY: string;
	readonly VITE_WEBMAP_PORTAL_URL: string;
	readonly VITE_WEBMAP_PORTAL_ITEM_ID: string;
	readonly VITE_ZOOM_SCALE: `${number}`;
	readonly VITE_TITLE: string;
	readonly VITE_HEADER_TITLE: string;
	readonly VITE_WIDTH_THRESHOLD_IN_PIXELS: `${number}`;
	readonly VITE_GOOGLE_MEASUREMENT_ID: string;

  readonly VITE_TITLE: string;
  readonly VITE_MP_SEARCH_RADIUS: string;
  readonly VITE_MP_SEARCH_RADIUS_UNITS: NonNullable<
    Exclude<__esri.QueryProperties["units"], "us-nautical-miles">
  >;
  readonly VITE_ALL_STATE_ROUTE_POINTS_URL: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
