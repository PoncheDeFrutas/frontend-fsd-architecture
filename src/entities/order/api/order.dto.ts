import { z } from "zod";

export const OrderDtoSchema = z.object({
    id: z.string(),
    item: z.string(),
    status: z.union([z.literal("processing"), z.literal("shipped")]),
});
export type OrderDto = z.infer<typeof OrderDtoSchema>;

export const OrdersResponseSchema = z.object({
    orders: z.array(OrderDtoSchema),
});
export type OrdersResponseDto = z.infer<typeof OrdersResponseSchema>;
