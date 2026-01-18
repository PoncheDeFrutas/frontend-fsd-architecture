# src/shared/api/http/auth/auth-events.ts

## Propósito

- Pub/sub simple para eventos de autenticación (`unauthorized`/`forbidden`/`signed_out`).

## Responsabilidades

- Gestionar listeners y emitir eventos para que las features reaccionen a cambios de auth.

## Exportaciones clave

- `emitAuthEvent`
- `onAuthEvent`
- `notifyUnauthorized`
- `notifyForbidden`
- `notifySignedOut`
- Tipo `AuthEvent`

## Uso en la aplicación

- `response.interceptor.ts` llama `notifyForbidden` en 403.
- `refresh.ts` llama `notifyUnauthorized` cuando el refresh falla.
- `src/features/auth/model/auth.events-bridge.ts` se suscribe vía `onAuthEvent`.

## Guía de modificación

- Extiende `AuthEvent` si necesitas nuevos eventos y emítelos donde corresponda.
- Mantén la gestión de listeners mínima para evitar fugas.
- Cuándo NO modificar este archivo: no agregues efectos pesados en los emisores; deben ser solo notificaciones.

## Errores comunes / Riesgos

- No desuscribirse (valor de retorno de `onAuthEvent`) puede filtrar listeners.
- Ejecutar lógica pesada en cada listener puede impactar el rendimiento global.

## Ejemplo de uso

- Cuando el backend responde 403, el interceptor emite `notifyForbidden` y los listeners pueden reaccionar (ej. toasts o redirecciones).

## Snippets

```ts
export function emitAuthEvent(event: AuthEvent): void {
    for (const cb of listeners) cb(event);
}
```

## Related

- [`src/features/auth/model/auth.events-bridge.ts`](/reference/files/src/features/auth/model/auth.events-bridge)
- [`src/shared/api/http/interceptors/response.interceptor.ts`](/reference/files/src/shared/api/http/interceptors/response.interceptor)
