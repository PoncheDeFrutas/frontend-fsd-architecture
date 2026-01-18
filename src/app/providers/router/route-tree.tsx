import { RootRoute, Route, Outlet } from "@tanstack/react-router";
import HomePage from "@pages/home";
import LoginPage from "@/pages/login";
import ForbiddenPage from "@/pages/forbidden";
import NotFoundPage from "@/pages/_not-found";
import AdminPage from "@/pages/admin";
import OrdersPage from "@/pages/orders";

import { requireAuth, requireRole, requirePermission } from "@/features/auth";
import { PublicLayout } from "@/app/layouts/public-layout";
import { UserLayout } from "@/app/layouts/user-layout";
import { AdminLayout } from "@/app/layouts/admin-layout";

export const rootRoute = new RootRoute({
    component: () => (
        <div className="min-h-dvh bg-slate-50">
            <Outlet />
        </div>
    ),
    notFoundComponent: () => <NotFoundPage />,
});

export const publicLayoutRoute = new Route({
    getParentRoute: () => rootRoute,
    id: "public-layout",
    component: () => <PublicLayout />,
});

export const indexRoute = new Route({
    getParentRoute: () => publicLayoutRoute,
    path: "/",
    component: () => <HomePage />,
});

export const loginRoute = new Route({
    getParentRoute: () => publicLayoutRoute,
    path: "/login",
    component: () => <LoginPage />,
});

export const forbiddenRoute = new Route({
    getParentRoute: () => publicLayoutRoute,
    path: "/forbidden",
    component: () => <ForbiddenPage />,
});

export const userLayoutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/app",
    beforeLoad: requireAuth(),
    component: () => <UserLayout />,
});

export const ordersRoute = new Route({
    getParentRoute: () => userLayoutRoute,
    path: "orders",
    beforeLoad: requirePermission("orders:read"),
    component: () => <OrdersPage />,
});

export const privateRoute = new Route({
    getParentRoute: () => userLayoutRoute,
    path: "private",
    component: () => <div className="p-6">Private page</div>,
});

export const adminLayoutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/admin",
    beforeLoad: requireRole("admin"),
    component: () => <AdminLayout />,
});

export const adminRoute = new Route({
    getParentRoute: () => adminLayoutRoute,
    path: "/admin",
    component: () => <AdminPage />,
});

publicLayoutRoute.addChildren([indexRoute, loginRoute, forbiddenRoute]);
userLayoutRoute.addChildren([ordersRoute, privateRoute]);
adminLayoutRoute.addChildren([adminRoute]);

export const routeTree = rootRoute.addChildren([
    publicLayoutRoute,
    userLayoutRoute,
    adminLayoutRoute,
]);
