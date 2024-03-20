/* eslint-env node */

/**
 * @type {import("eslint").ESLint.ConfigData}
 */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:sonarjs/recommended",
    "plugin:jsdoc/recommended-typescript",
    "prettier",
  ],
  ignorePatterns: [
    "*.cjs",
    "*.mjs",
    "*.js",
    "*.d.ts",
    "vite.config.ts",
    "*.test.ts",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json"],
  },
  plugins: ["@typescript-eslint", "sonarjs", "jsdoc"],
  root: true,
  rules: {
    "require-await": "error",
    "no-return-await": "warn",
    "sonarjs/no-duplicate-string": "warn",
    "jsdoc/require-jsdoc": [
      "warn",
      {
        enableFixer: false,
      },
    ],
  },
};
