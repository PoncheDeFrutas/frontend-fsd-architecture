import { z } from "zod";
import { MeDtoSchema, UserDtoSchema } from "@/entities/user";

export const authUserSchema = UserDtoSchema;

export const meResponseSchema = MeDtoSchema;
export type MeResponseDto = z.infer<typeof meResponseSchema>;

/**
 * Schemas and Types for Sign In
 */
export const signInBodySchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});
export type SignInBody = z.infer<typeof signInBodySchema>;

/**
 * Schemas and Types for Token Response
 */
export const tokenResponseSchema = z.object({
    accessToken: z.string().min(1),
});
export type TokenResponse = z.infer<typeof tokenResponseSchema>;
