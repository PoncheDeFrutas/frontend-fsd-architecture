export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculates the backoff time in milliseconds for a given retry attempt.
 * Uses exponential backoff with jitter.
 */
export function getBackoffMs(args: {
    attempt: number;
    baseMs?: number;
    capMs?: number;
}): number {
    const base = args.baseMs ?? 250;
    const cap = args.capMs ?? 4000;

    // Exponential backoff calculation
    const exp = base * Math.pow(2, Math.max(0, args.attempt - 1));
    const capped = Math.min(cap, exp);

    // Apply jitter: random value between 50% and 100% of the capped backoff time
    const jitter = 0.5 + Math.random() * 0.5;

    return Math.floor(capped * jitter);
}
