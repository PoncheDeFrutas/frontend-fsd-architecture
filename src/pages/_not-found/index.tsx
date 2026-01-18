import { useNavigate } from "@tanstack/react-router";
import { Card } from "@/shared/ui/layout/card";
import { Stack } from "@/shared/ui/layout/stack";
import { Button } from "@/shared/ui/primitives/button";

/**
 * 404 Not Found Page Component
 *
 * Displays a message indicating that the requested page was not found,
 * along with a button to navigate back to the home page.
 * @returns The Not Found page component.
 */
export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="py-6">
            <Card className="bg-surface text-foreground border-border">
                <Stack gap="3">
                    <div>
                        <p className="text-sm text-muted-foreground">404</p>
                        <h1 className="text-xl font-semibold">
                            Página no encontrada
                        </h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Verifica la URL o vuelve al inicio.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => navigate({ to: "/" })}
                    >
                        Volver al inicio
                    </Button>
                </Stack>
            </Card>
        </div>
    );
}
