import axios, { type AxiosInstance } from "axios";
import { ENV } from "../config";

import { requestInterceptor } from "./interceptors/request.interceptor";
import { createResponseInterceptor } from "./interceptors/response.interceptor";
import { createRetryInterceptor } from "./retry/retry.interceptor";

/**
 * Create and configure an Axios HTTP client for API requests.
 *
 * This client is pre-configured with base URL, timeout, and interceptors
 * for handling requests and responses.
 *
 * @returns Configured Axios instance.
 */
export function createHttpClient(): AxiosInstance {
    const client = axios.create({
        baseURL: ENV.API_BASE_URL,
        timeout: ENV.API_TIMEOUT_MS,
        withCredentials: true,
        headers: {
            Accept: "application/json",
        },
    });

    // Request interceptor to modify outgoing requests
    client.interceptors.request.use(requestInterceptor);

    // Retry interceptor to handle transient errors
    client.interceptors.response.use(
        (res) => res,
        createRetryInterceptor({
            client,
            maxAttempts: 3,
            baseDelayMs: 250,
            capDelayMs: 4000,
        }),
    );

    // Response interceptor to handle responses and errors
    client.interceptors.response.use(
        (res) => res,
        createResponseInterceptor(client),
    );

    return client;
}

// Singleton HTTP client instance for use throughout the application
export const httpClient = createHttpClient();
