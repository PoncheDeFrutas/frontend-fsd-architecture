import type { AxiosRequestHeaders } from "axios";

type AnyHeaders = AxiosRequestHeaders | Record<string, string> | undefined;

/**
 * Merges two sets of HTTP headers into a single object.
 *
 * @param base - The base headers which can be of various types.
 * @param extra - Additional headers to merge, with string values or undefined.
 * @returns A new object containing the merged headers.
 */
export function mergeHeaders(
    base: AnyHeaders,
    extra: Record<string, string | undefined>
): Record<string, string> {
    const out: Record<string, string> = {};

    if (base && typeof base === 'object') {
        for (const [k, v] of Object.entries(base as Record<string, string>)) {
            if (typeof v === 'string') out[k] = v;
            else if (typeof v === 'number' || typeof v === 'boolean') out[k] = String(v);
        }
    }

    for (const [k, v] of Object.entries(extra)) {
        if (typeof v === 'string') out[k] = v;
    }

    return out;
}
