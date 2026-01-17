# API pública

## HTTP Helpers (`@/shared/api/http`)

- `http` — { get, post, put, patch, delete, request } devuelven `data` tipado.
- `httpz` — mismas firmas pero valida respuesta con Zod (`httpz.get(schema, url)`).
- Tipos: `ApiError` con `kind` (`http|network|timeout|canceled|unknown`), `status`, `code`, `details`.
- Token-store: `getAccessToken`, `setAccessToken`, `clearAccessToken`, `onAccessTokenChange`.
- Eventos: `onAuthEvent`, `notifyUnauthorized/Forbidden/SignedOut`.

## Auth Service (`@/features/auth`)

- `signIn(body: SignInBody, signal?) => Promise<TokenResponse>` — valida credenciales con Zod, guarda token.
- `me(signal?) => Promise<{ user: User }>` — usa mapper DTO→User.
- `signOut(signal?) => Promise<void>` — llama endpoint y limpia token.
- `refresh(signal?) => Promise<TokenResponse>` — refresh manual (automático vive en interceptor).

## Hooks (`@/features/auth`)

- `useAuth()` — devuelve `{ status, user, signIn, signOut, isAdmin, hasPermission, meQuery }`.
- `useMeQuery()` — React Query para `/me`.
- `useSignInMutation()` / `useSignOutMutation()` — mutaciones que invalidan/remueven cache.

## Guards (`@/features/auth`)

- `requireAuth()` — redirect `/login`.
- `requireRole(role)` — redirect `/login` o `/forbidden`.
- `requirePermission(permission)` — redirect `/login` o `/forbidden`.

## Config

- `ENV` (`shared/api/config/env.ts`) — `API_BASE_URL`, `API_TIMEOUT_MS`, `API_DEBUG`.
- `ENDPOINTS` (`shared/api/config/endpoints.ts`) — rutas de backend (auth + las que agregues).
- Barrel de config (`@/shared/api/config`) expone ambos.
