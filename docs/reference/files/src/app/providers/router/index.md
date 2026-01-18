# src/app/providers/router/index.ts

## Propósito

- Barrel mínimo para importar el router desde un único path.

## Responsabilidades

- Re-exportar `AppRouter` sin añadir lógica extra.

## Exportaciones clave

- `AppRouter`

## Uso en la aplicación

- `src/app/providers/index.tsx` importa `AppRouter` a través de este barrel.

## Guía de modificación

- Mantén el archivo liviano; agrega exports solo si forman parte del API público de `app/`.
- Cuándo NO modificar este archivo: no metas lógica ni dependencias que puedan crear ciclos con `route-tree.tsx`.

## Errores comunes / Riesgos

- Generar importaciones circulares si se añaden dependencias innecesarias.

## Snippets

```ts
export { AppRouter } from "./router";
```

## Related

- [`src/app/providers/router/router.tsx`](/reference/files/src/app/providers/router/router)
