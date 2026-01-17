# Testing (Vitest + MSW)

## Setup

- Config en `vite.config.ts` (`environment: "jsdom"`, `setupFiles: ["./src/shared/mocks/test/setup-msw.ts"]`).
- MSW server node en `src/shared/mocks/server.ts`, handlers en `shared/mocks/handlers/*`.
- Tests existentes:
    - `src/features/auth/model/auth.queries.test.ts`
    - `src/shared/api/http/http.refresh.test.ts`

## Cómo agregar un test de feature

1. Crea handlers específicos en `shared/mocks/handlers/<feature>.handlers.ts` y agrégalos a `shared/mocks/index.ts`.
2. Escribe test:

```ts
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { useMyQuery } from "@/features/catalog/model/catalog.queries";

describe("catalog", () => {
  it("fetches products", async () => {
    const qc = new QueryClient();
    const { result, rerender } = renderHook(() => useMyQuery(), {
      wrapper: ({ children }) => <QueryClientProvider client={qc}>{children}</QueryClientProvider>,
    });
    expect(result.current.isLoading).toBe(true);
    await result.current.refetch();
    expect(result.current.data?.length).toBeGreaterThan(0);
  });
});
```

## Probar refresh/retry

- Usa el patrón de `http.refresh.test.ts`: fuerza token inválido y espera reintento tras refresh.
- Para retry, haz que el handler falle con 503 y luego 200; axios reintenta automáticamente si método es GET/HEAD/OPTIONS.

## Unit vs Integration

- Unit: mapea DTO→dominio, utilidades puras (`user.mapper`, helpers HTTP).
- Integration: hooks con React Query + MSW, guards con Router (puedes usar `router.navigate` en tests de TanStack Router si añades soporte).

## Simular errores

- 401/403: handler devuelve `{ status: 401/403 }`, observa eventos de auth o redirects.
- 500: verifica que `ApiError.kind === "http"` y `status === 500`.
- Timeout: usa `throw new Error("ECONNABORTED")` o msw `delay` + timeout pequeño en request config.
