# src/shared/api/http/index.ts

## Propósito

- Exponer la API pública de utilitarios HTTP (cliente Axios, helpers, errores y eventos de auth) desde un solo punto.

## Responsabilidades

- Re-exportar helpers HTTP, tipos de error y utilidades de auth.
- Mantener esta capa agnóstica de features.

## Exportaciones clave

- `httpClient`, `createHttpClient`
- `http`, `httpz`
- `ApiError`, `normalizeError`
- Helpers de auth: `getAccessToken`, `setAccessToken`, `clearAccessToken`, `onAccessTokenChange`
- Eventos de auth: `onAuthEvent`, `notifyUnauthorized`, `notifyForbidden`, `notifySignedOut`
- Tipos de `types.ts`

## Uso en la aplicación

- `src/features/auth/api/auth.service.ts` importa `http/httpz` y helpers de token.
- `src/features/orders/api/orders.service.ts` usa `httpz`.
- `src/features/auth/model/auth.provider.tsx` y `guards.ts` usan `ApiError`.
- Pruebas (`src/shared/api/http/http.refresh.test.ts`) importan `httpClient`.

## Guía de modificación

- Re-exporta solo primitivas compartidas y estables; evita utilidades específicas de features.
- Cuándo NO modificar este archivo: no añadas exports de features ni wildcard exports; mantén la superficie controlada.

## Errores comunes / Riesgos

- Exponer código de features aquí rompe las fronteras de FSD.

## Snippets

```ts
export { httpClient, createHttpClient } from "./client";
export { ApiError } from "./errors/api-error";
export { normalizeError } from "./errors/normalize-error";
export { http } from "./client-helpers";
export type { HttpRequestConfig } from "./client-helpers";
```

## Related

- [`src/shared/api/http/client.ts`](/reference/files/src/shared/api/http/client)
- [`src/shared/api/http/auth/token-store.ts`](/reference/files/src/shared/api/http/auth/token-store)
