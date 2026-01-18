# src/shared/api/http/client-helpers.ts

## Propósito

- Wrapper ligero sobre Axios para devolver directamente `response.data`.

## Responsabilidades

- Exponer helpers tipados (`get/post/put/patch/delete/request`) usando el `httpClient` compartido.
- Proveer el tipo `HttpRequestConfig` con headers flexibles.

## Exportaciones clave

- Objeto `http` con métodos REST.
- Tipo `HttpRequestConfig`.

## Uso en la aplicación

- `src/shared/api/http/zod-helpers.ts` llama `http.*` antes de validar con Zod.
- `src/features/auth/api/auth.service.ts` usa `http.post` para sign-out.
- `src/shared/mocks/handlers/*.ts` lo usa para simular endpoints en tests.

## Guía de modificación

- Añade métodos de conveniencia (ej. `upload`) solo si envuelven `httpClient`.
- Mantén `unwrap` mínimo; si necesitas headers/metadata, usa `httpClient` directo.
- Cuándo NO modificar este archivo: si requieres status/headers en una llamada concreta, cambia el consumidor, no este helper global.

## Errores comunes / Riesgos

- Estos helpers descartan headers/status; no los uses cuando necesites `AxiosResponse`.
- Asegura que `HttpRequestConfig.headers` siga siendo compatible con los tipos de Axios.

## Ejemplo de uso

- Para obtener datos tipados: `const orders = await http.get<OrderDto[]>(ENDPOINTS.orders.list);`.

## Snippets

```ts
export const http = {
    request<T>(config: HttpRequestConfig): Promise<T> {
        return unwrap<T>(httpClient.request<T>(config));
    },

    get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
        return unwrap<T>(httpClient.get<T>(url, config));
    },
```

## Related

- [`src/shared/api/http/zod-helpers.ts`](/reference/files/src/shared/api/http/zod-helpers)
- [`src/shared/api/http/client.ts`](/reference/files/src/shared/api/http/client)
