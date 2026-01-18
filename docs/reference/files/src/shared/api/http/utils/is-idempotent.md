# src/shared/api/http/utils/is-idempotent.ts

## Propósito

- Determinar si un método HTTP es idempotente para decidir si se puede reintentar.
- Mantener esta lógica aislada para reutilizarla en políticas de retry.

## Responsabilidades

- Normalizar el nombre del método y devolver `true` solo para `GET`, `HEAD`, `OPTIONS`.

## Exportaciones clave

- `isIdempotentMethod(method: string): boolean`

## Uso en la aplicación

- `src/shared/api/http/retry/retry-policy.ts` lo usa para permitir reintentos solo en métodos seguros.

## Guía de modificación

- Agrega métodos aquí solo si el backend garantiza idempotencia (p. ej. `PUT` en APIs específicas).
- Cuándo NO modificar este archivo: no incluyas métodos que puedan escribir estado; rompería la seguridad de reintentos.

## Errores comunes / Riesgos

- Incluir `POST` o `PATCH` provocaría duplicación de operaciones en reintentos.

## Ejemplo de uso

- Al evaluar un 503 de un `GET /orders`, `shouldRetry` consulta esta función para decidir que es seguro reintentar.

## Snippets

```ts
export function isIdempotentMethod(method: string): boolean {
    const m = (method || "").toUpperCase();
    return m == "GET" || m == "HEAD" || m == "OPTIONS";
}
```

## Related

- [`src/shared/api/http/retry/retry-policy.ts`](/reference/files/src/shared/api/http/retry/retry-policy)
