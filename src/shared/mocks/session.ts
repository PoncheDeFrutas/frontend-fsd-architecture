import type { Permission, Role } from "@/entities/user";

export type MockSession = {
    isAuthenticated: boolean;
    accessToken: string | null;
    user: {
        id: string;
        email: string;
        role: Role;
        permissions: Permission[];
    } | null;
};

export const session: MockSession = {
    isAuthenticated: false,
    accessToken: null,
    user: null,
};

export function makeToken() {
    return `mock_${Math.random().toString(16).slice(2)}`;
}

export function requireAuth(request: Request): boolean {
    const auth = request.headers.get("authorization");
    if (!auth) return false;
    const token = auth.replace(/^Bearer\\s+/i, "").trim();
    return Boolean(token) && token === session.accessToken && session.isAuthenticated;
}
