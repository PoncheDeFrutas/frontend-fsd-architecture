type tokenListener = (token: string | null) => void;

let accessToken: string | null = null;
const listeners = new Set<tokenListener>();

/**
 * Gets the currently stored access token.
 * @returns The access token, or null if none is stored.
 */
export function getAccessToken(): string | null {
    return accessToken;
}

/**
 * Registers a listener that will be called whenever the access token changes.
 * @param listener The listener function to register.
 * @returns A function to unregister the listener.
 */
export function setAccessToken(token: string | null): void {
    accessToken = token;
    for (const cb of listeners) cb(accessToken);
}

/**
 * Clears the stored access token and notifies listeners.
 */
export function clearAccessToken(): void {
    accessToken = null;
    for (const cb of listeners) cb(accessToken);
}

/**
 * Registers a callback to be invoked when the access token changes.
 * @param cb The callback function to register.
 * @returns A function to unregister the callback.
 */
export function onAccessTokenChange(cb: tokenListener): () => void {
    listeners.add(cb);
    return () => listeners.delete(cb);
}
