import { z } from "zod";

/**
 * Schema and Type for Order Data Transfer Object (DTO).
 * Represents an order with its associated details.
 */
export const OrderDtoSchema = z.object({
    id: z.string(),
    item: z.string(),
    status: z.union([z.literal("processing"), z.literal("shipped")]),
});
export type OrderDto = z.infer<typeof OrderDtoSchema>;

/**
 * Schema and Type for Orders Response Data Transfer Object (DTO).
 * Represents a response containing multiple orders.
 */
export const OrdersResponseSchema = z.object({
    orders: z.array(OrderDtoSchema),
});
export type OrdersResponseDto = z.infer<typeof OrdersResponseSchema>;
