// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import jsdoc from "eslint-plugin-jsdoc";

// TODO: Figure out how to exclude the "./coverage" folder.
// Eslint keeps scanning coverage folder for some reason.

export default tseslint.config(
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts"],
    ignores: ["vite.config.ts"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      jsdoc,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      jsdoc.configs["flat/recommended-typescript"],
      eslintConfigPrettier,
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "jsdoc/require-jsdoc": [
        "warn",
        {
          enableFixer: false,
          publicOnly: true,
        },
      ],
      "@typescript-eslint/no-unnecessary-condition": "warn",
    },
  },
  {
    files: ["**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // turn off other type-aware rules
      "deprecation/deprecation": "off",
      "@typescript-eslint/internal/no-poorly-typed-ts-props": "off",

      // turn off rules that don't apply to JS code
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  }
);
