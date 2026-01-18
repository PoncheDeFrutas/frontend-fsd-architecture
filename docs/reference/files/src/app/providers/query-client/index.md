# src/app/providers/query-client/index.ts

## Propósito

- Servir como barrel para importar el cliente de React Query y su provider desde un solo lugar.

## Responsabilidades

- Re-exportar `QueryProvider` y los utilitarios del cliente compartido usados en la capa `app/`.
- Mantener alineada la API con `src/shared/lib/react-query`.

## Exportaciones clave

- `QueryProvider`
- `queryClient`
- `createQueryClient`
- `isQueryDevtoolsEnabled`

## Uso en la aplicación

- `src/app/providers/index.tsx` importa `QueryProvider` desde aquí.

## Guía de modificación

- Agrega nuevos helpers solo si son parte del contrato global de Query en `app/`.
- Cuándo NO modificar este archivo: no añadas exports específicos de pantallas/features; mantén el barrel mínimo.

## Errores comunes / Riesgos

- Desalinear lo exportado aquí respecto a `shared/lib/react-query` puede crear múltiples clientes.

## Snippets

```ts
export { QueryProvider } from "./query-provider";
export {
    queryClient,
    createQueryClient,
    isQueryDevtoolsEnabled,
} from "./query-client";
```

## Related

- [`src/app/providers/query-client/query-provider.tsx`](/reference/files/src/app/providers/query-client/query-provider)
- [`src/shared/lib/react-query/query-client.ts`](/reference/files/src/shared/lib/react-query/query-client)
