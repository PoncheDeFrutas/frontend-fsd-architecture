import { Link } from "@tanstack/react-router";
import { Container } from "@/shared/ui/layout/container";

const links = [
    { to: "/", label: "Inicio" },
    { to: "/login", label: "Login" },
    { to: "/app/orders", label: "Pedidos" },
];

export function PublicNavbar() {
    return (
        <nav className="border-b bg-white">
            <Container className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-base font-semibold text-slate-900">
                    Public
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
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
            </Container>
        </nav>
    );
}
