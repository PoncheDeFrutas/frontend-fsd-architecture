# src/app/providers/router/root-error.tsx

## Propósito

- `errorComponent` global de TanStack Router para mostrar una UI de error consistente.
- Separar el manejo de errores de routing de cualquier feature.

## Responsabilidades

- Mapear errores del router al componente `ErrorState` con mensajes diferenciados para dev/prod.
- Ofrecer acciones de navegación (volver / ir a Home).

## Exportaciones clave

- `RootErrorComponent`: componente registrado en `rootRoute`.

## Uso en la aplicación

- Registrado en `rootRoute` dentro de `route-tree.tsx`.

## Guía de modificación

- Añade logging/telemetría antes del render si lo necesitas.
- Ajusta el copy de dev/prod o los botones sin acoplar a auth.
- Cuándo NO modificar este archivo: si el error proviene de datos de negocio, manéjalo en la pantalla; este componente es global para fallos de routing.

## Errores comunes / Riesgos

- Acoplarlo a features rompe su reutilización; manténlo agnóstico.
- `error` puede ser `unknown`; siempre protege `message`/`stack` para evitar crashear.

## Snippets

```tsx
const message =
    isDev && error instanceof Error
        ? error.message
        : "No pudimos cargar esta página.";
```

```tsx
<ErrorState
    title="Algo salió mal"
    message={message}
    details={details}
    onBack={() => router.history.go(-1)}
    onHome={() => navigate({ to: "/" })}
/>
```

## Related

- [`src/app/providers/router/route-tree.tsx`](/reference/files/src/app/providers/router/route-tree)
- [`src/shared/ui/feedback/error-state.tsx`](/guide/ui/alert) (componente usado)
