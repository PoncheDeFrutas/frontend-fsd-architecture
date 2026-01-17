import axios, { AxiosError } from 'axios';
import { ApiError } from './api-error';
import type { ApiErrorPayload } from '../types';

/**
 * Attempts to extract a request ID from the given headers object.
 * @param headers The headers object to extract the request ID from.
 * @returns The request ID if found; otherwise, undefined.
 */
function pickRequestId(headers: unknown): string | undefined {
    if (!headers || typeof headers !== 'object') return undefined;
    const hdrs = headers as Record<string, unknown>;
    const candidates = [
        'x-request-id',
        'x-correlation-id',
        'request-id',
    ];

    for (const key of candidates) {
        const value = hdrs[key];
        if (typeof value === 'string' && value.trim()) return value;
    }
    return undefined;
}

/**
 * Normalizes an unknown error into an ApiError instance.
 * @param err The unknown error to normalize.
 * @returns An ApiError instance representing the normalized error.
 */
export function normalizeError(err: unknown): ApiError {
    if (axios.isAxiosError(err)) {
        const ax = err as AxiosError;

        if (ax.code === 'ERR_CANCELED') {
            return new ApiError({
                kind: 'canceled',
                message: 'The request was canceled',
                url: ax.config?.url,
                method: ax.config?.method?.toUpperCase(),
                cause: err,
            });
        }

        if (ax.code === 'ECONNABORTED') {
            return new ApiError({
                kind: 'timeout',
                message: 'The request timed out',
                url: ax.config?.url,
                method: ax.config?.method?.toUpperCase(),
                cause: err,
            });
        }

        if (!ax.response) {
            return new ApiError({
                kind: 'network',
                message: ax.message || 'A network error occurred',
                url: ax.config?.url,
                method: ax.config?.method?.toUpperCase(),
                cause: err,
            });
        }

        const status = ax.response.status;
        const payload = ax.response.data as ApiErrorPayload | undefined;

        const requestId = pickRequestId(ax.response.headers);

        return ApiError.fromPayload({
            kind: 'http',
            status,
            payload: payload ?? { message: 'An unknown error occurred' },
            fallbackMessage: `HTTP Error ${status}`,
            url: ax.config?.url,
            method: ax.config?.method?.toUpperCase(),
            requestId,
            cause: err,
        });
    }

    if (err instanceof Error) {
        return new ApiError({
            kind: 'unknown',
            message: err.message || 'An unknown error occurred',
            cause: err,
        });
    }

    return new ApiError({
        kind: 'unknown',
        message: 'An unknown error occurred',
        cause: err,
    });
}
