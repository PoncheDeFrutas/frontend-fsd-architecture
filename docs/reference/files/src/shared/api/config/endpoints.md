# src/shared/api/config/endpoints.ts

## Propósito

- Registro central de rutas de API usadas por los servicios HTTP.

## Responsabilidades

- Proveer paths tipados y compartidos para peticiones de auth y órdenes.

## Exportaciones clave

- `ENDPOINTS.auth.refresh`
- `ENDPOINTS.auth.me`
- `ENDPOINTS.auth.signIn`
- `ENDPOINTS.auth.signOut`
- `ENDPOINTS.orders.list`

## Uso en la aplicación

- `src/shared/api/http/auth/refresh.ts` hace POST a `ENDPOINTS.auth.refresh`.
- `src/features/auth/api/auth.service.ts` usa los endpoints de auth.
- `src/features/orders/api/orders.service.ts` consume `ENDPOINTS.orders.list`.
- Handlers de MSW en `src/shared/mocks/handlers/*.ts` reflejan estos paths.

## Guía de modificación

- Agrega nuevas rutas aquí al introducir servicios/features.
- Mantén paths relativos (sin base URL) para que funcionen con la config de Axios.
- Actualiza handlers de MSW y servicios cuando añadas endpoints.
- Cuándo NO modificar este archivo: no dupliques strings de rutas en servicios; importa siempre desde `ENDPOINTS`.

## Errores comunes / Riesgos

- Cambiar paths sin actualizar MSW rompe flujos de dev/test.
- Desalinear rutas aquí y en el backend genera 404 silenciosos; valida cambios junto al equipo backend.

## Snippets

```ts
export const ENDPOINTS = {
    auth: {
        refresh: "/auth/refresh",
        me: "/auth/me",
        signIn: "/auth/sign-in",
        signOut: "/auth/sign-out",
    },
    orders: {
        list: "/orders",
    },
} as const;
```

## Related

- [`src/shared/api/config/env.ts`](/reference/files/src/shared/api/config/env)
- [`src/features/auth/api/auth.service.ts`](https://github.com/ponche/frontend-fsd-architecture/blob/main/src/features/auth/api/auth.service.ts)
