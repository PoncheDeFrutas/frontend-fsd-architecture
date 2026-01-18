# src/app/providers/msw/init-msw.ts

## Propósito

- Arrancar el worker de MSW en el navegador durante el desarrollo cuando se habilita explícitamente.

## Responsabilidades

- Proteger la ejecución a modo dev y `VITE_MSW === "true"`.
- Importar dinámicamente el worker desde `@/shared/mocks/browser` y levantarlo.

## Exportaciones clave

- `initMSW`: función async llamada antes de renderizar React.

## Uso en la aplicación

- `src/main.tsx` espera `initMSW()` antes de montar `AppProviders`.
- Documentado en `/guide/msw-dev`.

## Guía de modificación

- Ajusta la política de `onUnhandledRequest` si quieres fallar o ignorar peticiones no mockeadas.
- Si agregas MSW lado servidor, deja este archivo solo para browser y crea una entrada aparte.
- Cuándo NO modificar este archivo: no lo invoques en producción; confía en los guards existentes.

## Errores comunes / Riesgos

- Cambiar la ruta de import dinámico puede romper el chunking de Vite.
- Quitar las guardas de entorno montaría MSW fuera de dev.

## Snippets

```ts
if (!import.meta.env.DEV) return;

const enabled = String(import.meta.env.VITE_MSW ?? "false") === "true";
if (!enabled) return;
```

## Related

- [`src/shared/mocks/browser.ts`](https://github.com/ponche/frontend-fsd-architecture/blob/main/src/shared/mocks/browser.ts) (worker)
- [`src/main.tsx`](/reference/files/src/app/providers/index) (punto de uso)
