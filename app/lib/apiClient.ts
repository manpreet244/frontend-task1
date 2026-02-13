import { ApiError } from './errors';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
};

async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, cache, revalidate, tags } = options;
  
  const url = `${BASE_URL}${endpoint}`;
  
  const fetchOpts: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (body) {
    fetchOpts.body = JSON.stringify(body);
  }

  if (cache) {
    fetchOpts.cache = cache;
  }

  // nextjs caching stuff
  if (revalidate !== undefined || tags) {
    fetchOpts.next = {};
    if (revalidate !== undefined) fetchOpts.next.revalidate = revalidate;
    if (tags) fetchOpts.next.tags = tags;
  }

  try {
    const res = await fetch(url, fetchOpts);
    
    if (!res.ok) {
      // user friendly messages based on status
      const messages: Record<number, string> = {
        400: 'Invalid request. Please try again.',
        401: 'Please login to continue.',
        403: 'You don\'t have permission to access this.',
        404: 'The requested item was not found.',
        500: 'Server error. Please try again later.',
        503: 'Service temporarily unavailable.',
      };
      
      const message = messages[res.status] || 'Something went wrong. Please try again.';
      throw new ApiError(message, `HTTP_${res.status}`, res.status);
    }

    return res.json();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError('Unable to connect. Check your internet connection.', 'NETWORK_ERROR', 0);
  }
}

// helper functions
export const apiClient = {
  get: <T>(endpoint: string, opts?: Omit<FetchOptions, 'method' | 'body'>) => 
    request<T>(endpoint, { ...opts, method: 'GET' }),
    
  post: <T>(endpoint: string, body?: unknown, opts?: Omit<FetchOptions, 'method'>) =>
    request<T>(endpoint, { ...opts, method: 'POST', body }),
    
  put: <T>(endpoint: string, body?: unknown, opts?: Omit<FetchOptions, 'method'>) =>
    request<T>(endpoint, { ...opts, method: 'PUT', body }),
    
  delete: <T>(endpoint: string, opts?: Omit<FetchOptions, 'method' | 'body'>) =>
    request<T>(endpoint, { ...opts, method: 'DELETE' }),
};
