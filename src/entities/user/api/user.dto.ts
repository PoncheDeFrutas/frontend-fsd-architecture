import { z } from "zod";

export const roleDtoSchema = z.union([z.literal("admin"), z.literal("user")]);
export type RoleDto = z.infer<typeof roleDtoSchema>;

export const permissionDtoSchema = z.union([
    z.literal("users:read"),
    z.literal("users:write"),
    z.literal("orders:read"),
    z.literal("orders:write"),
    z.literal("settings:manage"),
]);
export type PermissionDto = z.infer<typeof permissionDtoSchema>;

export const userDtoSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    role: roleDtoSchema,
    permissions: z.array(permissionDtoSchema),
});
export type UserDto = z.infer<typeof userDtoSchema>;

export const meDtoSchema = z.object({
    user: userDtoSchema,
});
export type MeDto = z.infer<typeof meDtoSchema>;
