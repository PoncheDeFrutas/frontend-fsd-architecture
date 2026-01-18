# src/shared/api/http/retry/backoff.ts

## Propósito

- Proveer `sleep` y el cálculo de backoff exponencial con jitter para reintentos.

## Responsabilidades

- `sleep(ms)`: delay basado en promesa.
- `getBackoffMs`: calcular backoff exponencial acotado con jitter.

## Exportaciones clave

- `sleep`
- `getBackoffMs`

## Uso en la aplicación

- `createRetryInterceptor` espera `sleep(getBackoffMs(...))` entre intentos.

## Guía de modificación

- Ajusta `baseMs`/`capMs` en los llamadores; mantén esta función pura.
- Si necesitas determinismo en tests, inyecta un PRNG o mockea `Math.random`.
- Cuándo NO modificar este archivo: no mezcles aquí lógica de negocio; solo utilidades de tiempo.

## Errores comunes / Riesgos

- `Math.random` introduce no determinismo; stubéalo en pruebas que validen tiempos.
- Intentos negativos se corrigen con `Math.max`; evita pasarlos.

## Ejemplo de uso

- Para un segundo intento (`attempt=2`) con base 250 y cap 4000, `getBackoffMs` devuelve un valor aleatorio entre ~250 y 500 ms.

## Snippets

```ts
export function getBackoffMs(args: {
    attempt: number;
    baseMs?: number;
    capMs?: number;
}): number {
    const base = args.baseMs ?? 250;
    const cap = args.capMs ?? 4000;
    const exp = base * Math.pow(2, Math.max(0, args.attempt - 1));
    const capped = Math.min(cap, exp);
    const jitter = 0.5 + Math.random() * 0.5;
    return Math.floor(capped * jitter);
}
```

## Related

- [`src/shared/api/http/retry/retry.interceptor.ts`](/reference/files/src/shared/api/http/retry/retry.interceptor)
