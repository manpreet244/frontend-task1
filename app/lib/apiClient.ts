import axios, { AxiosError, isAxiosError } from 'axios';
import { ApiError } from './errors';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com';

// axios instance with defaults
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// map HTTP status codes to user-friendly messages
const statusMessages: Record<number, string> = {
  400: "Invalid request. Please try again.",
  401: "Please login to continue.",
  403: "You don't have permission to access this.",
  404: "The requested item was not found.",
  500: "Server error. Please try again later.",
  503: "Service temporarily unavailable.",
};

// figure out a readable error message from axios errors
function parseError(err: unknown): ApiError {
  if (err instanceof ApiError) return err;

  if (isAxiosError(err)) {
    const status = err.response?.status || 0;

    // known HTTP status
    if (status && statusMessages[status]) {
      return new ApiError(statusMessages[status], `HTTP_${status}`, status);
    }

    // network-level issues
    if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
      return new ApiError("Taking too long to load. Please try again.", "TIMEOUT", 0);
    }

    if (err.code === 'ERR_NETWORK') {
      return new ApiError("Unable to load content. Please check your connection.", "NETWORK_ERROR", 0);
    }

    if (err.response) {
      return new ApiError("Something went wrong. Please try again.", `HTTP_${status}`, status);
    }

    // no response at all (server down, DNS fail etc)
    return new ApiError(
      "Service is temporarily unavailable. Please try again later.",
      "CONNECTION_ERROR",
      0,
    );
  }

  return new ApiError("Something went wrong. Please try again later.", "UNKNOWN_ERROR", 0);
}

// generic request function
async function request<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: unknown): Promise<T> {
  try {
    const res = await axiosInstance.request<T>({
      method,
      url,
      data: body,
    });
    return res.data;
  } catch (err) {
    throw parseError(err);
  }
}

// helper methods
export const apiClient = {
  get: <T>(endpoint: string) =>
    request<T>('GET', endpoint),

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>('POST', endpoint, body),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>('PUT', endpoint, body),

  delete: <T>(endpoint: string) =>
    request<T>('DELETE', endpoint),
};
