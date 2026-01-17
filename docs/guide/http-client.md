# HTTP Client (Axios + Zod)

## Dónde vive
- `src/shared/api/http/*` — infraestructura pura, sin conocimiento de dominio.

## Componentes
- `client.ts`: crea `axios` con `baseURL`, `timeout`, `withCredentials`, headers `Accept`.
- `interceptors/request.interceptor.ts`: añade Bearer desde token-store y log seguro (redacta headers sensibles cuando `ENV.API_DEBUG`).
- `retry/retry.interceptor.ts`: reintenta errores transitorios (network/timeout/429/502/503/504) sólo en métodos idempotentes; usa backoff exponencial con jitter (`retry/backoff.ts`, `retry-policy.ts`).
- `auth/refresh.ts`: refresh single-flight (una promesa global), usa axios dedicado sin Bearer para evitar loops; al fallar limpia token y emite `unauthorized`.
- `interceptors/response.interceptor.ts`: maneja 401/403; 401 dispara refresh+reintento de la request original; 403 emite `forbidden`.
- `errors/*`: `ApiError` + `normalizeError` (unifica kind/status/code/details, extrae `x-request-id`).
- `client-helpers.ts`: wrapper `http` que unwrappea `data` y tipa requests.
- `zod-helpers.ts`: `httpz` que valida respuesta con Zod y lanza `ApiError` con detalles de schema.
- `auth/auth-events.ts` y `auth/token-store.ts`: eventos y almacenamiento en memoria.

## Modificar comportamiento
- Base URL / timeout / debug: `src/shared/api/config/env.ts`.
- Endpoints: `src/shared/api/config/endpoints.ts`.
- Política de retry: `retry/retry-policy.ts` (e.g. agregar 500 si es idempotente).
- Backoff: `retry/backoff.ts` (cambia `baseMs`/`capMs` o fórmula).
- Refresh: `auth/refresh.ts` (single-flight) y `interceptors/response.interceptor.ts`.
- Logging: toggle `ENV.API_DEBUG`; redacción en `utils/redact.ts`.

## Ejemplo: nuevo request con httpz
```ts
import { httpz } from "@/shared/api/http";
import { z } from "zod";

const widgetSchema = z.object({ id: z.string(), name: z.string() });
const data = await httpz.get(widgetSchema.array(), "/widgets");
```

## Qué pasa cuando falla Zod
- `httpz` lanza `ApiError` con `code: "ZOD_PARSE_ERROR"` y detalles (`issues`, método, url).
- Maneja el error como cualquier `ApiError`: muestra mensaje o usa `kind/status`.

## Por qué retry está en axios y no en React Query
- Retry se aplica a cualquier caller (servicios, guards) y respeta idempotencia.
- Evita reintentos dobles (React Query `retry: false` por defecto; la resiliencia vive en axios).
