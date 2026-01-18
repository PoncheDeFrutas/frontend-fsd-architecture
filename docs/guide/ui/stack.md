# Stack

Layout flex responsivo para espaciar elementos en columna/fila.

Import:

```tsx
import { Stack } from "@/shared/ui/layout/stack";
```

Props:

- `direction`: `"row" | "col"` (default `col`).
- `smDirection`, `mdDirection`, `lgDirection`: override por breakpoint.
- `gap`: `"2" | "3" | "4" | "6" | "8"` (default `4`).
- `align`: `"start" | "center" | "end" | "stretch"`.
- `justify`: `"start" | "center" | "end" | "between"`.

Ejemplo responsive:

```tsx
<Stack direction="col" mdDirection="row" gap="3" align="center">
    <Button variant="primary">Aceptar</Button>
    <Button variant="ghost">Cancelar</Button>
</Stack>
```
