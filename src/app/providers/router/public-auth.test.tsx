import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { server } from "@/shared/mocks/server";
import { http, HttpResponse } from "msw";
import { ENDPOINTS } from "@/shared/api/config/endpoints";
import { ENV } from "@/shared/api/config/env";
import { AppProviders } from "@/app/providers";

const API = ENV.API_BASE_URL.replace(/\/$/, "");
const url = (path: string) => `${API}${path}`;

describe("Public routes", () => {
    let called = false;

    beforeEach(() => {
        called = false;
        server.use(
            http.get(url(ENDPOINTS.auth.me), () => {
                called = true;
                return HttpResponse.json({ user: null }, { status: 401 });
            }),
        );
    });

    afterEach(() => {
        server.resetHandlers();
    });

    it("does not call /auth/me on home", async () => {
        render(<AppProviders />);
        await screen.findByText(/Bienvenido/i);
        expect(called).toBe(false);
    });
});
