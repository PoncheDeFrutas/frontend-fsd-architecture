import { redirect } from "@tanstack/react-router";
import { queryClient } from "@/shared/lib/react-query";
import { authKeys } from "./auth.keys";
import { authService, type MeResponse } from "@/features/auth";
import type { Permission, Role } from "@/entities/user";
import { ApiError } from "@/shared/api/http";

/**
 * Ensures that the /me data is available and fresh.
 * Returns the MeResponse or null if anonymous.
 * Used in route guards.
 */
async function ensureMe(): Promise<MeResponse | null> {
    try {
        const me = await queryClient.ensureQueryData({
            queryKey: authKeys.me(),
            queryFn: ({ signal }) => authService.me(signal),
            staleTime: 60_000,
            retry: false,
        });
        return me;
    } catch (err) {
        // 401 => anonymous
        if (err instanceof ApiError && err.status === 401) return null;
        // other errors: treat as anonymous (could bubble up later if needed)
        return null;
    }
}

/**
 * Route guard: requires authentication.
 * Redirects to /login if not authenticated.
 * @returns Route loader function
 */
export function requireAuth() {
    return async () => {
        const me = await ensureMe();
        if (!me?.user) {
            throw redirect({ to: "/login" as unknown as "/app" });
        }
    };
}

/**
 * Route guard: requires specific role.
 * Redirects to /login if not authenticated.
 * Redirects to /forbidden if role does not match.
 * @param role Required role
 * @returns Route loader function
 */
export function requireRole(role: Role) {
    return async () => {
        const me = await ensureMe();
        if (!me?.user) throw redirect({ to: "/login" as unknown as "/app" });
        if (me.user.role !== role)
            throw redirect({ to: "/forbidden" as unknown as "/app" });
    };
}

/**
 * Route guard: requires specific permission.
 * Redirects to /login if not authenticated.
 * Redirects to /forbidden if permission is missing.
 * @param permission Required permission
 * @returns Route loader function
 */
export function requirePermission(permission: Permission) {
    return async () => {
        const me = await ensureMe();
        if (!me?.user) throw redirect({ to: "/login" as unknown as "/app" });
        if (!me.user.permissions.includes(permission)) {
            throw redirect({ to: "/forbidden" as unknown as "/app" });
        }
    };
}
