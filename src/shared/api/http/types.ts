/**
 * API Error Payload
 * @interface ApiErrorPayload
 * @property {string} [code] - Optional error code
 * @property {string} message - Error message describing the issue
 * @property {unknown} [details] - Optional additional details about the error
 */
export interface ApiErrorPayload {
    code?: string;
    message: string;
    details?: unknown;
}

export type ApiErrorKind =
    | "http"
    | "network"
    | "timeout"
    | "canceled"
    | "unknown";
