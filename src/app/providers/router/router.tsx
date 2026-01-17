import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./route-tree";

const router = createRouter({
    routeTree,
    defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export function AppRouter() {
    return <RouterProvider router={router} />;
}
