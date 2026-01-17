import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@app": path.resolve(__dirname, "./src/app"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@entities": path.resolve(__dirname, "./src/entities"),
            "@features": path.resolve(__dirname, "./src/features"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@shared": path.resolve(__dirname, "./src/shared"),
            "@widgets": path.resolve(__dirname, "./src/widgets"),
        },
    },
    test: {
        environment: "jsdom",
        setupFiles: ["./src/shared/mocks/test/setup-msw.ts"],
        globals: true,
        css: true,
    },
});
