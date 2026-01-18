# src/app/providers/query-client/query-provider.tsx

## Propósito

- Montar un único `QueryClientProvider` para compartir la cache de React Query en toda la app.

## Responsabilidades

- Inyectar el `queryClient` singleton en el árbol de React.
- Mantener el provider estable entre renders.

## Exportaciones clave

- `QueryProvider`: componente que envuelve a los hijos con `QueryClientProvider`.

## Uso en la aplicación

- `src/app/providers/index.tsx` envuelve el router con `QueryProvider`.

## Guía de modificación

- Habilita devtools aquí si activas `isQueryDevtoolsEnabled`.
- No instancies `QueryClient` por render; importa el singleton desde `query-client`.
- Si necesitas opciones de suspense/SSR, configúralas en las props del provider.

## Errores comunes / Riesgos

- Crear un `QueryClient` nuevo por render reseteará la cache.
- Olvidar envolver componentes con este provider rompe `useQuery`/`useMutation`.

## Snippets

```tsx
export function QueryProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
```

## Related

- [`src/app/providers/query-client/query-client.ts`](/reference/files/src/app/providers/query-client/query-client)
- [`src/shared/lib/react-query/query-client.ts`](/reference/files/src/shared/lib/react-query/query-client)
