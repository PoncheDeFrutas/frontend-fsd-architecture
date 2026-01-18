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
                            text: "Archivos",
                            items: [
                                {
                                    text: "Índice",
                                    link: "/reference/file-reference",
                                },
                                {
                                    text: "App / providers",
                                    items: [
                                        {
                                            text: "app/providers/index.tsx",
                                            link: "/reference/files/src/app/providers/index",
                                        },
                                        {
                                            text: "query-client/index.ts",
                                            link: "/reference/files/src/app/providers/query-client/index",
                                        },
                                        {
                                            text: "query-client/query-client.ts",
                                            link: "/reference/files/src/app/providers/query-client/query-client",
                                        },
                                        {
                                            text: "query-client/query-provider.tsx",
                                            link: "/reference/files/src/app/providers/query-client/query-provider",
                                        },
                                        {
                                            text: "msw/init-msw.ts",
                                            link: "/reference/files/src/app/providers/msw/init-msw",
                                        },
                                    ],
                                },
                                {
                                    text: "App / router",
                                    items: [
                                        {
                                            text: "router/index.ts",
                                            link: "/reference/files/src/app/providers/router/index",
                                        },
                                        {
                                            text: "router/router.tsx",
                                            link: "/reference/files/src/app/providers/router/router",
                                        },
                                        {
                                            text: "router/route-tree.tsx",
                                            link: "/reference/files/src/app/providers/router/route-tree",
                                        },
                                        {
                                            text: "router/root-error.tsx",
                                            link: "/reference/files/src/app/providers/router/root-error",
                                        },
                                    ],
                                },
                                {
                                    text: "Shared / API config",
                                    items: [
                                        {
                                            text: "config/env.ts",
                                            link: "/reference/files/src/shared/api/config/env",
                                        },
                                        {
                                            text: "config/endpoints.ts",
                                            link: "/reference/files/src/shared/api/config/endpoints",
                                        },
                                        {
                                            text: "config/index.ts",
                                            link: "/reference/files/src/shared/api/config/index",
                                        },
                                    ],
                                },
                                {
                                    text: "Shared / React Query",
                                    items: [
                                        {
                                            text: "lib/react-query/query-client.ts",
                                            link: "/reference/files/src/shared/lib/react-query/query-client",
                                        },
                                    ],
                                },
                                {
                                    text: "Shared / HTTP (core)",
                                    items: [
                                        {
                                            text: "http/index.ts",
                                            link: "/reference/files/src/shared/api/http/index",
                                        },
                                        {
                                            text: "http/types.ts",
                                            link: "/reference/files/src/shared/api/http/types",
                                        },
                                        {
                                            text: "http/client.ts",
                                            link: "/reference/files/src/shared/api/http/client",
                                        },
                                        {
                                            text: "http/client-helpers.ts",
                                            link: "/reference/files/src/shared/api/http/client-helpers",
                                        },
                                        {
                                            text: "http/zod-helpers.ts",
                                            link: "/reference/files/src/shared/api/http/zod-helpers",
                                        },
                                        {
                                            text: "errors/api-error.ts",
                                            link: "/reference/files/src/shared/api/http/errors/api-error",
                                        },
                                        {
                                            text: "errors/normalize-error.ts",
                                            link: "/reference/files/src/shared/api/http/errors/normalize-error",
                                        },
                                    ],
                                },
                                {
                                    text: "Shared / HTTP (interceptors)",
                                    items: [
                                        {
                                            text: "interceptors/request.interceptor.ts",
                                            link: "/reference/files/src/shared/api/http/interceptors/request.interceptor",
                                        },
                                        {
                                            text: "interceptors/response.interceptor.ts",
                                            link: "/reference/files/src/shared/api/http/interceptors/response.interceptor",
                                        },
                                    ],
                                },
                                {
                                    text: "Shared / HTTP (retry)",
                                    items: [
                                        {
                                            text: "retry/retry.interceptor.ts",
                                            link: "/reference/files/src/shared/api/http/retry/retry.interceptor",
                                        },
                                        {
                                            text: "retry/retry-policy.ts",
                                            link: "/reference/files/src/shared/api/http/retry/retry-policy",
                                        },
                                        {
                                            text: "retry/backoff.ts",
                                            link: "/reference/files/src/shared/api/http/retry/backoff",
                                        },
                                    ],
                                },
                                {
                                    text: "Shared / HTTP (utils)",
                                    items: [
                                        {
                                            text: "utils/is-idempotent.ts",
                                            link: "/reference/files/src/shared/api/http/utils/is-idempotent",
                                        },
                                        {
                                            text: "utils/merge-headers.ts",
                                            link: "/reference/files/src/shared/api/http/utils/merge-headers",
                                        },
                                        {
                                            text: "utils/redact.ts",
                                            link: "/reference/files/src/shared/api/http/utils/redact",
                                        },
                                    ],
                                },
                                {
                                    text: "Shared / HTTP (auth)",
                                    items: [
                                        {
                                            text: "auth/token-store.ts",
                                            link: "/reference/files/src/shared/api/http/auth/token-store",
                                        },
                                        {
                                            text: "auth/auth-events.ts",
                                            link: "/reference/files/src/shared/api/http/auth/auth-events",
                                        },
                                        {
                                            text: "auth/refresh.ts",
                                            link: "/reference/files/src/shared/api/http/auth/refresh",
                                        },
                                    ],
                                },
                                {
                                    text: "Features / auth",
                                    items: [
                                        {
                                            text: "features/auth/index.ts",
                                            link: "/reference/files/src/features/auth/index",
                                        },
                                        {
                                            text: "auth.context.ts",
                                            link: "/reference/files/src/features/auth/model/auth.context",
                                        },
                                        {
                                            text: "auth.keys.ts",
                                            link: "/reference/files/src/features/auth/model/auth.keys",
                                        },
                                        {
                                            text: "auth.provider.tsx",
                                            link: "/reference/files/src/features/auth/model/auth.provider",
                                        },
                                        {
                                            text: "auth.queries.ts",
                                            link: "/reference/files/src/features/auth/model/auth.queries",
                                        },
                                        {
                                            text: "guards.ts",
                                            link: "/reference/files/src/features/auth/model/guards",
                                        },
                                        {
                                            text: "auth.events-bridge.ts",
                                            link: "/reference/files/src/features/auth/model/auth.events-bridge",
                                        },
                                        {
                                            text: "use-auth.ts",
                                            link: "/reference/files/src/features/auth/model/use-auth",
                                        },
                                    ],
                                },
                            ],
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
