import axios, { type AxiosInstance } from "axios";
import { clearAccessToken, setAccessToken } from "./token-store";
import { notifyUnauthorized } from "./auth-events";
import { ENV } from "../../config/env";
import { ENDPOINTS } from "../../config/endpoints";

type RefreshResponse = {
    accessToken: string;
};

let refreshingPromise: Promise<string> | null = null;

/**
 * Create a dedicated Axios client for token refresh operations.
 * This client is configured to not use any existing authentication tokens
 * to avoid potential infinite loops during the refresh process.
 */
const refreshClient: AxiosInstance = axios.create({
    baseURL: ENV.API_BASE_URL,
    timeout: ENV.API_TIMEOUT_MS,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

/**
 * Refresh the access token using the refresh token stored in cookies.
 * Ensures that only one refresh operation is in progress at any time.
 *
 * @returns A promise that resolves to the new access token.
 * @throws An error if the refresh operation fails.
 */
export async function refreshSession(): Promise<string> {
    if (refreshingPromise) return refreshingPromise;

    refreshingPromise = (async () => {
        try {
            const response = await refreshClient.post<RefreshResponse>(
                ENDPOINTS.auth.refresh,
            );
            const token = response.data?.accessToken;

            if (!token || typeof token !== "string") {
                throw new Error(
                    "Invalid refresh response: missing access token",
                );
            }

            setAccessToken(token);
            return token;
        } catch (error) {
            clearAccessToken();
            notifyUnauthorized();
            throw error;
        } finally {
            refreshingPromise = null;
        }
    })();

    return refreshingPromise;
}
