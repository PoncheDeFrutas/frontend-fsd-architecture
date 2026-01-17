# Frontend FSD Template

Template educativo con React 19 + Vite 7 + TypeScript y arquitectura Feature-Sliced Design. Incluye HTTP client con Axios + refresh/ retry, validación con Zod, enrutado con TanStack Router, datos con TanStack Query, mock server con MSW y tests con Vitest.

## ¿Qué incluye?
- Infra HTTP completa: axios client, interceptores de retry/backoff y refresh single-flight, normalización de errores `ApiError`, helpers `http`/`httpz`.
- Autenticación: servicio + provider + guards (role/permission), integración con Router y React Query.
- Mocking y testing: MSW para dev y Vitest para unit/integration (incluye test de refresh).
- FSD organizada: `app`, `shared`, `entities`, `features`, `pages`, `widgets`.

## ¿Por qué?
- Servir como plantilla de proyectos SaaS/Admin que requieren login, permisos, tests y mocks desde el día 0.
- Demostrar cómo separar infraestructura (`shared`) del dominio (`entities`) y de las features.
- Reducir riesgo: retry controlado en axios, refresh seguro, validación estricta con Zod, guards en router.

## Quick links
- Empezar: [/guide/getting-started](./guide/getting-started)
- Arquitectura: [/guide/architecture-fsd](./guide/architecture-fsd)
- HTTP Client: [/guide/http-client](./guide/http-client)
- Auth: [/guide/auth](./guide/auth)
- Testing + MSW: [/guide/testing](./guide/testing)
- Mapa de archivos: [/reference/file-map](./reference/file-map)
