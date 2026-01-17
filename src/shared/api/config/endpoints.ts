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
