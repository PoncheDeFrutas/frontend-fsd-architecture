import { Outlet } from "@tanstack/react-router";
import { Container } from "@/shared/ui/layout/container";
import { AdminNavbar } from "@/widgets/admin-navbar";
import { AuthProvider } from "@/features/auth";

export function AdminLayout() {
    return (
        <AuthProvider>
            <div className="min-h-dvh bg-slate-900 text-white">
                <AdminNavbar />
                <main className="py-6">
                    <Container>
                        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 shadow">
                            <Outlet />
                        </div>
                    </Container>
                </main>
            </div>
        </AuthProvider>
    );
}
