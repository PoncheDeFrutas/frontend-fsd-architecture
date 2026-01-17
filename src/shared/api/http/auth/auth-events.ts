export type AuthEvent =
    | { type: "unauthorized" }
    | { type: "forbidden" }
    | { type: "signed_out" };

type Listener = (event: AuthEvent) => void;

const listeners = new Set<Listener>();

/**
 * Emits an authentication event to all registered listeners.
 * @param event The authentication event to emit.
 */
export function emitAuthEvent(event: AuthEvent): void {
    for (const cb of listeners) cb(event);
}

/**
 * Registers a callback to be invoked when an authentication event occurs.
 * @param cb The callback function to register.
 * @returns A function to unregister the callback.
 */
export function onAuthEvent(cb: Listener): () => void {
    listeners.add(cb);
    return () => listeners.delete(cb);
}

export function notifyUnauthorized(): void {
    emitAuthEvent({ type: "unauthorized" });
}
export function notifyForbidden(): void {
    emitAuthEvent({ type: "forbidden" });
}
export function notifySignedOut(): void {
    emitAuthEvent({ type: "signed_out" });
}
