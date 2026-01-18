# src/shared/api/http/errors/normalize-error.ts

## Propósito

- Convertir errores desconocidos (especialmente de Axios) en `ApiError`.

## Responsabilidades

- Detectar cancelaciones, timeouts y errores de red.
- Mapear respuestas HTTP a `ApiError` usando payload/mensaje/status.
- Extraer `requestId` desde headers de respuesta cuando exista.

## Exportaciones clave

- `normalizeError(err: unknown): ApiError`

## Uso en la aplicación

- Lo invocan los interceptores de request/response/retry para estandarizar errores.
- Los `ApiError` resultantes los consumen el provider/guards de auth y la lógica de retry.

## Guía de modificación

- Agrega más claves en `pickRequestId` si el backend usa otros headers de correlación.
- Extiende el manejo de códigos de Axios (p. ej., errores TLS) si aparece un caso nuevo.
- Cuándo NO modificar este archivo: si necesitas contexto adicional, adjúntalo en el llamador; no abuses de `cause` aquí.

## Errores comunes / Riesgos

- Errores no Axios caen en `kind: "unknown"`; si necesitas más contexto, envuélvelos antes de llegar aquí.
- No preserves `cause` podría complicar el debugging de stacks originales.

## Snippets

```ts
if (axios.isAxiosError(err)) {
    const ax = err as AxiosError;

    if (ax.code === "ERR_CANCELED") {
        return new ApiError({
            kind: "canceled",
            message: "The request was canceled",
            url: ax.config?.url,
            method: ax.config?.method?.toUpperCase(),
            cause: err,
        });
    }
```

## Related

- [`src/shared/api/http/errors/api-error.ts`](/reference/files/src/shared/api/http/errors/api-error)
- [`src/shared/api/http/interceptors/response.interceptor.ts`](/reference/files/src/shared/api/http/interceptors/response.interceptor)
