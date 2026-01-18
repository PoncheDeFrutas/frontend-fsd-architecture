import { http, HttpResponse } from "msw";
import { ENDPOINTS } from "@/shared/api/config/endpoints";
import { ENV } from "@/shared/api/config/env";
import { session, requireAuth } from "../session";

const API = ENV.API_BASE_URL.replace(/\/$/, "");
const url = (path: string) => `${API}${path}`;

const ORDERS = [
    { id: "ord_1", item: "Libro FSD", status: "processing" },
    { id: "ord_2", item: "Teclado mecánico", status: "shipped" },
] as const;

export const ordersHandlers = [
    http.get(url(ENDPOINTS.orders.list), ({ request }) => {
        const authed = requireAuth(request) || session.isAuthenticated;
        if (!authed || !session.user) {
            return HttpResponse.json(
                { code: "UNAUTHORIZED", message: "Not authenticated" },
                { status: 401 },
            );
        }

        const params = new URL(request.url).searchParams;
        const mode = params.get("mode");

        if (mode === "error") {
            return HttpResponse.json(
                { code: "SERVER_ERROR", message: "Orders service failed" },
                { status: 500 },
            );
        }

        if (mode === "empty") {
            return HttpResponse.json({ orders: [] });
        }

        if (!session.user.permissions.includes("orders:read")) {
            return HttpResponse.json(
                { code: "FORBIDDEN", message: "Missing orders:read" },
                { status: 403 },
            );
        }

        return HttpResponse.json({ orders: ORDERS });
    }),
] as const;
