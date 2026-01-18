# Autenticación

## Piezas

- Servicio: `src/features/auth/api/auth.service.ts` (signIn, me, signOut, refresh).
- Schemas: `src/features/auth/api/auth.schemas.ts` (Zod DTOs).
- Dominio: `src/entities/user/*` (types + mapper).
- Hooks/queries: `src/features/auth/model/auth.queries.ts` (exportados desde `@/features/auth`).
- Provider: `src/features/auth/model/auth.provider.tsx` expone `useAuth` (importa desde `@/features/auth`).
- Guards: `src/features/auth/model/guards.ts` para TanStack Router (importa desde `@/features/auth`).
- Bridge de eventos: `src/features/auth/model/auth.events-bridge.ts` conecta eventos HTTP con cache Query.

## Flujos

### Login

1. `signInMutation` → `authService.signIn(body)` valida con Zod y guarda token en memory store.
2. Invalida `authKeys.me` para refetchear.

### Me

- `useMeQuery` llama `authService.me` → `httpz.get` → schema DTO → mapper a dominio User.
- Status del provider: `loading`/`authenticated`/`anonymous` según `me`.

### Refresh (single-flight)

- Interceptor de response (`shared/api/http/interceptors/response.interceptor.ts`):
    - Si 401 y no se ha reintentado, llama `refreshSession` (usa axios dedicado, no reutiliza token).
    - `refreshSession` (`shared/api/http/auth/refresh.ts`) mantiene una única promesa global; descarta tokens inválidos y emite `unauthorized` si falla.
    - Tras refresh, reinyecta el nuevo Bearer y reintenta la request original.

### Logout

- `authService.signOut` llama endpoint, pero siempre limpia token-store en `finally`.
- Event bridge escucha `signed_out`/`unauthorized` y limpia cache `me`.

## Cómo usar `useAuth`

```ts
import { useAuth } from "@/features/auth";

const { user, status, signIn, signOut, hasPermission, isAdmin } = useAuth();
```

## Evitar loops

- No hagas `authService.me` en loops; usa `useMeQuery` o guards.
- Retry está desactivado en React Query para `me` (controlado en axios).
- Los interceptores no reintentan 401 si el refresh falla → emite `unauthorized` y limpia cache.

## Dónde se monta `AuthProvider`

- Globalmente ya no se monta en rutas públicas para evitar `/auth/me` anónimo.
- Se monta en `UserLayout` y `AdminLayout` (rutas protegidas) con bootstrap normal.
- `LoginPage` usa `<AuthProvider bootstrap={false}>` para acceder a `signIn` sin disparar `/auth/me`.
- Si necesitas usar `useAuth` en una ruta pública, envuelve el componente con `AuthProvider` y `bootstrap={false}` (no hace fetch inicial).

## Extender roles/permisos

- Define nuevos literales en `entities/user/model/types.ts` y en mocks si aplica (y expórtalos vía `entities/user` si quieres uso externo).
- Acepta `roles` array en DTO: el mapper ya soporta `roles[]` opcional y prioriza `role` primario.
