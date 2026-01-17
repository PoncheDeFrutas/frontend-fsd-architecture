import { z } from "zod";
import { meDtoSchema, userDtoSchema } from "@/entities/user/api/user.dto";

export const authUserSchema = userDtoSchema;

export const meResponseSchema = meDtoSchema;
export type MeResponseDto = z.infer<typeof meResponseSchema>;

export const signInBodySchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});
export type SignInBody = z.infer<typeof signInBodySchema>;

export const tokenResponseSchema = z.object({
    accessToken: z.string().min(1),
});
export type TokenResponse = z.infer<typeof tokenResponseSchema>;
