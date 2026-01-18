# src/shared/api/http/retry/retry-policy.ts

## Propósito

- Decidir si una petición fallida debe reintentarse.

## Responsabilidades

- Evaluar número de intentos, errores de auth, idempotencia y errores transitorios.

## Exportaciones clave

- `shouldRetry({ error, method, attempt, maxAttempts }): RetryDecision`
- Tipo `RetryDecision`.

## Uso en la aplicación

- Lo consume `createRetryInterceptor` para decidir reintentos.

## Guía de modificación

- Extiende `shouldRetry` para incluir/excluir códigos según evolucione la política del backend.
- Conserva la validación de idempotencia vía `isIdempotentMethod` para proteger operaciones no idempotentes.
- Cuándo NO modificar este archivo: no fuerces reintentos en errores de auth; compiten con la lógica de refresh.

## Errores comunes / Riesgos

- Permitir retries en auth puede generar loops con `refreshSession`.
- Ignorar `maxAttempts` puede causar reintentos ilimitados.

## Ejemplo de uso

- Un 503 en `GET /orders` con `attempt=1` y `maxAttempts=3` devuelve `shouldRetry: true` y motivo `transient error`.

## Snippets

```ts
if (attempt >= maxAttempts) {
    return { shouldRetry: false, reason: "max attempts reached" };
}

if (error.status === 401 || error.status === 403) {
    return { shouldRetry: false, reason: "authentication error" };
}
```

## Related

- [`src/shared/api/http/utils/is-idempotent.ts`](/reference/files/src/shared/api/http/utils/is-idempotent)
- [`src/shared/api/http/retry/retry.interceptor.ts`](/reference/files/src/shared/api/http/retry/retry.interceptor)
