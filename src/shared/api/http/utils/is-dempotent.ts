/**
 * Checks if the given HTTP method is idempotent.
 *
 * @param method - The HTTP method to check.
 * @returns True if the method is idempotent, false otherwise.
 */
export function isIdempotentMethod(method: string): boolean {
    const m = (method || "").toUpperCase();
    return m == "GET" || m == "HEAD" || m == "OPTIONS";
}
