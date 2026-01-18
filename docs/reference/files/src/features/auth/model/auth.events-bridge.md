# src/features/auth/model/auth.events-bridge.ts

## Propósito

- Conectar eventos HTTP de auth con actualizaciones de la cache de React Query.

## Responsabilidades

- Suscribirse a eventos de auth y limpiar la cache de `/auth/me` en `unauthorized` o `signed_out`.

## Exportaciones clave

- `initAuthEventsBridge()`: configura el listener y devuelve una función de unsubscribe.

## Uso en la aplicación

- Se llama una sola vez dentro de `AuthProvider` al montar.

## Guía de modificación

- Añade handlers para otros eventos (ej. `forbidden`) según evolucione la UX.
- Mantén la suscripción como singleton; evita registrar múltiples listeners por árbol de providers.
- Cuándo NO modificar este archivo: si necesitas side-effects pesados, hazlos en capas superiores, no en el bridge.

## Errores comunes / Riesgos

- Olvidar desuscribirse al desmontar puede filtrar listeners; la implementación actual devuelve el cleanup.
- Limpiar cache en `forbidden` podría ocultar contexto de error; hazlo solo si es necesario.

## Ejemplo de uso

- Cuando `response.interceptor` emite `unauthorized`, este bridge limpia la query `authKeys.me()` para que la UI pase a estado anónimo.

## Snippets

```ts
const unsubscribe = onAuthEvent((event) => {
    if (event.type === "unauthorized" || event.type === "signed_out") {
        queryClient.removeQueries({ queryKey: authKeys.me() });
    }
});
```

## Related

- [`src/shared/api/http/auth/auth-events.ts`](/reference/files/src/shared/api/http/auth/auth-events)
- [`src/features/auth/model/auth.provider.tsx`](/reference/files/src/features/auth/model/auth.provider)
