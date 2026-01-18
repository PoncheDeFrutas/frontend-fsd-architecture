import type { ZodType } from "zod";
import { ApiError } from "./errors/api-error";
import { http } from "./client-helpers";
import type { HttpRequestConfig } from "./client-helpers";

/**
 * Throws a standardized ApiError for Zod validation issues.
 * @param args - The arguments containing error details.
 */
function throwZodError(args: {
    url: string;
    method: string;
    issues: unknown;
    raw: unknown;
}): never {
    throw new ApiError({
        kind: "unknown",
        message: "Invalid API response (schema mismatch)",
        code: "ZOD_PARSE_ERROR",
        details: {
            url: args.url,
            method: args.method,
            issues: args.issues,
            raw: args.raw,
        },
        url: args.url,
        method: args.method,
    });
}

/**
 * Parses raw data using the provided Zod schema or throws an ApiError if parsing fails.
 * @param schema - The Zod schema to validate against.
 * @param raw - The raw data to be parsed.
 * @param url - The URL of the API request.
 * @param method - The HTTP method of the API request.
 * @returns The parsed data of type T.
 */
async function parseOrThrow<T>(
    schema: ZodType<T>,
    raw: unknown,
    url: string,
    method: string,
): Promise<T> {
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
        throwZodError({
            url,
            method,
            issues: parsed.error.issues,
            raw,
        });
    }
    return parsed.data;
}

/**
 * HTTP client with Zod schema validation for responses.
 * Each method fetches data and validates it against the provided schema.
 * If validation fails, an ApiError is thrown.
 * @see http - for the underlying HTTP client without schema validation.
 */
export const httpz = {
    async get<T>(
        schema: ZodType<T>,
        url: string,
        config?: HttpRequestConfig,
    ): Promise<T> {
        const raw = await http.get<unknown>(url, config);
        return parseOrThrow(schema, raw, url, "GET");
    },

    async delete<T>(
        schema: ZodType<T>,
        url: string,
        config?: HttpRequestConfig,
    ): Promise<T> {
        const raw = await http.delete<unknown>(url, config);
        return parseOrThrow(schema, raw, url, "DELETE");
    },

    async post<T, B = unknown>(
        schema: ZodType<T>,
        url: string,
        body?: B,
        config?: HttpRequestConfig,
    ): Promise<T> {
        const raw = await http.post<unknown, B>(url, body, config);
        return parseOrThrow(schema, raw, url, "POST");
    },

    async put<T, B = unknown>(
        schema: ZodType<T>,
        url: string,
        body?: B,
        config?: HttpRequestConfig,
    ): Promise<T> {
        const raw = await http.put<unknown, B>(url, body, config);
        return parseOrThrow(schema, raw, url, "PUT");
    },

    async patch<T, B = unknown>(
        schema: ZodType<T>,
        url: string,
        body?: B,
        config?: HttpRequestConfig,
    ): Promise<T> {
        const raw = await http.patch<unknown, B>(url, body, config);
        return parseOrThrow(schema, raw, url, "PATCH");
    },
} as const;
