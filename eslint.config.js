import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores([
        "dist",
        "docs/.vitepress/**",
        "public/mockServiceWorker.js",
    ]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            boundaries,
        },
        settings: {
            "boundaries/elements": [
                { type: "app", pattern: "src/app/**" },
                { type: "pages", pattern: "src/pages/**" },
                { type: "widgets", pattern: "src/widgets/**" },
                { type: "features", pattern: "src/features/**" },
                { type: "entities", pattern: "src/entities/**" },
                { type: "shared", pattern: "src/shared/**" },
            ],
        },
        rules: {
            "boundaries/element-types": [
                "error",
                {
                    default: "disallow",
                    rules: [
                        {
                            from: "app",
                            allow: [
                                "pages",
                                "widgets",
                                "features",
                                "entities",
                                "shared",
                            ],
                        },
                        {
                            from: "pages",
                            allow: [
                                "widgets",
                                "features",
                                "entities",
                                "shared",
                            ],
                        },
                        {
                            from: "widgets",
                            allow: ["features", "entities", "shared"],
                        },
                        {
                            from: "features",
                            allow: ["features", "entities", "shared"],
                        },
                        { from: "entities", allow: ["entities", "shared"] },
                        { from: "shared", allow: ["shared"] },
                    ],
                },
            ],
        },
    },
    {
        files: ["**/*.test.{ts,tsx}"],
        rules: {
            "boundaries/element-types": "off",
        },
    },
]);
