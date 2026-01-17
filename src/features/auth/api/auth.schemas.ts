import { z } from "zod";
import { MeDtoSchema, UserDtoSchema } from "@/entities/user";

export const authUserSchema = UserDtoSchema;

export const meResponseSchema = MeDtoSchema;
export type MeResponseDto = z.infer<typeof meResponseSchema>;

export const signInBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});
export type SignInBody = z.infer<typeof signInBodySchema>;

export const tokenResponseSchema = z.object({
    accessToken: z.string().min(1),
});
export type TokenResponse = z.infer<typeof tokenResponseSchema>;
