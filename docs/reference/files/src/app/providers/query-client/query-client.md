# src/app/providers/query-client/query-client.ts

## Propósito

- Re-exportar en la capa `app/` el cliente compartido de React Query.
- Garantizar una única fuente del singleton sin redefinir configuración.

## Responsabilidades

- Exponer `queryClient`, `createQueryClient` e `isQueryDevtoolsEnabled` desde `src/shared/lib/react-query`.
- Evitar duplicar lógica de configuración del cliente.

## Exportaciones clave

- `queryClient`: instancia singleton usada por el árbol de providers.
- `createQueryClient`: fábrica con opciones por defecto.
- `isQueryDevtoolsEnabled`: flag derivado de env.

## Uso en la aplicación

- `src/app/providers/query-client/query-provider.tsx` importa `queryClient`.
- Otras capas deberían importar directamente desde `@/shared/lib/react-query`.

## Guía de modificación

- Si cambian defaults, edita `src/shared/lib/react-query/query-client.ts`; este archivo debe ser solo un passthrough.
- Cuándo NO modificar este archivo: no crees nuevas instancias aquí, mantén el re-export.

## Errores comunes / Riesgos

- Instanciar un `QueryClient` aquí fragmentaría la cache y rompería los guards.

## Snippets

```ts
export {
    queryClient,
    createQueryClient,
    isQueryDevtoolsEnabled,
} from "@/shared/lib/react-query";
```

## Related

- [`src/shared/lib/react-query/query-client.ts`](/reference/files/src/shared/lib/react-query/query-client)
- [`src/app/providers/query-client/query-provider.tsx`](/reference/files/src/app/providers/query-client/query-provider)
