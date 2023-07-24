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
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./eslint.tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  root: true,
};
