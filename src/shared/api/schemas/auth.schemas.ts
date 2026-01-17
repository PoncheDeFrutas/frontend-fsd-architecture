import { z } from "zod";

export const roleSchema = z.union([z.literal("admin"), z.literal("user")]);

export const permissionSchema = z.union([
    z.literal("users:read"),
    z.literal("users:write"),
    z.literal("orders:read"),
    z.literal("orders:write"),
    z.literal("settings:manage"),
]);

export const authUserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    role: roleSchema,
    permissions: z.array(permissionSchema),
});

export const meResponseSchema = z.object({
    user: authUserSchema,
});
export type MeResponse = z.infer<typeof meResponseSchema>;

export const signInBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});
export type SignInBody = z.infer<typeof signInBodySchema>;

export const tokenResponseSchema = z.object({
    accessToken: z.string().min(1),
});
export type TokenResponse = z.infer<typeof tokenResponseSchema>;
