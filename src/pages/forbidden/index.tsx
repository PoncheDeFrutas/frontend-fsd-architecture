import { useNavigate } from "@tanstack/react-router";
import { Card } from "@/shared/ui/layout/card";
import { Stack } from "@/shared/ui/layout/stack";
import { Alert } from "@/shared/ui/feedback/alert";
import { Button } from "@/shared/ui/primitives/button";

export default function ForbiddenPage() {
    const navigate = useNavigate();

    return (
        <div className="py-6">
            <Card className="bg-surface text-foreground border-border">
                <Stack gap="3">
                    <Alert
                        variant="warning"
                        className="bg-warning text-warning-foreground"
                    >
                        403 - No tienes permisos para acceder.
                    </Alert>
                    <p className="text-sm text-muted-foreground">
                        Inicia sesión con una cuenta con los permisos adecuados
                        o vuelve al inicio.
                    </p>
                    <Stack direction="col" smDirection="row" gap="3">
                        <Button
                            variant="primary"
                            onClick={() => navigate({ to: "/" })}
                        >
                            Ir al inicio
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() =>
                                navigate({ to: "/login" as unknown as "/" })
                            }
                        >
                            Cambiar de usuario
                        </Button>
                    </Stack>
                </Stack>
            </Card>
        </div>
    );
}
