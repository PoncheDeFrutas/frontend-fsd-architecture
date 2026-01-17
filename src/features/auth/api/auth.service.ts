import { ENDPOINTS } from "@/shared/api/config/endpoints";
import { http, httpz } from "@/shared/api/http";
import { clearAccessToken, setAccessToken } from "@/shared/api/http/auth/token-store";
import { meFromDto, type User } from "@/entities/user";

import {
    meResponseSchema,
    signInBodySchema,
    tokenResponseSchema,
    type SignInBody,
    type TokenResponse,
} from "./auth.schemas";

export type MeResponse = {
    user: User;
};

export const authService = {
    /**
     * Returns the current session user (role + permissions).
     * Backend should return 401 if not authenticated.
     */
    async me(signal?: AbortSignal): Promise<MeResponse> {
        const dto = await httpz.get(meResponseSchema, ENDPOINTS.auth.me, {
            signal,
        });
        return meFromDto(dto);
    },

    /**
     * Sign in with credentials.
     * If backend returns accessToken, we store it in memory.
     * Refresh token should be set by backend as HttpOnly cookie.
     */
    async signIn(
        body: SignInBody,
        signal?: AbortSignal,
    ): Promise<TokenResponse> {
        const parsed = signInBodySchema.safeParse(body);
        if (!parsed.success) {
            // keep it simple: throw first issue as an Error
            throw new Error(
                parsed.error.issues[0]?.message ?? "Invalid sign-in data",
            );
        }

        const res = await httpz.post(
            tokenResponseSchema,
            ENDPOINTS.auth.signIn,
            parsed.data,
            {
                signal,
            },
        );

        setAccessToken(res.accessToken);
        return res;
    },

    /**
     * Sign out.
     * Backend should clear refresh cookie (HttpOnly).
     * We clear the in-memory access token.
     */
    async signOut(signal?: AbortSignal): Promise<void> {
        try {
            await http.post<unknown>(ENDPOINTS.auth.signOut, undefined, {
                signal,
            });
        } finally {
            clearAccessToken();
        }
    },

    /**
     * Optional manual refresh.
     * Note: The automatic refresh is already handled in http/auth/refresh.ts.
     * This is useful if you want to refresh proactively (e.g. on app start).
     */
    async refresh(signal?: AbortSignal): Promise<TokenResponse> {
        const res = await httpz.post(
            tokenResponseSchema,
            ENDPOINTS.auth.refresh,
            undefined,
            {
                signal,
            },
        );
        setAccessToken(res.accessToken);
        return res;
    },
} as const;
