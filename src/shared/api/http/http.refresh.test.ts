import { describe, it, expect } from "vitest";
import { authService } from "@/features/auth";
import { httpClient } from "@/shared/api/http/client";
import { setAccessToken } from "@/shared/api/http/auth/token-store";
import { ENDPOINTS } from "@/shared/api/config/endpoints";

describe("http refresh flow", () => {
    it("retries GET /me after 401 by refreshing token", async () => {
        // 1) Login to initialize MSW session (gives us a valid token)
        const { accessToken } = await authService.signIn({
            email: "admin@test.com",
            password: "123",
        });

        // 2) Force an invalid token locally so /me returns 401
        setAccessToken("invalid_token");

        // 3) Call /me via the raw axios instance to ensure interceptors run
        const res = await httpClient.get(ENDPOINTS.auth.me);

        // 4) Should succeed after refresh+retry
        expect(res.data.user.email).toBe("admin@test.com");

        // (opcional) sanity check: the original token is not the invalid one
        expect(accessToken).not.toBe("invalid_token");
    });
});
