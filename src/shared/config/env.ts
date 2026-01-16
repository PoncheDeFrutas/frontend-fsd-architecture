import { z } from 'zod';

const envSchema = z.object({
    VITE_API_BASE_URL: z.url().optional(),
    VITE_API_TIMEOUT_MS: z.coerce.number().int().positive().optional(),
    VITE_API_DEBUG: z.coerce.boolean().optional(),
})

const parsed = envSchema.safeParse(import.meta.env);
const env = parsed.success ? parsed.data : {};

export const ENV = {
    API_BASE_URL: env.VITE_API_BASE_URL ?? 'https://localhost:3000',
    API_TIMEOUT_MS: env.VITE_API_TIMEOUT_MS ?? 15000,
    API_DEBUG: env.VITE_API_DEBUG ?? false,
} as const;
