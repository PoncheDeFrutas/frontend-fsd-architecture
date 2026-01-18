import { useNavigate } from "@tanstack/react-router";
import { Card } from "@/shared/ui/layout/card";
import { Stack } from "@/shared/ui/layout/stack";
import { Button } from "@/shared/ui/primitives/button";

/**
 * Home page component welcoming users and providing navigation options.
 * @returns The Home page JSX element.
 */
export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Stack gap="4" className="py-6">
            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                    Template React + Vite + FSD
                </p>
                <h1 className="text-2xl font-semibold text-foreground">
                    Bienvenido
                </h1>
                <p className="text-sm text-muted-foreground">
                    Usa el flujo demo para ver rutas públicas, autenticadas y
                    admin.
                </p>
            </div>

            <Card className="bg-surface text-foreground border-border">
                <Stack gap="3">
                    <p className="text-sm text-muted-foreground">
                        Ingresa con el usuario demo para explorar el flujo.
                    </p>
                    <Stack direction="col" smDirection="row" gap="3">
                        <Button
                            variant="primary"
                            onClick={() =>
                                navigate({ to: "/login" as unknown as "/" })
                            }
                        >
                            Ir a login
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() =>
                                navigate({
                                    to: "/app/orders" as unknown as "/",
                                })
                            }
                        >
                            Ver pedidos (redirige a login)
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate({ to: "/admin" })}
                        >
                            Panel admin
                        </Button>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );
}
