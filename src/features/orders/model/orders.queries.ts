import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/features/orders";
import { ordersKeys } from "./orders.keys";

/**
 * Hook to fetch the list of orders using React Query.
 *
 * @returns The result of the orders query.
 */
export function useOrdersQuery() {
    return useQuery({
        queryKey: ordersKeys.list(),
        queryFn: ({ signal }) => ordersService.list(signal),
        staleTime: 60_000,
    });
}
