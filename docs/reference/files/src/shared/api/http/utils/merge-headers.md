# src/shared/api/http/utils/merge-headers.ts

## Propósito

- Unificar headers existentes con headers adicionales de forma segura.
- Mantener la lógica de normalización separada del interceptor.

## Responsabilidades

- Aceptar headers en distintos formatos (Axios o record plano) y devolver un record con claves string.
- Preservar headers previos mientras aplica overrides.

## Exportaciones clave

- `mergeHeaders(base, extra): Record<string, string>`

## Uso en la aplicación

- `src/shared/api/http/interceptors/request.interceptor.ts` lo usa para combinar `Accept`, `Authorization` y headers existentes.

## Guía de modificación

- Extiende el soporte a arrays de headers solo si es necesario y cuidando no duplicar valores.
- Cuándo NO modificar este archivo: si el problema es de quién pasa los headers, corrígelo en el llamador, no aquí.

## Errores comunes / Riesgos

- Valores no string se convierten a string; asegurarse de no pasar objetos.
- Ignorar headers `undefined`; si necesitas eliminar una clave, pásala como `null` explícitamente.

## Ejemplo de uso

- Al hacer una petición autenticada, el interceptor llama `mergeHeaders(config.headers, { Authorization: \`Bearer token\` })` para preservar headers previos.

## Snippets

```ts
for (const [k, v] of Object.entries(extra)) {
    if (typeof v === "string") out[k] = v;
}
```

## Related

- [`src/shared/api/http/interceptors/request.interceptor.ts`](/reference/files/src/shared/api/http/interceptors/request.interceptor)
