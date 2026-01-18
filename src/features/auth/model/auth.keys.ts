/**
 * Keys for authentication-related queries and mutations.
 * Used for caching and invalidation.
 */
export const authKeys = {
    all: ["auth"] as const,
    me: () => [...authKeys.all, "me"] as const,
} as const;
