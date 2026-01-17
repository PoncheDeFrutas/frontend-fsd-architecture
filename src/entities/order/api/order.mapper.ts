import type { Order } from "../model/types";
import type { OrderDto } from "./order.dto";

export function orderFromDto(dto: OrderDto): Order {
    return {
        id: dto.id,
        item: dto.item,
        status: dto.status,
    };
}

export function ordersFromDto(dtos: OrderDto[]): Order[] {
    return dtos.map(orderFromDto);
}
