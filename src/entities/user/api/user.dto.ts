import { z } from "zod";

/**
 * Schema and Type for Role Data Transfer Object (DTO).
 * Represents the role assigned to a user.
 */
export const RoleDtoSchema = z.union([z.literal("admin"), z.literal("user")]);
export type RoleDto = z.infer<typeof RoleDtoSchema>;

/**
 * Schema and Type for Permission Data Transfer Object (DTO).
 * Represents the various permissions that can be assigned to a user.
 */
export const PermissionDtoSchema = z.union([
    z.literal("users:read"),
    z.literal("users:write"),
    z.literal("orders:read"),
    z.literal("orders:write"),
    z.literal("settings:manage"),
]);
export type PermissionDto = z.infer<typeof PermissionDtoSchema>;

/**
 * Schema and Type for User Data Transfer Object (DTO).
 * Represents a user with their associated details.
 */
export const UserDtoSchema = z.object({
    id: z.string(),
    email: z.email(),
    role: RoleDtoSchema,
    permissions: z.array(PermissionDtoSchema),
});
export type UserDto = z.infer<typeof UserDtoSchema>;

/**
 * Schema and Type for Me Data Transfer Object (DTO).
 * Represents the currently authenticated user.
 */
export const MeDtoSchema = z.object({
    user: UserDtoSchema,
});
export type MeDto = z.infer<typeof MeDtoSchema>;
