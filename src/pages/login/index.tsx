import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth";
import { useNavigate } from "@tanstack/react-router";
import { Card } from "@/shared/ui/layout/card";
import { Stack } from "@/shared/ui/layout/stack";
import { Label } from "@/shared/ui/primitives/label";
import { Input } from "@/shared/ui/primitives/input";
import { Button } from "@/shared/ui/primitives/button";
import { Alert } from "@/shared/ui/feedback/alert";

export default function LoginPage() {
    const { signIn, status, user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("admin@test.com");
    const [password, setPassword] = useState("123");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            navigate({
                to:
                    user.role === "admin"
                        ? ("/admin" as unknown as "/")
                        : ("/app/orders" as unknown as "/"),
            });
        }
    }, [user, navigate]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            await signIn({ email, password });
            if (email.includes("admin")) {
                await navigate({ to: "/admin" as unknown as "/" });
            } else {
                await navigate({ to: "/app/orders" as unknown as "/" });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        }
    }

    return (
        <div className="py-8">
            <Card className="bg-surface text-foreground border-border max-w-lg mx-auto">
                <Stack gap="4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                            Demo de autenticación
                        </p>
                        <h1 className="text-xl font-semibold">
                            Iniciar sesión
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Usa admin@test.com / 123 para rol admin o cambia el
                            correo para rol user.
                        </p>
                    </div>

                    {error && (
                        <Alert
                            variant="error"
                            className="bg-danger text-danger-foreground"
                        >
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="correo@dominio.com"
                                type="email"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                type="password"
                            />
                        </div>

                        <Stack gap="3" direction="col">
                            <Button
                                variant="primary"
                                type="submit"
                                isLoading={status === "loading"}
                            >
                                Entrar
                            </Button>
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={() => navigate({ to: "/" })}
                            >
                                Volver
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Card>
        </div>
    );
}
