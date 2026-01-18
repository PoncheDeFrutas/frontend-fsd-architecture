import { Outlet } from "@tanstack/react-router";
import { Container } from "@/shared/ui/layout/container";
import { UserNavbar } from "@/widgets/user-navbar";
import { AuthProvider } from "@/features/auth";

/**
 * User layout component that includes the user navigation
 * bar and a container for the main content.
 * This layout is used for pages that require user authentication.
 * @return A React component representing the user layout.
 */
export function UserLayout() {
    return (
        <AuthProvider>
            <div className="min-h-dvh bg-slate-50">
                <UserNavbar />
                <main className="py-6">
                    <Container>
                        <Outlet />
                    </Container>
                </main>
            </div>
        </AuthProvider>
    );
}
