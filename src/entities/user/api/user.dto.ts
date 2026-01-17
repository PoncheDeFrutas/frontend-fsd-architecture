import { z } from "zod";

export const RoleDtoSchema = z.union([z.literal("admin"), z.literal("user")]);
export type RoleDto = z.infer<typeof RoleDtoSchema>;

export const PermissionDtoSchema = z.union([
    z.literal("users:read"),
    z.literal("users:write"),
    z.literal("orders:read"),
    z.literal("orders:write"),
    z.literal("settings:manage"),
]);
export type PermissionDto = z.infer<typeof PermissionDtoSchema>;

export const UserDtoSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    role: RoleDtoSchema,
    permissions: z.array(PermissionDtoSchema),
});
export type UserDto = z.infer<typeof UserDtoSchema>;

export const MeDtoSchema = z.object({
    user: UserDtoSchema,
});
export type MeDto = z.infer<typeof MeDtoSchema>;
