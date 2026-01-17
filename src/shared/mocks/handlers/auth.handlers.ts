import { http, HttpResponse } from "msw";
import { ENDPOINTS } from "@/shared/api/config/endpoints";
import type { Role, Permission } from "@/shared/api/http/types";
import { ENV } from "@/shared/api/config/env";

const API = ENV.API_BASE_URL.replace(/\/$/, "");

const url = (path: string) => `${API}${path}`;

type MockSession = {
    isAuthenticated: boolean;
    accessToken: string | null;
    user: {
        id: string;
        email: string;
        role: Role;
        permissions: Permission[];
    } | null;
};

const session: MockSession = {
    isAuthenticated: false,
    accessToken: null,
    user: null
};

function makeToken() {
    return `mock_${Math.random().toString(16).slice(2)}`;
}

function requireAuth(request: Request): boolean {
    const auth = request.headers.get("authorization");
    if (!auth) return false;
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    return (
        Boolean(token) &&
        token === session.accessToken &&
        session.isAuthenticated
    );
}

export const authHandlers = [
    // SIGN IN
    http.post(url(ENDPOINTS.auth.signIn), async ({ request }) => {
        const body = (await request.json().catch(() => null)) as {
            email?: string;
            password?: string;
        } | null;

        if (!body?.email || !body?.password) {
            return HttpResponse.json(
                {
                    code: "VALIDATION_ERROR",
                    message: "email and password are required",
                },
                { status: 400 },
            );
        }

        const role: Role = body.email.includes("admin") ? "admin" : "user";

        const permissions: Permission[] =
            role === "admin"
                ? [
                      "users:read",
                      "users:write",
                      "orders:read",
                      "orders:write",
                      "settings:manage",
                  ]
                : ["orders:read"];

        session.isAuthenticated = true;
        session.accessToken = makeToken();
        session.user = {
            id: "u_123",
            email: body.email,
            role,
            permissions,
        };

        return HttpResponse.json({ accessToken: session.accessToken });
    }),

    // ME
    http.get(url(ENDPOINTS.auth.me), ({ request }) => {
        // DEV convenience: if session is authenticated, allow /me without Authorization
        // (simulates cookie-based session where browser would carry HttpOnly cookie)
        const hasAuthHeader = requireAuth(request);

        if ((!hasAuthHeader && !session.isAuthenticated) || !session.user) {
            return HttpResponse.json(
                { code: "UNAUTHORIZED", message: "Not authenticated" },
                { status: 401 },
            );
        }

        return HttpResponse.json({ user: session.user });
    }),

    // REFRESH
    http.post(url(ENDPOINTS.auth.refresh), () => {
        if (!session.isAuthenticated || !session.user) {
            return HttpResponse.json(
                { code: "UNAUTHORIZED", message: "Refresh failed" },
                { status: 401 },
            );
        }

        session.accessToken = makeToken();
        return HttpResponse.json({ accessToken: session.accessToken });
    }),

    // SIGN OUT
    http.post(url(ENDPOINTS.auth.signOut), () => {
        session.isAuthenticated = false;
        session.accessToken = null;
        session.user = null;
        return HttpResponse.json({ ok: true });
    }),
];
