# src/shared/api/http/interceptors/response.interceptor.ts

## Propósito

- Gestionar errores de respuesta HTTP: notificar 403, refrescar + reintentar en 401 y propagar errores normalizados.
- Servir como capa de recuperación de sesión sin mezclar lógica de negocio.

## Responsabilidades

- Normalizar errores con `normalizeError`.
- Emitir `notifyForbidden` en 403.
- Intentar un único refresh + retry en 401 usando `refreshSession` y `getAccessToken`.
- Exponer una fábrica (`createResponseInterceptor`) para acoplarla a la instancia de Axios.

## Exportaciones clave

- `responseErrorInterceptor(error)`
- `createResponseInterceptor(axiosInstance)`

## Uso en la aplicación

- Se registra en `src/shared/api/http/client.ts` después del interceptor de retry.
- Depende de `refreshSession` y `getAccessToken` para recuperar la sesión antes de reintentar.

## Guía de modificación

- Ajusta el flujo de refresh editando el manejo de `_retry` si necesitas más/menos intentos.
- Añade ramas por status solo si el backend usa códigos especiales.
- Cuándo NO modificar este archivo: si el token no se actualiza, revisa `token-store` o quién escribe el token; no cambies la señal de retry (`__RETRY_WITH_INSTANCE__`).

## Errores comunes / Riesgos

- Romper la flag `_retry` puede generar loops de refresh.
- No usar `axiosInstance.request` al reintentar evita que corran los demás interceptores.
- `normalizeError` ya convierte errores de Axios; no los envuelvas de nuevo.

## Ejemplo de uso

- Si `GET /orders` responde 401, el interceptor intenta `refreshSession`, actualiza `Authorization` y reintenta una sola vez con la misma instancia.

## Snippets

```ts
if (normalized.status === 401 && config && !config._retry) {
    config._retry = true;
    await refreshSession();
    const token = getAccessToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    const retrySignal = new Error("__RETRY_WITH_INSTANCE__") as Error & {
        config: RetryableConfig;
    };
    retrySignal.config = config;
    throw retrySignal;
}
```

## Related

- [`src/shared/api/http/auth/refresh.ts`](/reference/files/src/shared/api/http/auth/refresh)
- [`src/shared/api/http/errors/normalize-error.ts`](/reference/files/src/shared/api/http/errors/normalize-error)
