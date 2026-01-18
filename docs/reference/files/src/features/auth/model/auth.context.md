# src/features/auth/model/auth.context.ts

## Propósito

- Definir la forma del contexto de auth y crear el contexto de React.

## Responsabilidades

- Mantener `AuthStatus`, datos de usuario, helpers de permisos, funciones de sign-in/out y `meQuery`.

## Exportaciones clave

- `AuthContext`
- Tipos: `AuthContextValue`, `AuthStatus`

## Uso en la aplicación

- `AuthProvider` llena este contexto.
- Los hooks en `use-auth.ts` lo consumen.

## Guía de modificación

- Añade campos con moderación y actualiza todos los consumidores.
- Mantén `AuthStatus` alineado con la lógica del provider (`loading | authenticated | anonymous`).
- Cuándo NO modificar este archivo: no cambies la forma del contexto sin revisar las pantallas que usan `useAuth`.

## Errores comunes / Riesgos

- Cambiar la forma del contexto rompe todos los consumidores.
- `meQuery` debe tiparse como `ReturnType<typeof useMeQuery>` para conservar helpers de React Query.

## Ejemplo de uso

- `useAuth` lee `isAdmin` y `hasPermission` desde este contexto para habilitar acciones en UI protegida.

## Snippets

```ts
export type AuthContextValue = {
    status: AuthStatus;
    user: User | null;

    isAdmin: boolean;
    hasPermission: (perm: Permission) => boolean;

    signIn: (body: SignInBody) => Promise<void>;
    signOut: () => Promise<void>;

    meQuery: ReturnType<typeof useMeQuery>;
};
```

## Related

- [`src/features/auth/model/auth.provider.tsx`](/reference/files/src/features/auth/model/auth.provider)
- [`src/features/auth/model/use-auth.ts`](/reference/files/src/features/auth/model/use-auth)
