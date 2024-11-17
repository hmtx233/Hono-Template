/** @notice library imports */
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  /// Recommendations
  eslintConfigPrettier,
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  /// Ignore files
  {
    ignores: [
      "dist",
      "node_modules",
      "eslint.config.mjs",
      "commitlint.config.ts",
    ],
  },

  /// Type information
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  /// Rules
  {
    rules: {
      "no-console": "error"
    },
  },
);
