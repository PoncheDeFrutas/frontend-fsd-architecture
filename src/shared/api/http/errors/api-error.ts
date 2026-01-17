import type { ApiErrorKind, ApiErrorPayload } from "../types";

/**
 * Represents an error that occurs during an API request.
 * @class
 * @extends Error
 * @property {ApiErrorKind} kind - The kind of API error.
 * @property {number} [status] - The HTTP status code associated with the error.
 * @property {string} [code] - An optional error code returned by the API.
 * @property {unknown} [details] - Additional details about the error.
 * @property {string} [url] - The URL of the API request that caused the error.
 * @property {string} [method] - The HTTP method of the API request that caused the error.
 * @property {string} [requestId] - The request ID associated with the API request.
 *
 * @example
 * throw new ApiError({
 *     kind: "http",
 *     message: "Not Found",
 *     status: 404,
 *     url: "https://api.example.com/resource",
 *     method: "GET",
 * });
 */
export class ApiError extends Error {
    readonly kind: ApiErrorKind;
    readonly status?: number;
    readonly code?: string;
    readonly details?: unknown;
    readonly url?: string;
    readonly method?: string;
    readonly requestId?: string;

    constructor(args: {
        kind: ApiErrorKind;
        message: string;
        status?: number;
        code?: string;
        details?: unknown;
        url?: string;
        method?: string;
        requestId?: string;
        cause?: unknown;
    }) {
        super(args.message);
        this.name = "ApiError";
        this.kind = args.kind;
        this.status = args.status;
        this.code = args.code;
        this.details = args.details;
        this.url = args.url;
        this.method = args.method;
        this.requestId = args.requestId;

        // Node 16+ supports the cause property natively
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).cause = args.cause;
    }

    static fromPayload(args: {
        kind: ApiErrorKind;
        status?: number;
        payload: ApiErrorPayload;
        fallbackMessage?: string;
        url?: string;
        method?: string;
        requestId?: string;
        cause?: unknown;
    }): ApiError {
        const message =
            args.payload.message ??
            args.fallbackMessage ??
            "An unknown error occurred";
        return new ApiError({
            kind: args.kind,
            message,
            status: args.status,
            code: args.payload.code,
            details: args.payload.details,
            url: args.url,
            method: args.method,
            requestId: args.requestId,
            cause: args.cause,
        });
    }

    get isUnauthorized(): boolean {
        return this.status === 401;
    }

    get isForbidden(): boolean {
        return this.status === 403;
    }

    get isRetryable(): boolean {
        return (
            this.kind === "network" ||
            this.kind === "timeout" ||
            this.status === 429 ||
            this.status === 502 ||
            this.status === 503 ||
            this.status === 504
        );
    }
}
