import { QueryClient } from "@tanstack/react-query";
import { ENV } from "@/shared/api/config/env";

/**
 * Creates and configures a React Query client.
 * @returns A configured QueryClient instance.
 */
export function createQueryClient(): QueryClient {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
            },
            mutations: {
                retry: false,
            },
        },
    });
}

export const queryClient = createQueryClient();

export const isQueryDevtoolsEnabled = ENV.API_DEBUG;
