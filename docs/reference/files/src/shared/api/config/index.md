# src/shared/api/config/index.ts

## Propósito

- Barrel para exponer constantes de configuración de API (`ENV`, `ENDPOINTS`) desde un único import.

## Responsabilidades

- Re-exportar los módulos de configuración compartida.

## Exportaciones clave

- `ENV`
- `ENDPOINTS`

## Uso en la aplicación

- `src/shared/api/http/client.ts` importa `{ ENV }` vía `../config`.
- Servicios consumen `{ ENDPOINTS }` desde aquí para evitar rutas largas.

## Guía de modificación

- Mantén las exportaciones mínimas y compartidas.
- Cuándo NO modificar este archivo: no añadas lógica ni dependencias que puedan generar ciclos con HTTP; usa solo re-exports.

## Errores comunes / Riesgos

- Crear dependencias cruzadas con HTTP rompería la carga de módulos.

## Snippets

```ts
export { ENV } from "./env";
export { ENDPOINTS } from "./endpoints";
```

## Related

- [`src/shared/api/config/env.ts`](/reference/files/src/shared/api/config/env)
- [`src/shared/api/config/endpoints.ts`](/reference/files/src/shared/api/config/endpoints)
