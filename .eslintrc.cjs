/* eslint-env node */

/**
 * @type {import("eslint").ESLint.ConfigData}
 */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "prettier",
  ],
  ignorePatterns: ["*.cjs", "*.js", "*.d.ts", "vite.config.ts", "*.test.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "require-await": "error",
    "no-return-await": "warn",
  },
};
