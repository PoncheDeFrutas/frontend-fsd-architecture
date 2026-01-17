# Frontend FSD Architecture

Template React 19 + Vite 7 + TypeScript organizado con Feature-Sliced Design. Incluye Axios con infraestructura avanzada (retry/backoff, refresh single-flight, normalización de errores), TanStack Query/Router, Zod, MSW y Vitest.

## Quick start

```bash
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev` — Vite dev server.
- `pnpm build` — type-check + build.
- `pnpm test` — Vitest con MSW.
- `pnpm docs:dev` / `docs:build` / `docs:preview` — documentación VitePress.
- `pnpm format` — Prettier (4 espacios).

## Demo vertical slice

- Ruta protegida `/orders` (TanStack Router + guard `requirePermission("orders:read")`).
- Datos mock con MSW y React Query.
- Tests de integración en `src/features/orders/api/orders.service.test.ts`.

## MSW en desarrollo

- Activa con `VITE_MSW=true` en `.env` y ejecuta `pnpm dev`.
- El worker se inicializa en `src/main.tsx` vía `initMSW`.

## Calidad y CI

- Hooks: ejecuta `pnpm prepare` tras clonar para activar Husky. `pre-commit` corre `pnpm lint-staged`; `pre-push` corre `pnpm test:run && pnpm build` (usa `SKIP_PREPUSH=1` si necesitas saltarlo).
- Lint staged: `lint-staged.config.mjs` formatea con Prettier y aplica `eslint --fix` a TS/JS.
- CI: `.github/workflows/ci.yml` corre `pnpm lint`, `pnpm test:run`, `pnpm build` en push/PR (Node 20 + pnpm 10).
- Arquitectura FSD: eslint-plugin-boundaries impide dependencias ascendentes (p.ej. `features/*` no puede importar `app/*`). Ajusta rutas/alias en `eslint.config.js` si mueves carpetas.

## Documentación

- Sitio de docs: `pnpm docs:dev` (VitePress en `/docs`).
- Entradas clave:
    - Guía de inicio: `docs/guide/getting-started.md`
    - Arquitectura FSD: `docs/guide/architecture-fsd.md`
    - HTTP client + retry/refresh: `docs/guide/http-client.md`
    - Auth + guards: `docs/guide/auth.md`, `docs/guide/router-and-guards.md`
    - Testing + MSW: `docs/guide/testing.md`, `docs/guide/msw-dev.md`
    - Mapa de archivos: `docs/reference/file-map.md`

## Cómo extender (ejemplo rápido)

- Nueva entidad: define dominio + DTO Zod + mapper en `src/entities/<entity>/`.
- Nueva feature: crea servicio en `src/features/<feature>/api/` usando `httpz`, hooks en `model/` y UI en `ui/` o `pages/`.
- Agrega ruta en `src/app/providers/router/route-tree.tsx` y protege con `requireRole/requirePermission`.
  Consulta recetas detalladas en `docs/guide/growing-the-template.md`.
