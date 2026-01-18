# Catálogo UI (shared/ui)

Pequeña librería interna para casos base. Estructura por sub-librerías:

- `primitives/` — elementos HTML mejorados (Button, Input, Label).
- `layout/` — contenedores responsivos (Container, Stack, Card).
- `feedback/` — estados transversales (Alert, Spinner).
- `overlay/`, `navigation/` — placeholders para crecer (no exponen componentes aún).

Principios:

- Imports granulares: `import { Button } from "@/shared/ui/primitives/button"`.
- Cada sub-librería tiene su `index.ts` (barrel pequeño); `shared/ui/index.ts` solo re-exporta sub-librerías.
- Tailwind 4 + `cn()` y `cva()` para variantes; variantes tipadas (ej. `variant` requerido en Button).
- Responsivo por defecto: Container/Stack aceptan props para breakpoints (`sm`, `md`, `lg`).

Componentes incluidos:

- Primitives: Button (cva), Input, Label.
- Layout: Container, Stack, Card.
- Feedback: Alert (cva), Spinner.

Ejemplo rápido:

```tsx
import { Button } from "@/shared/ui/primitives/button";
import { Stack } from "@/shared/ui/layout/stack";

export function Actions() {
    return (
        <Stack direction="col" smDirection="row" gap="3">
            <Button variant="primary">Guardar</Button>
            <Button variant="ghost">Cancelar</Button>
        </Stack>
    );
}
```
