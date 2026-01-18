# src/shared/api/http/client.ts

## Propósito

- Crear y configurar la instancia de Axios usada en toda la app.

## Responsabilidades

- Definir base URL, timeout, credenciales y headers por defecto.
- Adjuntar los interceptores de request, retry y response.
- Exponer el singleton `httpClient`.

## Exportaciones clave

- `createHttpClient()`: fábrica que devuelve un `AxiosInstance` configurado.
- `httpClient`: instancia singleton.

## Uso en la aplicación

- `src/shared/api/http/index.ts` re-exporta `httpClient`/`createHttpClient`.
- `src/shared/api/http/client-helpers.ts` envuelve esta instancia para devolver `response.data`.
- `src/shared/api/http/http.refresh.test.ts` importa `httpClient` en pruebas de integración.

## Guía de modificación

- Ajusta `baseURL`/`timeout`/`withCredentials` aquí según el backend.
- Tunea los parámetros de retry editando la llamada a `createRetryInterceptor`.
- Mantén el orden de interceptores (request → retry → response).
- Cuándo NO modificar este archivo: si necesitas un cliente aislado para un flujo, crea uno dedicado en otro módulo; no cambies el singleton.

## Errores comunes / Riesgos

- Crear múltiples instancias fragmenta interceptores y caches de Axios.
- Cambiar configuración sin actualizar `ENV` puede dejar variables inconsistentes.

## Snippets

```ts
const client = axios.create({
    baseURL: ENV.API_BASE_URL,
    timeout: ENV.API_TIMEOUT_MS,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});
```

```ts
client.interceptors.response.use(
    (res) => res,
    createRetryInterceptor({
        client,
        maxAttempts: 3,
        baseDelayMs: 250,
        capDelayMs: 4000,
    }),
);
```

## Related

- [`src/shared/api/http/interceptors/request.interceptor.ts`](/reference/files/src/shared/api/http/interceptors/request.interceptor)
- [`src/shared/api/http/retry/retry.interceptor.ts`](/reference/files/src/shared/api/http/retry/retry.interceptor)
