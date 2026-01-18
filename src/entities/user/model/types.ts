/**
 * Types related to the User entity.
 */
export type Role = "admin" | "user";

export type Permission =
    | "users:read"
    | "users:write"
    | "orders:read"
    | "orders:write"
    | "settings:manage";

export type User = {
    id: string;
    email: string;
    role: Role;
    permissions: Permission[];
};
