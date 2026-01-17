import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshSession } from "../auth/refresh";
import { notifyForbidden } from "../auth/auth-events";
import { normalizeError } from "../errors/normalize-error";
import { getAccessToken } from "../auth/token-store";

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

/**
 * Interceptor to handle HTTP response errors.
 * - Notifies on 403 Forbidden errors.
 * - Attempts to refresh the session and retry the request once on 401 Unauthorized errors.
 *
 * @param error - The AxiosError object from the failed HTTP response.
 * @throws The normalized error after handling specific cases.
 */
export async function responseErrorInterceptor(error: AxiosError) {
    const normalized = normalizeError(error);

    if (normalized.status === 403) {
        notifyForbidden();
        throw normalized;
    }

    const config = error.config as RetryableConfig | undefined;

    if (normalized.status === 401 && config && !config._retry) {
        config._retry = true;

        try {
            await refreshSession();

            const token = getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            throw Object.assign(new Error('__RETRY_WITH_INSTANCE__'), { config });
        } catch (error) {
            throw normalized;
        }
    }
    throw normalized;
}

/**
 * Creates an Axios response interceptor that handles HTTP errors.
 *
 * @param axiosInstance - The Axios instance to use for retrying requests.
 * @returns A function that can be used as an Axios response interceptor.
 */
export function createResponseInterceptor(axiosInstance: {
    request: (config: InternalAxiosRequestConfig) => Promise<unknown>;
}) {
    return async (error: AxiosError) => {
        try {
            return await responseErrorInterceptor(error);
        } catch (error) {
            if (error instanceof Error && error.message === '__RETRY_WITH_INSTANCE__') {
                const config = (error as any).config as InternalAxiosRequestConfig;
                return axiosInstance.request(config);
            }
            throw error;
        }
    };
}
