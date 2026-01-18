# src/features/auth/model/auth.provider.tsx

## Propósito

- Proveer estado de auth (`status`, `user`, permisos) y acciones a los descendientes.
- Conectar eventos de auth con la cache de React Query.

## Responsabilidades

- Inicializar el bridge de eventos de auth una sola vez al montar.
- Consultar `/auth/me` vía `useMeQuery` (configurable con `bootstrap`).
- Exponer mutaciones `signIn`/`signOut` y helpers de permisos.

## Exportaciones clave

- Componente `AuthProvider` que acepta `children` y `bootstrap?: boolean`.

## Uso en la aplicación

- Montado en `src/app/layouts/user-layout.tsx` y `src/app/layouts/admin-layout.tsx`.
- La página de login envuelve su contenido con `<AuthProvider bootstrap={false}>` para evitar `/auth/me`.

## Guía de modificación

- Ajusta el valor por defecto de `bootstrap` o pasa `enabled` a `useMeQuery` al crear flujos públicos.
- Extiende el valor del contexto en `auth.context.ts` si agregas nuevas capacidades (ej. MFA).
- Mantén la inicialización en `useEffect` para registrar el bridge solo una vez.
- Cuándo NO modificar este archivo: no lo montes en rutas públicas con bootstrap activo; dispararía `/auth/me`.

## Errores comunes / Riesgos

- Ignorar el 401 de `/auth/me` puede romper guards; el check con `ApiError` ya lo trata como anónimo.
- Recrear el `Set` de permisos sin memoización genera renders extra; se usa `useMemo` para evitarlo.

## Ejemplo de uso

- En layouts protegidos, envuelve `<Outlet />` con `<AuthProvider>` para exponer estado de sesión a las páginas hijas.

## Snippets

```ts
const status: AuthStatus = useMemo(() => {
    if (meQuery.isLoading) return "loading";
    if (meQuery.isError) {
        const err = meQuery.error;
        if (err instanceof ApiError && err.status === 401) return "anonymous";
        return "anonymous";
    }
    return meQuery.data?.user ? "authenticated" : "anonymous";
}, [meQuery.isLoading, meQuery.isError, meQuery.data, meQuery.error]);
```

## Related

- [`src/features/auth/model/auth.context.ts`](/reference/files/src/features/auth/model/auth.context)
- [`src/features/auth/model/auth.queries.ts`](/reference/files/src/features/auth/model/auth.queries)
