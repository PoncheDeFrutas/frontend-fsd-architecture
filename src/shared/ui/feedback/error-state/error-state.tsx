import { Alert } from "@/shared/ui/feedback/alert";
import { Button } from "@/shared/ui/primitives/button";
import { Stack } from "@/shared/ui/layout/stack";

type Props = {
    title?: string;
    message?: string;
    details?: string | null;
    onBack?: () => void;
    onHome?: () => void;
};

export function ErrorState({
    title = "Algo salió mal",
    message = "No pudimos cargar esta sección.",
    details,
    onBack,
    onHome,
}: Props) {
    return (
        <Stack gap="4">
            <Alert variant="error" className="bg-danger text-danger-foreground">
                <div className="space-y-1">
                    <p className="text-base font-semibold">{title}</p>
                    <p className="text-sm">{message}</p>
                    {details && (
                        <p className="text-xs text-muted-foreground break-words">
                            {details}
                        </p>
                    )}
                </div>
            </Alert>

            <Stack direction="col" smDirection="row" gap="3">
                <Button variant="ghost" onClick={onBack}>
                    Volver
                </Button>
                <Button variant="primary" onClick={onHome}>
                    Ir a Home
                </Button>
            </Stack>
        </Stack>
    );
}
