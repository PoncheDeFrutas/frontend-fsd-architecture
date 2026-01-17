import { describe, it, expect } from "vitest";
import { ordersService } from "@/features/orders";
import { authService } from "@/features/auth";
import { ApiError } from "@/shared/api/http";

describe("ordersService + MSW", () => {
    it("requires authentication", async () => {
        await expect(ordersService.list()).rejects.toBeInstanceOf(ApiError);
    });

    it("returns orders after sign-in", async () => {
        await authService.signIn({ email: "admin@test.com", password: "123" });
        const orders = await ordersService.list();
        expect(orders.length).toBeGreaterThan(0);
        expect(orders[0]).toHaveProperty("item");
    });
});
