import type { ApiError } from "../errors/api-error";
import { isIdempotentMethod } from "../utils/is-idempotent.ts";

export type RetryDecision = {
    shouldRetry: boolean;
    reason?: string;
};

/**
 * Determines whether an HTTP request should be retried based on the provided error,
 * HTTP method, current attempt number, and maximum allowed attempts.
 * @param args - The arguments for the retry decision.
 * @param args.error - The ApiError encountered during the request.
 * @param args.method - The HTTP method used for the request.
 * @param args.attempt - The current attempt number (starting from 1).
 * @param args.maxAttempts - The maximum number of allowed attempts.
 * @returns A RetryDecision indicating whether to retry and the reason.
 */
export function shouldRetry(args: {
    error: ApiError;
    method?: string;
    attempt: number;
    maxAttempts: number;
}): RetryDecision {
    const { error, method, attempt, maxAttempts } = args;

    if (attempt >= maxAttempts) {
        return { shouldRetry: false, reason: "max attempts reached" };
    }

    if (error.status === 401 || error.status === 403) {
        return { shouldRetry: false, reason: "authentication error" };
    }

    if (!isIdempotentMethod(method ?? "")) {
        return { shouldRetry: false, reason: "non-idempotent method" };
    }

    if (
        error.kind === "network" ||
        error.kind === "timeout" ||
        error.status === 429 ||
        error.status === 502 ||
        error.status === 503 ||
        error.status === 504
    ) {
        return { shouldRetry: true, reason: "transient error" };
    }

    return { shouldRetry: false, reason: "not_retryable error" };
}
