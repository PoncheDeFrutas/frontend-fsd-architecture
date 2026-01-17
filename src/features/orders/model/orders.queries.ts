import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/features/orders";
import { ordersKeys } from "./orders.keys";

export function useOrdersQuery() {
    return useQuery({
        queryKey: ordersKeys.list(),
        queryFn: ({ signal }) => ordersService.list(signal),
        staleTime: 60_000,
    });
}
