import { redirect } from "@tanstack/react-router";
import { queryClient } from "@/shared/lib/react-query";
import { authKeys } from "./auth.keys";
import { authService, type MeResponse } from "@/features/auth";
import type { Permission, Role } from "@/entities/user";
import { ApiError } from "@/shared/api/http";

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

export function requireAuth() {
    return async () => {
        const me = await ensureMe();
        if (!me?.user) {
            throw redirect({ to: "/login" as unknown as "/app" });
        }
    };
}

export function requireRole(role: Role) {
    return async () => {
        const me = await ensureMe();
        if (!me?.user) throw redirect({ to: "/login" as unknown as "/app" });
        if (me.user.role !== role)
            throw redirect({ to: "/forbidden" as unknown as "/app" });
    };
}

export function requirePermission(permission: Permission) {
    return async () => {
        const me = await ensureMe();
        if (!me?.user) throw redirect({ to: "/login" as unknown as "/app" });
        if (!me.user.permissions.includes(permission)) {
            throw redirect({ to: "/forbidden" as unknown as "/app" });
        }
    };
}
