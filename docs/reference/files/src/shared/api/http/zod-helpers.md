# src/shared/api/http/zod-helpers.ts

## Propósito

- Combinar llamadas HTTP con validación de Zod y errores estandarizados.

## Responsabilidades

- Envolver llamadas `http.*`, parsear la respuesta con el schema provisto y lanzar `ApiError` si no coincide.

## Exportaciones clave

- Objeto `httpz` con `get/delete/post/put/patch`.

## Uso en la aplicación

- `src/features/auth/api/auth.service.ts` valida DTOs de auth.
- `src/features/orders/api/orders.service.ts` valida respuestas de órdenes.

## Guía de modificación

- Si agregas nuevos verbos HTTP, refléjalos aquí y en `http`.
- Ajusta `throwZodError` solo si el backend cambia el formato de error.
- Cuándo NO modificar este archivo: no ignores el schema para “hacerlo pasar”; corrige el schema o la API.

## Errores comunes / Riesgos

- Un schema incorrecto rechaza respuestas válidas lanzando `ApiError` (`kind: "unknown"`).
- No capturar estos errores aguas arriba puede romper la UI sin feedback.

## Ejemplo de uso

- Validar `/auth/me`: `const dto = await httpz.get(meResponseSchema, ENDPOINTS.auth.me);`.

## Snippets

```ts
const parsed = schema.safeParse(raw);
if (!parsed.success) {
    throwZodError({
        url,
        method,
        issues: parsed.error.issues,
        raw,
    });
}
```

```ts
const raw = await http.post<unknown, B>(url, body, config);
return parseOrThrow(schema, raw, url, "POST");
```

## Related

- [`src/shared/api/http/client-helpers.ts`](/reference/files/src/shared/api/http/client-helpers)
- [`src/shared/api/http/errors/api-error.ts`](/reference/files/src/shared/api/http/errors/api-error)
