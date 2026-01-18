# src/app/providers/router/route-tree.tsx

## Propósito

- Fuente única de rutas de TanStack Router: layouts públicos/usuarios/admin y sus hijos.
- Conectar layouts con guards sin mezclar lógica de UI.

## Responsabilidades

- Definir `rootRoute`, rutas de layout e hijas.
- Adjuntar `beforeLoad` con `requireAuth`, `requireRole`, `requirePermission`.
- Exponer `routeTree` que consume el provider de router.

## Exportaciones clave

- `rootRoute`, `publicLayoutRoute`, `userLayoutRoute`, `adminLayoutRoute`.
- `routeTree` con todos los hijos registrados.

## Uso en la aplicación

- `src/app/providers/router/router.tsx` importa `routeTree` para crear el router.

## Guía de modificación

- Nueva ruta pública: crea `Route` con `getParentRoute: () => publicLayoutRoute` y añádela vía `publicLayoutRoute.addChildren`.
- Ruta protegida: usa `userLayoutRoute` o `adminLayoutRoute` y aplica el guard correspondiente.
- Mantén paths hijos relativos (ej. `"orders"` bajo `/app`); los prefijos absolutos viven en los layouts.

## Errores comunes / Riesgos

- Olvidar llamar a `addChildren` deja la ruta sin registrar.
- Importar features desde `app/` rompe FSD; mantén dependencias inversas.
- Si mueves `errorComponent`/`notFoundComponent` fuera del root, ramas podrían perder manejo de errores.

## Snippets

```tsx
export const rootRoute = new RootRoute({
    component: () => (
        <div className="min-h-dvh bg-slate-50">
            <Outlet />
        </div>
    ),
    notFoundComponent: () => <NotFoundPage />,
    errorComponent: RootErrorComponent,
});
```

```tsx
export const routeTree = rootRoute.addChildren([
    publicLayoutRoute,
    userLayoutRoute,
    adminLayoutRoute,
]);
```

## Related

- [`src/app/providers/router/root-error.tsx`](/reference/files/src/app/providers/router/root-error)
- [`src/features/auth/model/guards.ts`](/reference/files/src/features/auth/model/guards)
- [`src/app/layouts/*`](/guide/architecture-fsd#layouts) (layouts usados como parents)
