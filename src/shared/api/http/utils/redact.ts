const SENSITIVE_KEYS = new Set([
    "authorization",
    "cookie",
    "set-cookie",
    "x-csrf-token",
    "x-xsrf-token",
]);

/**
 * Redacts sensitive information from HTTP headers.
 *
 * @param headers - The HTTP headers to redact.
 * @returns A new object with sensitive headers redacted.
 */
export function redactHeaders(
    headers: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
    if (!headers) return headers;

    const out: Record<string, unknown> = {};

    for (const [k, v] of Object.entries(headers)) {
        if (SENSITIVE_KEYS.has(k.toLowerCase())) {
            out[k] = "[REDACTED]";
        } else {
            out[k] = v;
        }
    }
    return out;
}
