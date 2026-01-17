import { QueryProvider } from "./query-client";
import { AuthProvider } from "@/features/auth";
import { AppRouter } from "./router";

export function AppProviders() {
    return (
        <QueryProvider>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </QueryProvider>
    );
}
