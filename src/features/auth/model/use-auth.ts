import { useContext } from "react";
import { AuthContext } from "./auth.context";

/**
 * Hook to access authentication context.
 * Throws error if used outside of AuthProvider.
 * @returns AuthContextValue
 */
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
    return ctx;
}

/**
 * Hook to access authentication context optionally.
 * Returns null if used outside of AuthProvider.
 * @returns AuthContextValue | null
 */
export function useOptionalAuth() {
    return useContext(AuthContext);
}
