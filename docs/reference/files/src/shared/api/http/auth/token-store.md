# src/shared/api/http/auth/token-store.ts

## Propósito

- Almacenar en memoria el access token y notificar cambios.

## Responsabilidades

- Guardar/leer el token actual.
- Notificar a listeners cuando cambia.
- Proveer `clearAccessToken`.

## Exportaciones clave

- `getAccessToken`
- `setAccessToken`
- `clearAccessToken`
- `onAccessTokenChange`

## Uso en la aplicación

- `request.interceptor.ts` lee el token para añadir `Authorization`.
- `response.interceptor.ts` actualiza headers en el retry usando el token más reciente.
- `refresh.ts` actualiza/limpia el token tras reintentos.
- `src/shared/api/http/index.ts` re-exporta estos helpers.

## Guía de modificación

- Si necesitas persistir tokens (ej. localStorage), extiende los setters con cuidado y mantén los listeners sincronizados.
- Mantén el estado del token mínimo para no filtrar refresh tokens ni datos de usuario.
- Cuándo NO modificar este archivo: no añadas lógica de negocio; su rol es solo almacenamiento in-memory.

## Errores comunes / Riesgos

- Este store es por pestaña; recargar limpia el token (intencional).
- No limpiar el token ante fallos de refresh/sign-out deja sesiones inconsistentes.

## Ejemplo de uso

- Tras `refreshSession`, se llama `setAccessToken(token)` para que los interceptores lean el valor actualizado.

## Snippets

```ts
export function setAccessToken(token: string | null): void {
    accessToken = token;
    for (const cb of listeners) cb(accessToken);
}
```

## Related

- [`src/shared/api/http/interceptors/request.interceptor.ts`](/reference/files/src/shared/api/http/interceptors/request.interceptor)
- [`src/shared/api/http/auth/refresh.ts`](/reference/files/src/shared/api/http/auth/refresh)
