import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base config for all JavaScript files
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    languageOptions: { 
      globals: {...globals.browser, ...globals.node},
      ecmaVersion: 2022,
      sourceType: "module"
    },
    rules: {
      // Common rules for your project
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"]
    }
  },
  
  // Special config for Eleventy files
  {
    files: ["eleventy.config.js", "src/_data/**/*.js", "src/_scripts/**/*.js", "src/assets/js/*.js"],
    rules: {
      // Any specific overrides for Eleventy files
    }
  },
  
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: ["node_modules/**", "dist/**", ".cache/**"]
  }
]);
