# src/app/providers/index.tsx

## Propósito

- Envolver la aplicación con los providers globales (React Query + Router) en un solo punto.
- Centralizar el arranque compartido sin acoplar lógica de features.

## Responsabilidades

- Componer `QueryProvider` y `AppRouter`.
- Garantizar que el árbol de providers sea estable y único.

## Exportaciones clave

- `AppProviders`: componente que monta los providers globales.

## Uso en la aplicación

- `src/main.tsx` lo monta dentro de `React.StrictMode`.
- `src/app/providers/router/public-auth.test.tsx` y `src/pages/orders/index.test.tsx` lo usan en pruebas de integración de rutas/UI.

## Guía de modificación

- Agrega providers globales envolviendo `<AppRouter />` (ej. tema global o analytics).
- Mantén `QueryProvider` como capa superior para que los hooks de React Query funcionen en todo el árbol.
- Cuándo NO modificar este archivo: si el provider es específico de rol/feature o dispara llamadas de red en rutas públicas; muévelo a layouts protegidos.

## Errores comunes / Riesgos

- Montar `AuthProvider` aquí dispararía `/auth/me` en páginas públicas.
- Crear providers condicionados puede generar árboles inconsistentes entre renders.

## Snippets

```tsx
export function AppProviders() {
    return (
        <QueryProvider>
            <AppRouter />
        </QueryProvider>
    );
}
```

## Related

- [`src/app/providers/query-client/query-provider.tsx`](/reference/files/src/app/providers/query-client/query-provider)
- [`src/app/providers/router/router.tsx`](/reference/files/src/app/providers/router/router)
- [`src/main.tsx`](/guide/getting-started) (punto de montaje)
