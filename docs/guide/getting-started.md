# Getting Started

## Requisitos
- Node.js 20+ y pnpm.
- No olvides habilitar HTTPS/local si tu API lo requiere (el mock ya usa `https://localhost:3000` por defecto).

## Instalación
```bash
pnpm install
```
> Nota: VitePress ya está declarado como devDependency. Si lo necesitas en otro repo, instala con `pnpm add -D vitepress`.

## Scripts
- `pnpm dev` — Vite en modo dev.
- `pnpm build` — build + type-check.
- `pnpm test` — Vitest con MSW (jsdom).
- `pnpm docs:dev` — VitePress en modo docs.
- `pnpm docs:build` — build estático de docs.
- `pnpm docs:preview` — preview de los docs.

## Variables de entorno
- Edita `.env` o `.env.local`. Validación en `src/shared/api/config/env.ts`.
- Claves principales:
  - `VITE_API_BASE_URL` (default `https://localhost:3000`)
  - `VITE_API_TIMEOUT_MS` (default `15000`)
  - `VITE_API_DEBUG` (`true/false`)
  - `VITE_MSW` (`true` para habilitar mock en dev)

## Arrancar con MSW en dev
1) Asegúrate de tener `VITE_MSW=true` en `.env`.
2) `pnpm dev`.
3) El worker se levanta en `src/main.tsx` vía `initMSW`.

## Deploy de docs a GitHub Pages (manual)
1) `pnpm docs:build` → genera `.vitepress/dist`.
2) Publica el contenido de `docs/.vitepress/dist` en la rama `gh-pages` (ej. `git subtree push` o acción CI).
3) Configura Pages en GitHub apuntando a esa rama/carpeta. Ajusta `base` en `docs/.vitepress/config.ts` si usas subcarpeta.

## Qué viene listo
- Routing: rutas `/`, `/login`, `/forbidden`, `/private`, `/admin`.
- Auth: login/password con roles (user/admin) y permisos mockeados.
- HTTP: axios + retry/backoff + refresh (401) + normalización de errores.
- Testing: MSW + Vitest con prueba de refresh incluida.
