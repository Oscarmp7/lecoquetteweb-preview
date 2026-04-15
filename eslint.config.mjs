import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "output/**",
      "node_modules/**",
      ".playwright-mcp/**",
      "brandbook-assets/**",
      "docs/plans/**",
      "fix-mobile.js",
      "rewrite-button.js",
      "postcss.config.mjs",
    ],
  },
];

export default config;
