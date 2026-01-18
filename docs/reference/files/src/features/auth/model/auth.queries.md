# src/features/auth/model/auth.queries.ts

## Propósito

- Hooks de React Query para auth (`/auth/me`, sign-in/out) y helpers de cache.

## Responsabilidades

- Definir `useMeQuery`, `useSignInMutation`, `useSignOutMutation`.
- Proveer el helper `setMeCache`.
- Invalidar/eliminar la cache de auth en mutaciones.

## Exportaciones clave

- `useMeQuery(options?)`
- `useSignInMutation()`
- `useSignOutMutation()`
- `setMeCache(qc, me)`

## Uso en la aplicación

- `AuthProvider` llama `useMeQuery` (deshabilitable vía `bootstrap`).
- El flujo de login usa `useAuth`, que delega en estas mutaciones.
- Tests (`src/features/auth/model/auth.queries.test.ts`) cubren estos comportamientos.

## Guía de modificación

- Ajusta `staleTime`/`retry` según estabilidad del backend.
- Al agregar nuevas mutaciones, invalida o elimina `authKeys.me()` para mantener la UI en sync.
- Mantén la opción `enabled` para poder desactivar `/me` en rutas públicas.
- Cuándo NO modificar este archivo: no habilites `retry` en `/auth/me` salvo que el backend lo permita; puede generar spam.

## Errores comunes / Riesgos

- `retry: false` evita golpear `/auth/me`; cambiarlo sin control puede causar loops.
- Olvidar invalidar `authKeys.me()` tras login/logout deja estado obsoleto en la UI.

## Snippets

```ts
export function useMeQuery(options?: { enabled?: boolean }) {
    return useQuery({
        queryKey: authKeys.me(),
        queryFn: ({ signal }) => authService.me(signal),
        staleTime: 60_000,
        retry: false,
        enabled: options?.enabled ?? true,
    });
}
```

## Related

- [`src/features/auth/model/auth.keys.ts`](/reference/files/src/features/auth/model/auth.keys)
- [`src/features/auth/model/auth.provider.tsx`](/reference/files/src/features/auth/model/auth.provider)
