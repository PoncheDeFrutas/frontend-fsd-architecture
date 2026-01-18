import { Navbar, type NavbarItem } from "@/shared/ui/navigation/navbar";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

const items: NavbarItem[] = [
    { to: "/", label: "Inicio", end: true },
    { to: "/ui", label: "UI" },
    { to: "/login", label: "Login" },
    { to: "/app/orders", label: "Pedidos" },
];

export function PublicNavbar() {
    return (
        <Navbar
            brand="Public"
            items={items}
            variant="public"
            rightSlot={<ThemeToggle />}
        />
    );
}
