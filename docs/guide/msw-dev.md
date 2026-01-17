# MSW en desarrollo

## Cómo se activa

- `src/main.tsx` llama `initMSW` antes de renderizar.
- `initMSW` revisa `import.meta.env.DEV` y `VITE_MSW === "true"`. Si no, no monta el worker.
- Worker en `src/shared/mocks/browser.ts`.

## Handlers actuales

- `shared/mocks/handlers/auth.handlers.ts`: implementa `/auth/sign-in`, `/auth/me`, `/auth/refresh`, `/auth/sign-out` con sesión en memoria, roles (admin/user) y permisos.
- Se registran en `shared/mocks/index.ts`.

## Añadir un handler

```ts
// shared/mocks/handlers/catalog.handlers.ts
import { http, HttpResponse } from "msw";
import { ENDPOINTS } from "@/shared/api/config/endpoints";
import { ENV } from "@/shared/api/config/env";

const API = ENV.API_BASE_URL.replace(/\/$/, "");
const url = (path: string) => `${API}${path}`;

export const catalogHandlers = [
    http.get(url(ENDPOINTS.catalog.list), () =>
        HttpResponse.json([{ id: "p1", name: "Demo", price: 10 }]),
    ),
];
```

Luego agrégalo a `handlers` en `shared/mocks/index.ts`.

## Simular roles/errores

- Cambia lógica dentro de los handlers (e.g. forza `role: "user"`).
- Retorna `HttpResponse.json({ message: "Forbidden" }, { status: 403 })` para probar guards.
- Puedes leer headers: `request.headers.get("authorization")`.

## En tests

- `setup-msw.ts` levanta el server node antes de cada suite y resetea handlers después de cada test.
- Usa `server.use(...)` en un test para sobrescribir respuestas temporalmente.

## Troubleshooting MSW

- Si no ves peticiones interceptadas en dev, revisa en consola el banner de MSW o fuerza `VITE_MSW=true`.
- En SSR no aplica (este template es SPA).
