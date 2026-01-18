# src/features/auth/model/use-auth.ts

## Propósito

- Hooks para consumir el contexto de auth de forma segura.

## Responsabilidades

- Exponer `useAuth` (lanza error si falta provider) y `useOptionalAuth` (retorna null si no hay provider).

## Exportaciones clave

- `useAuth()`
- `useOptionalAuth()`

## Uso en la aplicación

- La página de login usa `useAuth` para sign-in y leer usuario.
- Páginas públicas deberían usar `useOptionalAuth` si necesitan leer auth sin requerir provider.

## Guía de modificación

- Mantén `useAuth` lanzando cuando falta provider para detectar árboles incorrectos.
- Añade helpers derivados aquí solo si se basan en el contexto (ej. `useIsAdmin`).
- Cuándo NO modificar este archivo: no cambies el comportamiento de error de `useAuth`; es la protección para rutas públicas.

## Errores comunes / Riesgos

- Usar `useAuth` fuera de `AuthProvider` crashea (diseño intencional); evita importarlo en rutas públicas.

## Snippets

```ts
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
    return ctx;
}
```

## Related

- [`src/features/auth/model/auth.provider.tsx`](/reference/files/src/features/auth/model/auth.provider)
- [`src/features/auth/model/auth.context.ts`](/reference/files/src/features/auth/model/auth.context)
