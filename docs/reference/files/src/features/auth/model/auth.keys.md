# src/features/auth/model/auth.keys.ts

## Propósito

- Centralizar las keys de React Query para el feature de auth.

## Responsabilidades

- Proveer fábricas de keys estables para operaciones de cache.

## Exportaciones clave

- `authKeys.all`
- `authKeys.me()`

## Uso en la aplicación

- `useMeQuery`, `useSignInMutation`, `useSignOutMutation` referencian estas keys.
- Guards y el bridge de eventos las usan para leer/limpiar cache.

## Guía de modificación

- Agrega nuevos helpers de keys al sumar queries de auth; mantenlos bajo el namespace `auth`.
- Cuándo NO modificar este archivo: no hardcodes arrays en otros módulos; importarlos desde aquí mantiene la cache alineada.

## Errores comunes / Riesgos

- Las keys deben ser serializables; usa primitivos/arreglos.

## Ejemplo de uso

- `queryClient.ensureQueryData({ queryKey: authKeys.me(), ... })` en guards utiliza estas keys para sincronizar cache.

## Snippets

```ts
export const authKeys = {
    all: ["auth"] as const,
    me: () => [...authKeys.all, "me"] as const,
} as const;
```

## Related

- [`src/features/auth/model/auth.queries.ts`](/reference/files/src/features/auth/model/auth.queries)
- [`src/features/auth/model/auth.events-bridge.ts`](/reference/files/src/features/auth/model/auth.events-bridge)
