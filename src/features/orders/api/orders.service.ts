import { ENDPOINTS } from "@/shared/api/config/endpoints";
import { httpz } from "@/shared/api/http";
import {
    OrdersResponseSchema,
    ordersFromDto,
    type Order,
} from "@/entities/order";

/**
 * Service for interacting with orders API endpoints.
 * Provides methods to fetch and manipulate order data.
 */
export const ordersService = {
    async list(signal?: AbortSignal): Promise<Order[]> {
        const dto = await httpz.get(
            OrdersResponseSchema,
            ENDPOINTS.orders.list,
            { signal },
        );
        return ordersFromDto(dto.orders);
    },
} as const;
