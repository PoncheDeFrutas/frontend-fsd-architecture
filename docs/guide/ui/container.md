# Container

Contenedor responsivo para limitar el ancho y aplicar padding consistente.

Import:

```tsx
import { Container } from "@/shared/ui/layout/container";
```

Props:

- `size`: `"sm" | "md" | "lg" | "xl" | "full"` (default `lg`, mapea a `max-w-screen-*`).
- `padded`: boolean (default `true`, aplica `px-4 sm:px-6 lg:px-8`).

Ejemplo:

```tsx
<Container size="xl">
    <h2 className="text-xl font-semibold">Dashboard</h2>
    <p className="text-sm text-slate-600">
        Contenido centrado y con padding adaptativo.
    </p>
</Container>
```
