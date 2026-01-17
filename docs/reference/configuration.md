# Configuración

## Variables de entorno (`src/shared/api/config/env.ts`)
- `VITE_API_BASE_URL` — default `https://localhost:3000`.
- `VITE_API_TIMEOUT_MS` — default `15000`.
- `VITE_API_DEBUG` — default `false` (activa logging seguro en request interceptor).
- `VITE_MSW` — no se valida aquí, pero `initMSW` lo usa para habilitar el worker en dev.

## Endpoints (`src/shared/api/config/endpoints.ts`)
- Auth:
  - `ENDPOINTS.auth.signIn = "/auth/sign-in"`
  - `ENDPOINTS.auth.me = "/auth/me"`
  - `ENDPOINTS.auth.refresh = "/auth/refresh"`
  - `ENDPOINTS.auth.signOut = "/auth/sign-out"`
- Añade más nombrespaced por dominio (ej. `products`, `orders`).

## Axios Client (`src/shared/api/http/client.ts`)
- `baseURL`, `timeout`, `withCredentials: true`, headers `Accept: application/json`.
- Request interceptor añade Bearer si hay token.
- Response interceptors: retry + refresh + normalización de errores.

## React Query (`src/app/providers/query-client/query-client.ts`)
- `retry: false` en queries/mutations (resiliencia se maneja en axios).
- `refetchOnWindowFocus: false`.
- `staleTime` configurable por query (ej. `me` usa 60s).

## Router (`src/app/providers/router/route-tree.tsx`)
- Rutas base y guards. Cambia aquí para nuevas rutas.
