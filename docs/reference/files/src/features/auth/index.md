# src/features/auth/index.ts

## Propósito

- Exponer la API pública del feature de autenticación desde un solo entrypoint.

## Responsabilidades

- Re-exportar hooks, providers, guards y servicios/tipos de auth.
- Mantener una superficie estable para evitar imports de rutas internas.

## Exportaciones clave

- `AuthProvider`
- Hooks: `useAuth`, `useOptionalAuth`, `useMeQuery`
- Guards: `requireAuth`, `requireRole`, `requirePermission`
- `authKeys`
- Servicios/tipos: `authService`, `MeResponse`, schemas de auth

## Uso en la aplicación

- Layouts (`src/app/layouts/user-layout.tsx`, `src/app/layouts/admin-layout.tsx`) importan `AuthProvider`.
- El router (`src/app/providers/router/route-tree.tsx`) usa los guards.
- La página de login importa `useAuth`.
- Los servicios internos del feature también consumen este barrel para mantener consistencia.

## Guía de modificación

- Agrega nuevos exports solo si son estables y necesarios para otras capas.
- Cuándo NO modificar este archivo: no expongas implementaciones internas temporales; mantén la API mínima para no acoplar consumidores.

## Errores comunes / Riesgos

- Importar desde rutas profundas en vez de este barrel rompe la encapsulación y dificulta refactors.

## Snippets

```ts
// Modelo: API pública
export { AuthProvider } from "./model/auth.provider";
export { useAuth, useOptionalAuth } from "./model/use-auth";
export { requireAuth, requireRole, requirePermission } from "./model/guards";
export { authKeys } from "./model/auth.keys";
export { useMeQuery } from "./model/auth.queries";
```

## Related

- [`src/features/auth/model/auth.provider.tsx`](/reference/files/src/features/auth/model/auth.provider)
- [`src/features/auth/api/auth.service.ts`](https://github.com/ponche/frontend-fsd-architecture/blob/main/src/features/auth/api/auth.service.ts)
