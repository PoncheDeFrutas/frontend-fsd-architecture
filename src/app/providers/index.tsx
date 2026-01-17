import type { ReactNode } from "react";
import { QueryProvider } from "./query-client";
import { AuthProvider } from "@/features/auth/model/auth.provider";

type Props = { children: ReactNode };

export function AppProviders({ children }: Props) {
    return (
        <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
    );
}
