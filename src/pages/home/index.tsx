import { useAuth } from "@/features/auth";
import { useNavigate } from "@tanstack/react-router";
import { Card } from "@/shared/ui/layout/card";
import { Stack } from "@/shared/ui/layout/stack";
import { Button } from "@/shared/ui/primitives/button";

export default function HomePage() {
    const { user, signOut } = useAuth();
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
                {user ? (
                    <Stack gap="3">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Sesión activa
                            </p>
                            <p className="text-lg font-semibold">
                                {user.email}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Rol: {user.role}
                            </p>
                        </div>

                        <Stack
                            direction="col"
                            smDirection="row"
                            gap="3"
                            align="center"
                        >
                            <Button
                                variant="primary"
                                onClick={() =>
                                    navigate({
                                        to: "/app/orders" as unknown as "/",
                                    })
                                }
                            >
                                Ir a pedidos
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate({ to: "/admin" })}
                            >
                                Panel admin
                            </Button>
                            <Button variant="ghost" onClick={() => signOut()}>
                                Cerrar sesión
                            </Button>
                        </Stack>
                    </Stack>
                ) : (
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
                        </Stack>
                    </Stack>
                )}
            </Card>
        </Stack>
    );
}
