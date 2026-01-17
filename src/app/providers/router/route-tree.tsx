import { RootRoute, Route } from "@tanstack/react-router";
import HomePage from "@pages/home";
import LoginPage from "@/pages/login";
import ForbiddenPage from "@/pages/forbidden";
import NotFoundPage from "@/pages/_not-found";
import AdminPage from "@/pages/admin";

import { requireAuth, requireRole } from "@/features/auth";

export const rootRoute = new RootRoute({
    component: () => <HomePage />,
    notFoundComponent: () => <NotFoundPage />,
});

import { Outlet } from "@tanstack/react-router";
rootRoute.update({
    component: () => (
        <div className="min-h-dvh">
            <Outlet />
        </div>
    ),
});

export const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <HomePage />,
});

export const loginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: () => <LoginPage />,
});

export const forbiddenRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/forbidden",
    component: () => <ForbiddenPage />,
});

export const privateRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/private",
    beforeLoad: requireAuth(),
    component: () => <div className="p-6">Private page</div>,
});

export const adminRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/admin",
    beforeLoad: requireRole("admin"),
    component: () => <AdminPage />,
});

export const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    forbiddenRoute,
    privateRoute,
    adminRoute,
]);
