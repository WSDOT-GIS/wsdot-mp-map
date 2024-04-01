/// <reference types="vite/client" />
/// <reference types="vitest" />

import type { ExternalOption } from "rollup";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
// import copy from "rollup-plugin-copy";

// const calciteAssetsDestDir =
//   "node_modules/@esri/calcite-components/dist/calcite/assets/";
// const calciteAssetsSourceDir = "public/";

type ExternalFunction = Exclude<ExternalOption, string | RegExp | unknown[]>;

const external: ExternalFunction = (id, parentId, isResolved) => {
  console.log("external function", { id, parentId, isResolved });
  // TODO: implement logic to skip unwanted @arcgis/core modules.
  return false;
};

export default defineConfig((env) => {
  return {
    appType: "spa",
    base: "/data/tools/LocateMP",
    resolve: {
      extensions: [".ts", ".js", ".css", ".json"],
    },
    build: {
      // This sets the target based on the `browserslist` file.
      target: browserslistToEsbuild(),
      rollupOptions: {
        input: {
          main: "./index.html",
        },
        external,
        // external: [
        //   /BingMaps/i,
        //   /GeoJSON/i,
        //   /GeoRSS/i,
        //   /integratedMeshLayer/i,
        //   /KML/i,
        //   /KnowledgeGraph/i,
        //   /OGCFeature/i,
        //   /OpenStreetMap/i,
        //   /Oriented/i,
        //   /PointCloud/i,
        //   /RouteLayer/i,
        //   /sphere/i,
        //   /StreamLayer/i,
        //   /Video/i,
        //   /Voxel/i,
        //   /WFS/i,
        //   /WMT?SLayer/i,
        // ],
      },
      sourcemap: command === "serve",
    },
    plugins: [
      checker({
        typescript: true,
        eslint: {
          lintCommand: "eslint .",
          useFlatConfig: true,
        },
      }),
      // copy({
      //   targets: [
      //     {
      //       src: calciteAssetsDestDir,
      //       dest: calciteAssetsSourceDir,
      //     },
      //   ],
      // }),
    ],
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
  };
});
