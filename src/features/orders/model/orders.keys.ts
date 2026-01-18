/**
 * Keys for orders related queries and mutations.
 */
export const ordersKeys = {
    all: ["orders"] as const,
    list: () => [...ordersKeys.all, "list"] as const,
} as const;
