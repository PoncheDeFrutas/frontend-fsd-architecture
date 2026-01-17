import { describe, it, expect } from "vitest";
import { authService } from "@/features/auth";

describe("authService + MSW", () => {
    it("signIn then me works", async () => {
        await authService.signIn({ email: "admin@test.com", password: "123" });
        const me = await authService.me();
        expect(me.user.role).toBe("admin");
    });
});
