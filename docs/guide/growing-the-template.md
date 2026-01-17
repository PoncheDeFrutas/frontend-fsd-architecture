# Cómo crecer el template

## Receta: nueva entidad (ej. Product)

1. Crea dominio: `src/entities/product/model/types.ts`

```ts
export type Product = { id: string; name: string; price: number };
```

2. DTO + Zod: `src/entities/product/api/product.dto.ts`

```ts
import { z } from "zod";
export const productDtoSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
});
export type ProductDto = z.infer<typeof productDtoSchema>;
```

3. Mapper: `src/entities/product/api/product.mapper.ts`

```ts
import type { ProductDto } from "./product.dto";
import type { Product } from "../model/types";
export const mapProductDto = (dto: ProductDto): Product => ({ ...dto });
```

## Receta: nueva feature (ej. catálogo)

1. Servicio HTTP en `src/features/catalog/api/catalog.service.ts` usando `httpz` y schemas DTO.

```ts
import { httpz } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/config/endpoints";
import { productDtoSchema } from "@/entities/product/api/product.dto";
import { mapProductDto } from "@/entities/product/api/product.mapper";

export const catalogService = {
    async list() {
        const dto = await httpz.get(
            productDtoSchema.array(),
            ENDPOINTS.catalog.list,
        );
        return dto.map(mapProductDto);
    },
};
```

2. Hooks en `src/features/catalog/model/catalog.queries.ts` con React Query.
3. UI en `src/features/catalog/ui/*` o directamente en la página.

## Receta: nueva página y ruta

1. Crea `src/pages/catalog/index.tsx`.
2. Añade ruta en `src/app/providers/router/route-tree.tsx`:

```ts
export const catalogRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/catalog",
  component: () => <CatalogPage />,
});
rootRoute.addChildren([catalogRoute]);
```

## Receta: proteger por role/permission

```ts
import { requireRole, requirePermission } from "@/features/auth";
new Route({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  beforeLoad: requirePermission("users:write"),
  component: () => <UsersPage />,
});
```

## Agregar endpoint y handler MSW

1. Define `ENDPOINTS.catalog.list = "/catalog"`.
2. Handler en `src/shared/mocks/handlers/catalog.handlers.ts` y agrégalo a `shared/mocks/index.ts`.
3. Usa MSW en dev y tests para simular la respuesta.

## Tests para la feature

- Crea handlers específicos.
- Monta el componente/hook dentro de `QueryClientProvider` (puedes reusar el singleton o crear uno nuevo).
- Verifica estados loading/success/error y side-effects (invalidations).

## Simular errores

- 401/403: MSW puede responder con `HttpResponse.json(..., { status: 401 })` y ver redirecciones/invalidaciones.
- 500/timeout: provoca para validar retry/backoff y normalización `ApiError`.
