import { defineConfig } from "vitepress";

export default defineConfig({
    lang: "es",
    title: "Frontend FSD Template",
    description:
        "Template React + Vite + FSD con Axios, TanStack Query/Router, Zod, MSW y Vitest.",
    cleanUrls: true,
    themeConfig: {
        nav: [
            { text: "Guía", link: "/guide/getting-started" },
            { text: "Referencia", link: "/reference/file-map" },
            {
                text: "Repo",
                link: "https://github.com/ponche/frontend-fsd-architecture",
            },
        ],
        sidebar: {
            "/guide/": [
                {
                    text: "Guía",
                    items: [
                        {
                            text: "Introducción",
                            link: "/guide/getting-started",
                        },
                        {
                            text: "Arquitectura FSD",
                            link: "/guide/architecture-fsd",
                        },
                        {
                            text: "Cómo crecer",
                            link: "/guide/growing-the-template",
                        },
                        {
                            text: "Router y Guards",
                            link: "/guide/router-and-guards",
                        },
                        { text: "Auth", link: "/guide/auth" },
                        { text: "HTTP Client", link: "/guide/http-client" },
                        {
                            text: "UI",
                            items: [
                                { text: "Catálogo UI", link: "/guide/ui/" },
                                { text: "Tema", link: "/guide/ui/theme" },
                                { text: "Button", link: "/guide/ui/button" },
                                {
                                    text: "Container",
                                    link: "/guide/ui/container",
                                },
                                { text: "Stack", link: "/guide/ui/stack" },
                                { text: "Alert", link: "/guide/ui/alert" },
                            ],
                        },
                        { text: "Testing", link: "/guide/testing" },
                        { text: "MSW en Dev", link: "/guide/msw-dev" },
                    ],
                },
            ],
            "/reference/": [
                {
                    text: "Referencia",
                    items: [
                        {
                            text: "Mapa de archivos",
                            link: "/reference/file-map",
                        },
                        {
                            text: "API pública",
                            link: "/reference/api-reference",
                        },
                        {
                            text: "Configuración",
                            link: "/reference/configuration",
                        },
                        {
                            text: "Troubleshooting",
                            link: "/reference/troubleshooting",
                        },
                    ],
                },
            ],
        },
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/ponche/frontend-fsd-architecture",
            },
        ],
        footer: {
            message:
                "React + Vite + FSD + TanStack Query/Router + MSW + Vitest",
        },
    },
});
