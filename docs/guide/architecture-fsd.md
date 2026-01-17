# Arquitectura FSD

## Capas y reglas de dependencia
- `app/`: main (providers de Query, Router, MSW). No contiene dominio; puede importar de `shared`, `features`, `widgets`, `pages`.
- `shared/`: infraestructura transversal (HTTP, config, mocks, lib). No debe conocer dominio.
- `entities/`: tipos y lógica de dominio (User, etc.). Puede depender de `shared` solo para utilidades sin red (idealmente cero HTTP directo).
- `features/`: unidades de negocio que combinan entidades + infra (Auth). Puede usar `entities`, `shared`.
- `pages/`: composición de features/widgets para rutas.
- `widgets/`: bloques UI reusables de alto nivel (aún vacíos).

Regla simple: `app` → (`features` | `shared` | `entities` | `pages`), `features` → (`entities` | `shared`), `entities` → solo utilidades puras, `shared` → nada de dominio.

## Diagrama rápido (ASCII)
```
app (providers, router)
│
├─ shared (http, config, mocks)
├─ entities (user)
├─ features (auth)
├─ pages (home/login/admin/...)
└─ widgets (vacío)
```

## Decisiones clave
- Axios vive en `shared/api/http` con interceptores y helpers. Ninguna feature toca axios directo; usan servicios.
- Dominio aislado en `entities` con DTO + mapper (User) y barrel `entities/user`.
- Router central en `app/providers/router`; guards exportados desde el barrel de `features/auth`.
- QueryClient singleton en `app/providers/query-client` para invalidaciones consistentes.

## Flujo típico
1. Página usa hooks de feature (`useAuth`, `useMeQuery`, etc.).
2. Hook llama a `authService` que usa `httpz` (axios+zod).
3. `httpz` valida contra schema DTO y mapea a dominio (User).
4. Router/guards usan QueryClient para cachear `me` y redirigir.
