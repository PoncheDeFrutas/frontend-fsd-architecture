import type { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { httpClient } from "./client";

/**
 * Custom HTTP request configuration type that extends AxiosRequestConfig.
 * Allows headers to be specified as RawAxiosRequestHeaders or a simple record of string key-value pairs.
 */
export type HttpRequestConfig = Omit<AxiosRequestConfig, "headers"> & {
    headers?: RawAxiosRequestHeaders | Record<string, string>;
}

/**
 * Unwraps the data from an Axios response promise.
 * @param promise - The Axios response promise to unwrap.
 * @returns A promise that resolves to the data of type T.
 */
async function unwrap<T>(promise: Promise<AxiosResponse<T>>): Promise<T> {
    const response = await promise;
    return response.data;
};

/**
 * A simple HTTP client wrapper around axios to simplify common request patterns.
 * Provides methods for making HTTP requests and automatically unwraps the response data.
 * @example
 * const data = await http.get<MyDataType>('/my-endpoint');
 * console.log(data); // data is of type MyDataType
 */
export const http = {
    request<T>(config: HttpRequestConfig): Promise<T> {
        return unwrap<T>(httpClient.request<T>(config));
    },

    get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
        return unwrap<T>(httpClient.get<T>(url, config));
    },

    delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
        return unwrap<T>(httpClient.delete<T>(url, config));
    },

    post<T, B = unknown>(url: string, data?: B, config?: HttpRequestConfig): Promise<T> {
        return unwrap<T>(httpClient.post<T>(url, data, config));
    },

    put<T, B = unknown>(url: string, data?: B, config?: HttpRequestConfig): Promise<T> {
        return unwrap<T>(httpClient.put<T>(url, data, config));
    },

    patch<T, B = unknown>(url: string, data?: B, config?: HttpRequestConfig): Promise<T> {
        return unwrap<T>(httpClient.patch<T>(url, data, config));
    },
} as const;

