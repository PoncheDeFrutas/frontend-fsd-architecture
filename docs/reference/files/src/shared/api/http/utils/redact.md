# src/shared/api/http/utils/redact.ts

## Propósito

- Enmascarar headers sensibles antes de registrarlos en logs de depuración.
- Aislar la lista de claves sensibles para que sea fácil de mantener.

## Responsabilidades

- Detectar claves sensibles y reemplazar su valor por `[REDACTED]`.
- Devolver un nuevo objeto sin mutar el original.

## Exportaciones clave

- `redactHeaders(headers): Record<string, unknown> | undefined`

## Uso en la aplicación

- `src/shared/api/http/interceptors/request.interceptor.ts` lo usa cuando `API_DEBUG` está activo para loguear headers de forma segura.

## Guía de modificación

- Ajusta `SENSITIVE_KEYS` según políticas de seguridad del backend.
- Cuándo NO modificar este archivo: si el problema es un log mal ubicado, elimina el log en vez de tocar el redactor.

## Errores comunes / Riesgos

- Olvidar agregar una clave sensible puede exponer tokens en consola.
- Las claves se comparan en minúsculas; agrega nuevas entradas en minúscula.

## Ejemplo de uso

- En modo debug, antes de loguear una petición con cookies, `redactHeaders` reemplaza `cookie` y `authorization` por `[REDACTED]`.

## Snippets

```ts
const SENSITIVE_KEYS = new Set([
    "authorization",
    "cookie",
    "set-cookie",
    "x-csrf-token",
    "x-xsrf-token",
]);
```

## Related

- [`src/shared/api/http/interceptors/request.interceptor.ts`](/reference/files/src/shared/api/http/interceptors/request.interceptor)
