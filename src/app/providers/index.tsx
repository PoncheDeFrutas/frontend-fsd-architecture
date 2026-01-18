import { QueryProvider } from "./query-client";
import { AppRouter } from "./router";

export function AppProviders() {
    return (
        <QueryProvider>
            <AppRouter />
        </QueryProvider>
    );
}
