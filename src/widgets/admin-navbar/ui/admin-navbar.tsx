import { Link, useNavigate } from "@tanstack/react-router";
import { Container } from "@/shared/ui/layout/container";
import { useAuth } from "@/features/auth";
import { Button } from "@/shared/ui/primitives/button";

export function AdminNavbar() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await signOut();
        navigate({ to: "/" });
    }

    return (
        <nav className="border-b bg-slate-900 text-white">
            <Container className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-base font-semibold">Admin</div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <Link
                        to={"/admin" as unknown as "/admin"}
                        className="text-sm text-slate-200 hover:text-white"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to={"/app/orders" as unknown as "/app"}
                        className="text-sm text-slate-200 hover:text-white"
                    >
                        Pedidos
                    </Link>
                    <div className="flex items-center gap-3">
                        {user?.email && (
                            <span className="text-sm text-slate-200">
                                {user.email}
                            </span>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-white hover:bg-slate-800"
                        >
                            Salir
                        </Button>
                    </div>
                </div>
            </Container>
        </nav>
    );
}
