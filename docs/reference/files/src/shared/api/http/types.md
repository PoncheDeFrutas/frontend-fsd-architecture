# src/shared/api/http/types.ts

## Propósito

- Definir tipos compartidos para errores HTTP.

## Responsabilidades

- Describir la forma del payload de error y la taxonomía de tipos de error.

## Exportaciones clave

- `ApiErrorPayload`
- `ApiErrorKind` (`"http" | "network" | "timeout" | "canceled" | "unknown"`)

## Uso en la aplicación

- `ApiError` consume estos tipos para normalizar errores.
- `normalizeError` construye instancias de `ApiError` con estos kinds.

## Guía de modificación

- Extiende `ApiErrorKind` solo si el cliente debe distinguir más casos (ej. `"validation"`).
- Mantén `ApiErrorPayload` alineado con la respuesta de error del backend.
- Cuándo NO modificar este archivo: no agregues campos que el backend no devuelve; romperías la normalización.

## Errores comunes / Riesgos

- Cambiar los kinds sin ajustar `ApiError.isRetryable` y la política de retry puede generar reintentos incorrectos.

## Snippets

```ts
export type ApiErrorKind =
    | "http"
    | "network"
    | "timeout"
    | "canceled"
    | "unknown";
```

## Related

- [`src/shared/api/http/errors/api-error.ts`](/reference/files/src/shared/api/http/errors/api-error)
- [`src/shared/api/http/errors/normalize-error.ts`](/reference/files/src/shared/api/http/errors/normalize-error)
