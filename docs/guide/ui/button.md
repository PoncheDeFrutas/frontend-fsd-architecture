# Button

Botón básico con variantes tipadas vía `cva`. La prop `variant` es requerida.

Import granular:

```tsx
import { Button } from "@/shared/ui/primitives/button";
```

Props clave:

- `variant`: `"primary" | "secondary" | "ghost"` (obligatoria).
- `size`: `"sm" | "md" | "lg"` (default `md`).
- `isLoading`: deshabilita y muestra un spinner pequeño.

Ejemplos:

```tsx
<div className="flex gap-3">
    <Button variant="primary">Guardar</Button>
    <Button variant="secondary">Cancelar</Button>
    <Button variant="ghost" isLoading>
        Cargando
    </Button>
</div>
```
