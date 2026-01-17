# Mapa de archivos

## Raíz
- `package.json` — scripts, deps, alias Vite.
- `vite.config.ts` — plugins React/Tailwind, alias, config de tests.
- `tsconfig.*` — paths (`@`, `@features`, etc.).

## app/
- `providers/query-client/*` — QueryClient singleton y provider.
- `providers/router/*` — route tree y router provider.
- `providers/msw/init-msw.ts` — arranque condicional del worker en dev.

## shared/
- `api/config/env.ts` — lectura + validación de env (Zod).
- `api/config/endpoints.ts` — rutas de backend.
- `api/http/*` — cliente axios, interceptores, retry/backoff, refresh, helpers `http/httpz`, `ApiError`, token-store, eventos.
- `mocks/*` — MSW browser/server, handlers, setup de tests.
- `lib/cn.ts` — helper de clases.

## entities/
- `user/index.ts` — API pública del dominio User (types, DTO schemas, mappers).
- `user/model/types.ts` — dominio User, Role, Permission.
- `user/api/user.dto.ts` — DTOs Zod para User/Me.
- `user/api/user.mapper.ts` — mapper DTO→dominio (compatibilidad `roles[]`).

## features/
- `auth/index.ts` — API pública del feature (provider, hooks, guards, keys, servicio).
- `auth/api/auth.schemas.ts` — schemas DTO de auth.
- `auth/api/auth.service.ts` — signIn/me/signOut/refresh (usa httpz + mapper).
- `auth/model/auth.queries.ts` — hooks React Query.
- `auth/model/auth.provider.tsx` — contexto/useAuth.
- `auth/model/guards.ts` — guards para router.
- `auth/model/auth.events-bridge.ts` — escucha eventos HTTP y limpia cache.

## pages/
- `home/login/admin/forbidden/_not-found` — páginas de ejemplo.

## widgets/
- Vacío (espacio para UI reusables).
