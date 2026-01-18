import { Outlet } from "@tanstack/react-router";
import { Container } from "@/shared/ui/layout/container";
import { PublicNavbar } from "@/widgets/public-navbar";

export function PublicLayout() {
    return (
        <div className="min-h-dvh bg-slate-50">
            <PublicNavbar />
            <main className="py-6">
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    );
}
