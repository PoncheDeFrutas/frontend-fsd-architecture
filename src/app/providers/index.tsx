import { ThemeProvider } from "./theme";
import { QueryProvider } from "./query-client";
import { AppRouter } from "./router";

export function AppProviders() {
    return (
        <ThemeProvider>
            <QueryProvider>
                <AppRouter />
            </QueryProvider>
        </ThemeProvider>
    );
}

export { ThemeProvider } from "./theme";
