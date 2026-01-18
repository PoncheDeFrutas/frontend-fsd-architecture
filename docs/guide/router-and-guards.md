# Router y Guards

## Rutas actuales

- Definidas en `src/app/providers/router/route-tree.tsx` con TanStack Router.
- Rutas: `/`, `/login`, `/forbidden`, `/private`, `/admin`.
- `AppRouter` se monta en `app/providers/router/router.tsx`.

## Cómo agregar una ruta

```ts
import { Route } from "@tanstack/react-router";
import { publicLayoutRoute } from "./route-tree";
import CatalogPage from "@/pages/catalog";

export const catalogRoute = new Route({
  getParentRoute: () => publicLayoutRoute,
  path: "/catalog",
  component: () => <CatalogPage />,
});
publicLayoutRoute.addChildren([catalogRoute]);
```

## Guards disponibles (`@/features/auth`)

- `requireAuth()` → redirige a `/login` si no hay sesión.
- `requireRole(role)` → redirige a `/login` si no hay sesión o `/forbidden` si rol no coincide.
- `requirePermission(permission)` → redirige a `/login` o `/forbidden` según corresponda.

### Cómo se resuelve `/me`

- Usa `queryClient.ensureQueryData` con `authService.me`.
- Corta en 401 para tratar como anónimo.
- Cache con `staleTime: 60s`.

## Ejemplo: ruta protegida por rol

```ts
import { requireRole } from "@/features/auth";

export const adminUsersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  beforeLoad: requireRole("admin"),
  component: () => <AdminUsersPage />,
});
```

## Ejemplo: ruta protegida por permiso

```ts
import { requirePermission } from "@/features/auth";

export const writeUsersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin/users/write",
  beforeLoad: requirePermission("users:write"),
  component: () => <WriteUsersPage />,
});
```

## Evitar loops de auth

- El refresh se hace en axios; los guards solo redirigen según cache de `/me`.
- No llames `authService.me` directo en componentes: usa `useMeQuery` o `requireAuth`.
- Si cambias rutas de login/forbidden, actualiza guards.

## Layouts + navbars

- Los layouts viven en `src/app/layouts/*` y solo renderizan navbar (widgets) + `<Outlet />`.
- Navbars están en `src/widgets/*-navbar` para cada contexto:
    - `PublicLayout` → `PublicNavbar` (rutas públicas, p. ej. `/`, `/login`).
    - `UserLayout` → `UserNavbar` (rutas autenticadas bajo `/app/*`, p. ej. `/app/orders`, `/app/private`).
    - `AdminLayout` → `AdminNavbar` (rutas admin bajo `/admin/*`).
- Para colgar nuevas rutas:
    - Públicas: usa `publicLayoutRoute.addChildren([...])`.
    - Usuario autenticado: `userLayoutRoute` (hereda `requireAuth`).
    - Admin: `adminLayoutRoute` (hereda `requireRole("admin")`; añade permisos específicos en hijos si aplica).
