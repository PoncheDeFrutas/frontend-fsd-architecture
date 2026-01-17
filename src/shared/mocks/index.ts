import { authHandlers } from "./handlers/auth.handlers";
import { ordersHandlers } from "./handlers/orders.handlers";

export const handlers = [...authHandlers, ...ordersHandlers] as const;
