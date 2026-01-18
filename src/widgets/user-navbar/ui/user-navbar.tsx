import { Link, useNavigate } from "@tanstack/react-router";
import { Container } from "@/shared/ui/layout/container";
import { useAuth } from "@/features/auth";
import { Button } from "@/shared/ui/primitives/button";
import { Stack } from "@/shared/ui/layout/stack";

const links = [
    { to: "/app/orders", label: "Pedidos" },
    { to: "/app/private", label: "Privada" },
];

export function UserNavbar() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await signOut();
        navigate({ to: "/" });
    }

    return (
        <nav className="border-b bg-white">
            <Container className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-base font-semibold text-slate-900">
                    Área de usuario
                </div>
                <Stack
                    direction="col"
                    smDirection="row"
                    gap="3"
                    align="center"
                    className="sm:items-center"
                >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to as unknown as "/app"}
                                className="text-sm text-slate-700 hover:text-slate-900"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        {user?.email && (
                            <span className="text-sm text-slate-600">
                                {user.email}
                            </span>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                        >
                            Salir
                        </Button>
                    </div>
                </Stack>
            </Container>
        </nav>
    );
}
