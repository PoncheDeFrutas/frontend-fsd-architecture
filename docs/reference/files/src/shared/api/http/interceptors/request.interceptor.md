# src/shared/api/http/interceptors/request.interceptor.ts

## Propósito

- Normalizar headers salientes y añadir autenticación cuando esté disponible.
- Centralizar el punto donde se loguean peticiones en modo debug.

## Responsabilidades

- Combinar headers existentes con defaults (`Accept`) y `Authorization` si hay token.
- Redactar headers sensibles antes de loguear cuando `ENV.API_DEBUG` está activo.

## Exportaciones clave

- `requestInterceptor(config): InternalAxiosRequestConfig`

## Uso en la aplicación

- Se registra en el cliente Axios dentro de `src/shared/api/http/client.ts`.

## Guía de modificación

- Agrega headers por defecto aquí (ej. locale) si aplica a todas las peticiones.
- Usa siempre `mergeHeaders` para conservar headers que vengan del llamador.
- Cuándo NO modificar este archivo: si el token no llega, revisa `token-store` o quién setea el token, no este interceptor.

## Errores comunes / Riesgos

- Mutar headers con valores no serializables puede romper Axios; `mergeHeaders` ya stringifica números/booleanos.
- Evita lanzar errores dentro del interceptor; debe devolver el config para no bloquear la cadena.

## Ejemplo de uso

- Al ejecutar una request autenticada, el interceptor añade `Authorization: Bearer <token>` y deja intactos headers personalizados que pasen las capas superiores.

## Snippets

```ts
const nextHeaders = mergeHeaders(config.headers, {
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

config.headers = nextHeaders as InternalAxiosRequestConfig["headers"];
```

## Related

- [`src/shared/api/http/utils/merge-headers.ts`](/reference/files/src/shared/api/http/utils/merge-headers)
- [`src/shared/api/http/utils/redact.ts`](/reference/files/src/shared/api/http/utils/redact)
