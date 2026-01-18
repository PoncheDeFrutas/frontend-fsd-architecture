import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth";
import { Navbar, type NavbarItem } from "@/shared/ui/navigation/navbar";
import { Button } from "@/shared/ui/primitives/button";

const items: NavbarItem[] = [
    { to: "/admin", label: "Dashboard" },
    { to: "/app/orders", label: "Pedidos" },
];

export function AdminNavbar() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await signOut();
        navigate({ to: "/" });
    }

    return (
        <Navbar
            brand="Admin"
            items={items}
            variant="admin"
            rightSlot={
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
            }
        />
    );
}
