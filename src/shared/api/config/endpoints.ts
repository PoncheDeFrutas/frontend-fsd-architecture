/**
 * API Endpoints configuration.
 * Centralized definitions of all API endpoints used in the application.
 * This helps in maintaining and updating endpoint URLs in a single location.
 * Each endpoint is organized by feature for better clarity.
 * @module endpoints
 */
export const ENDPOINTS = {
    auth: {
        refresh: "/auth/refresh",
        me: "/auth/me",
        signIn: "/auth/sign-in",
        signOut: "/auth/sign-out",
    },
    orders: {
        list: "/orders",
    },
} as const;
