import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService, type MeResponse, type SignInBody } from "@/features/auth";
import { authKeys } from "./auth.keys";

/**
 * Fetches the current authenticated user's information.
 * @return A React Query object containing the user's information.
 */
export function useMeQuery() {
    return useQuery({
        queryKey: authKeys.me(),
        queryFn: ({ signal }) => authService.me(signal),
        staleTime: 60_000,
        retry: false,
    });
}

/**
 * Mutation hook for signing in a user.
 * @return A React Query mutation object for signing in.
 */
export function useSignInMutation() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (body: SignInBody) => authService.signIn(body),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}

/**
 * Mutation hook for signing out a user.
 * @return A React Query mutation object for signing out.
 */
export function useSignOutMutation() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: () => authService.signOut(),
        onSuccess: async () => {
            await qc.removeQueries({ queryKey: authKeys.me() });
        },
        onError: async () => {
            await qc.removeQueries({ queryKey: authKeys.me() });
        },
    });
}

/**
 * Sets the cached user information in the React Query client.
 * @param qc The React Query client.
 * @param me The user information to cache.
 */
export function setMeCache(
    qc: ReturnType<typeof useQueryClient>,
    me: MeResponse,
) {
    qc.setQueryData(authKeys.me(), me);
}
