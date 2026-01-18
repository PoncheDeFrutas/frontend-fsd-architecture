import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth";
import { Navbar, type NavbarItem } from "@/shared/ui/navigation/navbar";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { Button } from "@/shared/ui/primitives/button";

const items: NavbarItem[] = [
    { to: "/app/orders", label: "Pedidos" },
    { to: "/app/private", label: "Privada" },
];

/**
 * User navigation bar component.
 * Displays user information and navigation links.
 */
export function UserNavbar() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await signOut();
        navigate({ to: "/" });
    }

    return (
        <Navbar
            brand="Área de usuario"
            items={items}
            variant="user"
            rightSlot={
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    {user?.email && (
                        <span className="text-sm text-slate-600">
                            {user.email}
                        </span>
                    )}
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        Salir
                    </Button>
                </div>
            }
        />
    );
}
