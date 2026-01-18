import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "@/shared/mocks/server";
import { http, HttpResponse } from "msw";
import { ENDPOINTS } from "@/shared/api/config/endpoints";
import { ENV } from "@/shared/api/config/env";
import { authService } from "@/features/auth";
import { queryClient } from "@/shared/lib/react-query";
import { AppProviders } from "@/app/providers";

const API = ENV.API_BASE_URL.replace(/\/$/, "");
const url = (path: string) => `${API}${path}`;

describe("OrdersPage route", () => {
    beforeEach(async () => {
        queryClient.clear();
        window.history.pushState({}, "", "/orders");
        await authService.signIn({ email: "admin@test.com", password: "123" });
    });

    afterEach(() => {
        server.resetHandlers();
    });

    it("renders success state with list", async () => {
        render(<AppProviders />);

        await waitFor(() => screen.getByText("Pedidos"));
        expect(screen.getByText("Libro FSD")).toBeTruthy();
    });

    it("renders empty state", async () => {
        server.use(
            http.get(url(ENDPOINTS.orders.list), () =>
                HttpResponse.json({ orders: [] }),
            ),
        );

        render(<AppProviders />);

        await waitFor(() => screen.getByText("No hay pedidos aún."));
    });
});
