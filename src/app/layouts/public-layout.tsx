import { Outlet } from "@tanstack/react-router";
import { Container } from "@/shared/ui/layout/container";
import { PublicNavbar } from "@/widgets/public-navbar";

/**
 * Public layout component that includes the public navigation
 * bar and a container for the main content.
 * This layout is used for pages that are accessible to all users.
 * @return A React component representing the public layout.
 */
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
