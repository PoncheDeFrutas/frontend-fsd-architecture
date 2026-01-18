# Tema y tokens (Tailwind 4)

Los tokens viven en `src/index.css` como variables CSS (light/dark) y se mapean a Tailwind via `@theme` para usarlos con utilidades (`bg-primary`, `text-foreground`, etc.).

## Tokens definidos

- background / foreground
- surface / surface-2
- border
- primary / primary-foreground
- secondary / secondary-foreground
- success / warning / danger (+ foregrounds)
- muted / muted-foreground
- radius

Light mode en `:root`, dark mode en `.dark { ... }` (la variante `@custom-variant dark (&:where(.dark, .dark *));` ya está incluida).

## Uso en componentes

```tsx
import { Card } from "@/shared/ui/layout/card";
import { Alert } from "@/shared/ui/feedback/alert";

export function Example() {
    return (
        <div className="space-y-4">
            <Card className="bg-surface text-foreground border border-border rounded-[var(--radius)]">
                <h3 className="text-lg font-semibold">Tokens en acción</h3>
                <p className="text-muted-foreground text-sm">
                    Fondo y texto usan background/foreground; borde usa border.
                </p>
                <button className="mt-3 bg-primary text-primary-foreground rounded-[var(--radius)] px-3 py-2">
                    Acción
                </button>
            </Card>

            <Alert
                variant="warning"
                className="bg-warning text-warning-foreground"
            >
                Aviso usando colores de warning.
            </Alert>
        </div>
    );
}
```

## Ejemplo dark mode

- En el layout raíz puedes añadir `.dark` al `<body>` o `<html>`; las utilidades cambian automáticamente:

```html
<body class="dark">
    <!-- el mismo código usa los tokens dark -->
</body>
```

## Dónde editar

- Tokens y mapeo: `src/index.css` (`:root`, `.dark`, `@theme`).
- Si necesitas nuevos roles (ej. `info`), agrega variable en `:root`/`.dark` y mapea con `--color-info` en `@theme`.
