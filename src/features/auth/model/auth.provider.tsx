import { ApiError } from "@/shared/api/http";
import type { User } from "@/entities/user";
import { useEffect, useMemo, type ReactNode } from "react";
import { initAuthEventsBridge } from "./auth.events-bridge";
import {
    useMeQuery,
    useSignInMutation,
    useSignOutMutation,
} from "./auth.queries";
import {
    AuthContext,
    type AuthContextValue,
    type AuthStatus,
} from "./auth.context";

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    // init bridge once
    useEffect(() => {
        const unsubscribe = initAuthEventsBridge();
        return () => unsubscribe();
    }, []);

    const meQuery = useMeQuery();
    const signInMutation = useSignInMutation();
    const signOutMutation = useSignOutMutation();

    // Determine auth status
    const status: AuthStatus = useMemo(() => {
        if (meQuery.isLoading) return "loading";

        // If /me failed with 401 => anonymous (common case)
        if (meQuery.isError) {
            const err = meQuery.error;
            if (err instanceof ApiError && err.status === 401)
                return "anonymous";
            // other errors (network/5xx) still means "anonymous" from UI PoV,
            // but you might show a banner later. We'll keep it simple:
            return "anonymous";
        }

        return meQuery.data?.user ? "authenticated" : "anonymous";
    }, [meQuery.isLoading, meQuery.isError, meQuery.data, meQuery.error]);

    const user: User | null = meQuery.data?.user ?? null;

    const value: AuthContextValue = useMemo(() => {
        const perms = new Set(user?.permissions ?? []);

        return {
            status,
            user,

            isAdmin: user?.role === "admin",
            hasPermission: (perm) => perms.has(perm),

            signIn: async (body) => {
                // throws if invalid or fails
                await signInMutation.mutateAsync(body);
            },

            signOut: async () => {
                await signOutMutation.mutateAsync();
            },

            meQuery,
        };
    }, [status, user, meQuery, signInMutation, signOutMutation]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
