# src/shared/api/http/retry/retry.interceptor.ts

## Propósito

- Interceptor de Axios que reintenta peticiones fallidas según política y backoff.

## Responsabilidades

- Normalizar errores, evaluar la política de retry, esperar con backoff exponencial + jitter y reemitir la request.

## Exportaciones clave

- `createRetryInterceptor({ client, maxAttempts?, baseDelayMs?, capDelayMs? })`

## Uso en la aplicación

- Se registra en `src/shared/api/http/client.ts` antes del interceptor de response.

## Guía de modificación

- Ajusta `maxAttempts`, `baseDelayMs` o `capDelayMs` para alinearlos con los SLAs del backend.
- Si cambias la elegibilidad de retry, actualiza `shouldRetry` en `retry-policy.ts`.
- Mantén `_retryAttempt` en el config para contar intentos.
- Cuándo NO modificar este archivo: si un endpoint no debe reintentarse, exclúyelo vía política, no eliminando el interceptor global.

## Errores comunes / Riesgos

- Solo se reintentan métodos idempotentes; habilitar otros puede duplicar efectos de escritura.
- Olvidar retornar la promesa de `args.client.request` rompe la cadena de Axios.

## Ejemplo de uso

- Un `GET /orders` que devuelve 503 será reintentado hasta 3 veces con backoff calculado en `getBackoffMs`.

## Snippets

```ts
const attempt = (config._retryAttempt ?? 0) + 1;
config._retryAttempt = attempt;

const decision = shouldRetry({
    error: normalized,
    method: config.method,
    attempt,
    maxAttempts,
});
```

## Related

- [`src/shared/api/http/retry/retry-policy.ts`](/reference/files/src/shared/api/http/retry/retry-policy)
- [`src/shared/api/http/retry/backoff.ts`](/reference/files/src/shared/api/http/retry/backoff)
