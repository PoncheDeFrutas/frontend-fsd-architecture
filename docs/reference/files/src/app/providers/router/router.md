# src/app/providers/router/router.tsx

## Propósito

- Instanciar TanStack Router con el `routeTree` compartido.
- Proveer `<RouterProvider>` al árbol de React.

## Responsabilidades

- Configurar defaults del router (`defaultPreload: "intent"`).
- Registrar la augmentación de tipos de router para TypeScript.

## Exportaciones clave

- `AppRouter`: componente que renderiza `RouterProvider`.
- `router`: constante de módulo usada por el registro de tipos.

## Uso en la aplicación

- `src/app/providers/index.tsx` envuelve el router vía `AppRouter`.
- La augmentación `declare module "@tanstack/react-router"` vive aquí para que TS resuelva el router.

## Guía de modificación

- Ajusta los defaults (preload, `context`, `defaultPreloadDelay`) aquí.
- Mantén `routeTree` importado desde `route-tree.tsx` para centralizar rutas.
- Cuándo NO modificar este archivo: no recrees el router por render; debe ser una constante de módulo.

## Errores comunes / Riesgos

- Mover la augmentación de tipos fuera de este archivo rompe la inferencia de TanStack Router.

## Snippets

```tsx
const router = createRouter({
    routeTree,
    defaultPreload: "intent",
});
```

## Related

- [`src/app/providers/router/route-tree.tsx`](/reference/files/src/app/providers/router/route-tree)
- [`src/app/providers/index.tsx`](/reference/files/src/app/providers/index)
