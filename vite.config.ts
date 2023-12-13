/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  appType: "spa",
  base: "/wsdot-mp-map",
  esbuild: {
    /**
     * Prevents ESBuild to throw when using a feature not supported by the
     * list of supported browsers coming from the `browserslist` file.
     */
    supported: {
      "top-level-await": true,
    },
  },
  test: {
    environment: "jsdom",
    coverage: {
      enabled: true,
      extension: [
        // '.js',
        // '.cjs',
        // '.mjs',
        // ".jsx",
        ".ts",
        ".tsx",
        ".vue",
        ".svelte",
      ],
      reporter: [
        // Defaults
        "text",
        "html",
        "clover",
        "json",
        // Added
        "lcov",
        "cobertura",
      ],
    },
  },
});
