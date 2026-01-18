# src/shared/api/http/auth/refresh.ts

## Propósito

- Refrescar el access token usando un cliente Axios dedicado y mantener la operación en single-flight.

## Responsabilidades

- Llamar a `ENDPOINTS.auth.refresh` con cookies, extraer el token y actualizar el store.
- Emitir `notifyUnauthorized` y limpiar tokens cuando el refresh falla.
- Evitar refrescos concurrentes reutilizando `refreshingPromise`.

## Exportaciones clave

- `refreshSession(): Promise<string>`

## Uso en la aplicación

- `response.interceptor.ts` lo invoca en 401 antes de reintentar.
- Se re-exporta vía `src/shared/api/http/index.ts`.

## Guía de modificación

- Ajusta el parseo de la respuesta si el backend cambia el campo de token.
- Tunea headers/timeouts del cliente dedicado; no usa headers de auth para evitar loops.
- Preserva el guard de single-flight (`refreshingPromise`) para no lanzar múltiples refresh.
- Cuándo NO modificar este archivo: no añadas lógica de UI; es infraestructura de auth.

## Errores comunes / Riesgos

- Lanzar dentro de refresh se propaga; el llamador debe tratar al usuario como anónimo si falla.
- No limpiar el token en fallos deja Authorization obsoleto.

## Snippets

```ts
if (refreshingPromise) return refreshingPromise;

refreshingPromise = (async () => {
    try {
        const response = await refreshClient.post<RefreshResponse>(
            ENDPOINTS.auth.refresh,
        );
        const token = response.data?.accessToken;

        if (!token || typeof token !== "string") {
            throw new Error("Invalid refresh response: missing access token");
        }

        setAccessToken(token);
        return token;
    } catch (error) {
        clearAccessToken();
        notifyUnauthorized();
        throw error;
    } finally {
        refreshingPromise = null;
    }
})();
```

## Related

- [`src/shared/api/http/interceptors/response.interceptor.ts`](/reference/files/src/shared/api/http/interceptors/response.interceptor)
- [`src/shared/api/http/auth/token-store.ts`](/reference/files/src/shared/api/http/auth/token-store)
