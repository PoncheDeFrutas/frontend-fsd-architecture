import type { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "../auth/token-store";
import { mergeHeaders } from "../utils/merge-headers";
import { redactHeaders } from "../utils/redact";
import { ENV } from "../../config/env";

function upper(method?: string): string | undefined {
    return method ? method.toUpperCase() : undefined;
}

function safeUrl(url?: string): string | undefined {
    return url;
}

export function requestInterceptor(
    config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
    const token = getAccessToken();

    const nextHeaders = mergeHeaders(config.headers, {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });

    config.headers = nextHeaders as InternalAxiosRequestConfig["headers"];

    // Debug logging (safe)
    if (ENV.API_DEBUG) {
        console.debug("[HTTP request]", {
            method: upper(config.method),
            url: safeUrl(config.url),
            headers: redactHeaders(nextHeaders),
        });
    }

    return config;
}
