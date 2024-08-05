/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBMAP_API_KEY: string;
  readonly VITE_WEBMAP_PORTAL_URL: string;
  readonly VITE_WEBMAP_PORTAL_ITEM_ID: string;
  readonly VITE_ZOOM_SCALE: `${number}`;
  readonly VITE_TITLE: string;
  readonly VITE_HEADER_TITLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
