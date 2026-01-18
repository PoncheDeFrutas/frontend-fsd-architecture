# src/shared/lib/react-query/query-client.ts

## Propósito

- Definir el `QueryClient` singleton y sus defaults para toda la app.
- Punto central para ajustar el comportamiento de React Query (retries, refetch).

## Responsabilidades

- Exponer la fábrica `createQueryClient` con opciones por defecto.
- Exportar la instancia compartida `queryClient` y el flag `isQueryDevtoolsEnabled`.

## Exportaciones clave

- `createQueryClient()`: construye un `QueryClient` sin retries y sin refetch on focus.
- `queryClient`: instancia singleton usada en providers y features.
- `isQueryDevtoolsEnabled`: booleano derivado de `ENV.API_DEBUG`.

## Uso en la aplicación

- `src/app/providers/query-client/query-client.ts` re-exporta todo.
- `src/features/auth/model/guards.ts` usa `queryClient.ensureQueryData`.
- `src/features/auth/model/auth.events-bridge.ts` limpia la cache de auth con esta instancia.
- `src/pages/orders/index.test.tsx` limpia la cache entre pruebas.

## Guía de modificación

- Ajusta `defaultOptions` (p. ej. `staleTime`, `retry`, `refetchOnWindowFocus`) aquí para impactar todas las queries.
- Mantén `queryClient` como singleton; si necesitas uno custom para tests, usa la fábrica explícitamente.
- Cuándo NO modificar este archivo: no crees instancias adicionales aquí; fragmentarías la cache y los guards.

## Errores comunes / Riesgos

- Activar retries en 401 puede romper guards de auth; cámbialo solo si manejas auth aparte.
- Re-crear el cliente en otros lugares fragmenta la cache y pierde invalidaciones.

## Snippets

```ts
export function createQueryClient(): QueryClient {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
            },
            mutations: {
                retry: false,
            },
        },
    });
}
```

## Related

- [`src/app/providers/query-client/query-provider.tsx`](/reference/files/src/app/providers/query-client/query-provider)
- [`src/features/auth/model/guards.ts`](/reference/files/src/features/auth/model/guards)
