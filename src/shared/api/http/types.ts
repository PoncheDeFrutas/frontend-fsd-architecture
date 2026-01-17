export type Role = 'admin' | 'user';

export type Permission =
    | 'users:read'
    | 'users:write'
    | 'orders:read'
    | 'orders:write'
    | 'settings:manage'

/**
 * Authenticated user information
 * @interface AuthUser
 * @property {string} id - Unique identifier for the user
 * @property {string} email - Email address of the user
 * @property {Role[]} roles - Roles assigned to the user
 * @property {Permission[]} permissions - Permissions granted to the user
 */
export interface AuthUser {
    id: string;
    email: string;
    roles: Role[];
    permissions: Permission[];
}

export interface MeResponse {
    user: AuthUser;
}

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
    | 'http'
    | 'network'
    | 'timeout'
    | 'canceled'
    | 'unknown';
