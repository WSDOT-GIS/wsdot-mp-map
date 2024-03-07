/// <reference types="vite/client" />
/// <reference types="vitest" />
import browserslistToEsbuild from "browserslist-to-esbuild";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "spa",
  base: "/data/tools/LocateMP",
  resolve: {
    extensions: [".ts", ".js", ".css", ".json"],
  },
  build: {
    // This sets the target based on the `browserslist` file.
    target: browserslistToEsbuild(),
  },
  test: {
    name: "LocateMP",
    environment: "jsdom",
    reporters: ["default", "junit"],
    outputFile: {
      junit: "./test-results/test-results.xml",
    },
    coverage: {
      enabled: true,
      extension: [
        // '.js',
        // '.cjs',
        // '.mjs',
        // ".jsx",
        ".ts",
        ".tsx",
        // ".vue",
        // ".svelte",
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
