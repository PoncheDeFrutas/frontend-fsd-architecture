# Troubleshooting

## No se monta MSW en dev

- Revisa `VITE_MSW=true`.
- Abre consola: debería aparecer el banner de MSW. Si no, `initMSW` quizá no corrió (sólo en `import.meta.env.DEV`).

## /me redirige a /login aunque estoy logueado

- El token-store es in-memory; recargar la página requiere volver a pedir `/me`. Si `/me` devuelve 401, revisar mocks/backend.
- Asegúrate de que `authService.signIn` se llamó (guarda el token en memoria).

## Loop de refresh

- Evita tocar `refreshSession`; ya es single-flight.
- Si el backend devuelve 401 en refresh, el interceptor limpia token y no reintenta: revisa cookies/credenciales.

## Retry excesivo o faltante

- Ajusta `retry/retry-policy.ts` (qué status/métodos se reintentan).
- Ajusta `retry/backoff.ts` (base/cap).

## Errores Zod (ZOD_PARSE_ERROR)

- Significa que la respuesta no matchea el schema en `httpz`.
- Ajusta el schema DTO correspondiente o corrige la respuesta mock/backend.

## Guards no redirigen

- Revisa que la ruta use `beforeLoad: requireAuth/requireRole/requirePermission`.
- `ensureMe` trata 401 como anónimo y 5xx como anónimo silencioso; añade manejo personalizado si quieres burbujear errores.

## Tests fallan por handler incorrecto

- Verifica que añadiste tus handlers a `shared/mocks/index.ts`.
- Usa `server.use` en el test para overrides locales.

## No veo logs de request

- Activa `VITE_API_DEBUG=true` para logging seguro (headers sensibles redactados).
