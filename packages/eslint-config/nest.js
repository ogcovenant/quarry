import globals from "globals";
import tseslint from "typescript-eslint";
import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for NestJS applications.
 *
 * @param {string} tsconfigRootDir
 * @type {(tsconfigRootDir: string) => import("eslint").Linter.Config[]}
 * */
export const nestConfig = (tsconfigRootDir) => [
  {
    ignores: ["eslint.config.mjs"],
  },
  ...baseConfig,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
    },
  },
];
