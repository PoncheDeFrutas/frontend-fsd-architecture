# src/shared/api/config/env.ts

## Propósito

- Validar y exponer las variables de entorno relacionadas con el API para el frontend.

## Responsabilidades

- Parsear `import.meta.env` con Zod y aplicar valores por defecto tipados.
- Centralizar URL base, timeout y flag de debug del API.

## Exportaciones clave

- `ENV.API_BASE_URL`
- `ENV.API_TIMEOUT_MS`
- `ENV.API_DEBUG`

## Uso en la aplicación

- `src/shared/api/http/client.ts` configura la base URL y timeout de Axios con estos valores.
- `src/shared/api/http/auth/refresh.ts` los usa para el cliente de refresh.
- `src/shared/api/http/interceptors/request.interceptor.ts` lee `API_DEBUG` para logging seguro.

## Guía de modificación

- Agrega nuevas env vars al `envSchema` y expónlas en `ENV`.
- Mantén defaults razonables para dev (`localhost`, timeout prudente).
- Cuándo NO modificar este archivo: no añadas lógica de negocio aquí; solo validación y defaults.

## Errores comunes / Riesgos

- `z.coerce.boolean()` convierte `"false"` a `false`; usa strings consistentes.
- Las vars inválidas caen en defaults silenciosos; si necesitas fallar rápido, maneja `safeParse` explícitamente.

## Snippets

```ts
const envSchema = z.object({
    VITE_API_BASE_URL: z.url().optional(),
    VITE_API_TIMEOUT_MS: z.coerce.number().int().positive().optional(),
    VITE_API_DEBUG: z.coerce.boolean().optional(),
});
```

## Related

- [`src/shared/api/config/endpoints.ts`](/reference/files/src/shared/api/config/endpoints)
- [`src/shared/api/http/client.ts`](/reference/files/src/shared/api/http/client)
