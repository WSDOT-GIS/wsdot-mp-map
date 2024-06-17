/// <reference types="vite/client" />
/// <reference types="vitest" />
import browserslistToEsbuild from "browserslist-to-esbuild";
import type { ExternalOption } from "rollup";
import { defineConfig, type PluginOption } from "vite";
import checker from "vite-plugin-checker";

type ExternalFunction = Exclude<ExternalOption, string | RegExp | unknown[]>;

/**
 * Matches l18n files with a language code in the form of `en_US` or `en_GB`, or `zh-Hans` or `zh-Hant`.
 */
const languageRe = /^(?<lang>[a-z]{2})_(?<region>([A-Z]{2})|([a-zA-Z]{4}))/;

/**
 * Determines if the module name is for a non-English language using
 * {@link languageRe}.
 * @param name - module name
 * @returns true if the module name is for a non-English language,
 * false otherwise.
 */
function isNonEnglishLanguage(name: string) {
  // If the filename matches the language pattern, check if it's not English.
  const langMatch = languageRe.exec(name);
  if (langMatch?.groups) {
    const { lang, region } = langMatch.groups;
    console.log(
      // Log the filename and the language it matches.
      `${name} is a language: ${lang}-${region}.`,
    );
    // If the language doesn't match English, add it to the delete list.
    if (langMatch.groups.lang !== "en") {
      console.log(`Excluding non-English language "${name}".`);
      return true;
    }
  }
  return false;
}

/**
 * Specifies which modules can be excluded.
 * @see {@link https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/building-in-vite-includes-unnecessary-files/m-p/1237759|"Building in vite includes unnecessary files" on _Esri Community_}
 */
const external: ExternalFunction = (id, _parentId, _isResolved) => {
  if (!/\bnode_modules([/\\])@arcgis\1core\b/i.test(id)) {
    return false;
  }

  /**
   * A list of regular expressions. If an id
   * matches any of these, it will be skipped.
   */
  const toSkip = [
    /BingMaps/i,
    /GeoJSON/i,
    /GeoRSS/i,
    /integratedMeshLayer/i,
    /KML/i,
    // /KnowledgeGraph/i,
    // /OGCFeature/i,
    /OpenStreetMap/i,
    // /Oriented/i,
    /PointCloud/i,
    /RouteLayer/i,
    /sphere/i,
    // /StreamLayer/i,
    /Video/i,
    /Voxel/i,
    /WFS/i,
    /WMT?SLayer/i,
  ];
  const shouldSkip =
    isNonEnglishLanguage(id) ||
    toSkip.some((re) => {
      const match = re.exec(id);
      if (!match) {
        return false;
      }

      return true;
    });

  return shouldSkip;
};

export default defineConfig((env) => {
  const plugins: PluginOption[] = [];
  if (env.mode !== "test") {
    plugins.push(
      checker({
        typescript: true,
        eslint: {
          lintCommand: "eslint ./src/**/*.{ts,tsx}",
          useFlatConfig: true,
        },
      }),
    );
  }

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
      },
      sourcemap: env.command === "serve",
    },
    plugins: plugins,
    test: {
      name: "LocateMP",
      environment: "jsdom",
      setupFiles: "./tests/mocks-setup.ts",
      reporters: ["default", "junit"],
      outputFile: {
        junit: "./test-results/test-results.xml",
      },
      coverage: {
        enabled: false,
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
