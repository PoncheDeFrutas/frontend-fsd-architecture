import type {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";
import { normalizeError } from "../errors/normalize-error";
import { shouldRetry } from "./retry-policy";
import { getBackoffMs, sleep } from "./backoff";

type RetryableConfig = InternalAxiosRequestConfig & {
    _retryAttempt?: number;
};

/**
 * Creates an Axios interceptor that retries failed requests based on a retry policy.
 *
 * @param args - Configuration options for the retry interceptor.
 * @param args.client - The Axios instance to attach the interceptor to.
 * @param args.maxAttempts - Maximum number of retry attempts (default is 3).
 * @param args.baseDelayMs - Base delay in milliseconds for backoff calculation (default is 250ms).
 * @param args.capDelayMs - Maximum delay in milliseconds for backoff calculation (default is 4000ms).
 * @returns An async function to be used as an Axios response error interceptor.
 */
export function createRetryInterceptor(args: {
    client: AxiosInstance;
    maxAttempts?: number;
    baseDelayMs?: number;
    capDelayMs?: number;
}) {
    const maxAttempts = args.maxAttempts ?? 3;

    return async (error: AxiosError) => {
        const normalized = normalizeError(error);
        const config = error.config as RetryableConfig | undefined;

        if (!config) throw normalized;

        const attempt = (config._retryAttempt ?? 0) + 1;
        config._retryAttempt = attempt;

        const decision = shouldRetry({
            error: normalized,
            method: config.method,
            attempt,
            maxAttempts,
        });

        if (!decision.shouldRetry) throw normalized;

        const delay = getBackoffMs({
            attempt,
            baseMs: args.baseDelayMs ?? 250,
            capMs: args.capDelayMs ?? 4000,
        });

        await sleep(delay);

        return args.client.request(config);
    };
}
