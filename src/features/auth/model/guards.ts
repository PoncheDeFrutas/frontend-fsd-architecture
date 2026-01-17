import { redirect } from "@tanstack/react-router";
import { queryClient } from "@/app/providers/query-client";
import { authKeys } from "./auth.keys";
import { authService } from "@/shared/api/services/auth.service";
import type { Permission } from "@/shared/api/http/types";
import { ApiError } from "@/shared/api/http";
import type { MeResponse } from "@/shared/api/schemas/auth.schemas";

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
        // other errors are rethrown
        return null;
    }
}

export function requireAuth() {
    return async () => {
        const me = await ensureMe();
        if (!me?.user) {
            throw redirect({ to: "/login" });
        }
    };
}

export function requireRole(role: "admin" | "user") {
    return async () => {
        const me = await ensureMe();
        if (!me?.user) throw redirect({ to: "/login" });
        if (me.user.role !== role) throw redirect({ to: "/forbidden" });
    };
}

export function requirePermission(permission: Permission) {
    return async () => {
        const me = await ensureMe();
        if (!me?.user) throw redirect({ to: "/login" });
        if (!me.user.permissions.includes(permission)) {
            throw redirect({ to: "/forbidden" });
        }
    };
}
