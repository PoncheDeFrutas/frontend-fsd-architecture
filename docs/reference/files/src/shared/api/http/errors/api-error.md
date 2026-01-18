# src/shared/api/http/errors/api-error.ts

## Propósito

- Clase de error custom para fallos de API normalizados.

## Responsabilidades

- Capturar status/código HTTP, detalles, metadata de la request y el kind.
- Proveer helpers (`fromPayload`, `isUnauthorized`, `isForbidden`, `isRetryable`).

## Exportaciones clave

- Clase `ApiError` con getters.

## Uso en la aplicación

- Lanzada por `normalizeError` y por fallas de parseo en `httpz`.
- Leída en `src/features/auth/model/auth.provider.tsx` para tratar 401 como anónimo.
- Usada en `src/features/auth/model/guards.ts` para ignorar 401.
- Pruebas (`src/features/orders/api/orders.service.test.ts`) asertan sobre `ApiError`.

## Guía de modificación

- Extiende `isRetryable` si el backend introduce más estados transitorios.
- Agrega metadata si el backend la expone (configura también `fromPayload`).
- Cuándo NO modificar este archivo: no cambies los getters sin alinear la política de retry y los consumidores.

## Errores comunes / Riesgos

- El constructor acepta `cause`; evita loggear objetos sensibles.
- `isRetryable` cubre network/timeout/429/502/503/504; si cambias la lista, ajusta la política de retry.

## Snippets

```ts
static fromPayload(args: {
    kind: ApiErrorKind;
    status?: number;
    payload: ApiErrorPayload;
    fallbackMessage?: string;
    url?: string;
    method?: string;
    requestId?: string;
    cause?: unknown;
}): ApiError {
    const message =
        args.payload.message ??
        args.fallbackMessage ??
        "An unknown error occurred";
    return new ApiError({
        kind: args.kind,
        message,
        status: args.status,
        code: args.payload.code,
        details: args.payload.details,
        url: args.url,
        method: args.method,
        requestId: args.requestId,
        cause: args.cause,
    });
}
```

## Related

- [`src/shared/api/http/errors/normalize-error.ts`](/reference/files/src/shared/api/http/errors/normalize-error)
- [`src/shared/api/http/retry/retry-policy.ts`](/reference/files/src/shared/api/http/retry/retry-policy)
