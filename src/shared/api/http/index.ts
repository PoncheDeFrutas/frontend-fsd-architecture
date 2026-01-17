export { httpClient, createHttpClient } from './client';

export { ApiError } from './errors/api-error';
export { normalizeError } from './errors/normalize-error';

export { http } from './client-helpers'
export type { HttpRequestConfig } from './client-helpers';

export * from './types';

export {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
    onAccessTokenChange
} from'./auth/token-store'

export {
    onAuthEvent,
    emitAuthEvent,
    notifyUnauthorized,
    notifyForbidden,
    notifySignedOut
} from './auth/auth-events'
