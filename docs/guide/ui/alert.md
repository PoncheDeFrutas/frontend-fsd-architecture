# Alert

Caja de feedback contextual con variantes de color.

Import:

```tsx
import { Alert } from "@/shared/ui/feedback/alert";
```

Props:

- `variant`: `"info" | "success" | "warning" | "error"` (default `info`).

Ejemplos:

```tsx
<div className="space-y-2">
    <Alert variant="info">Guardando cambios...</Alert>
    <Alert variant="success">Todo listo.</Alert>
    <Alert variant="warning">Revisa los campos requeridos.</Alert>
    <Alert variant="error">No se pudo guardar.</Alert>
</div>
```
