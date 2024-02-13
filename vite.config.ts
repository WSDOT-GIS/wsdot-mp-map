/// <reference types="vitest" />
import browserslistToEsbuild from "browserslist-to-esbuild";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "spa",
  base: "/data/tools/LocateMP",
  build: {
    target: browserslistToEsbuild(),
  },
  test: {
    environment: "jsdom",
    reporters: ["default", "junit"],
    outputFile: {
      junit: "./test-results/test-results.xml",
    },
    coverage: {
      enabled: true,
      exclude: ["**/node_modules/**", "**/dist/**", "**/main.ts"],
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
