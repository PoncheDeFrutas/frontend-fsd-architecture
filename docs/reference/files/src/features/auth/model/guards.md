# src/features/auth/model/guards.ts

## Propósito

- Guards de TanStack Router para reforzar auth, roles y permisos.

## Responsabilidades

- Obtener/asegurar `/auth/me` vía React Query.
- Redirigir a `/login` o `/forbidden` según estado y permisos.
- Tratar 401 de `/auth/me` como anónimo en lugar de lanzar error.

## Exportaciones clave

- `requireAuth()`
- `requireRole(role)`
- `requirePermission(permission)`

## Uso en la aplicación

- `src/app/providers/router/route-tree.tsx` los adjunta a rutas protegidas.

## Guía de modificación

- Actualiza aquí los destinos de redirect si cambian las rutas de login/forbidden.
- Extiende `ensureMe` si necesitas manejar otros tipos de error (ej. mantenimiento).
- Mantén `staleTime`/`retry` alineados con `useMeQuery` para consistencia.
- Cuándo NO modificar este archivo: no llames `authService.me` directo en guards; usa `ensureMe` para reutilizar la cache y el manejo de 401.

## Errores comunes / Riesgos

- Olvidar `throw redirect()` deja rutas sin protección.
- Saltar `ensureMe` ignora el manejo de anónimo en 401 y puede romper flujos públicos.

## Ejemplo de uso

- Para proteger una ruta de admin: `beforeLoad: requireRole("admin")` en `route-tree`.

## Snippets

```ts
async function ensureMe(): Promise<MeResponse | null> {
    try {
        const me = await queryClient.ensureQueryData({
            queryKey: authKeys.me(),
            queryFn: ({ signal }) => authService.me(signal),
            staleTime: 60_000,
            retry: false,
        });
        return me;
    } catch (err) {
        if (err instanceof ApiError && err.status === 401) return null;
        return null;
    }
}
```

## Related

- [`src/app/providers/router/route-tree.tsx`](/reference/files/src/app/providers/router/route-tree)
- [`src/features/auth/model/auth.queries.ts`](/reference/files/src/features/auth/model/auth.queries)
