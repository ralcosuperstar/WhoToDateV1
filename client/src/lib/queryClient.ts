import { QueryClient } from '@tanstack/react-query';
import { apiClient } from './apiClient';

// This will be used as the default query function
const defaultQueryFn = async (context: any) => {
  try {
    const endpoint = context.queryKey[0] as string;
    // Remove /api prefix if it exists, since the apiClient already adds it
    const cleanEndpoint = endpoint.startsWith('/api/') ? endpoint.substring(4) : endpoint;
    return await apiClient.get(cleanEndpoint);
  } catch (error) {
    console.error(`Error in default queryFn for ${context.queryKey[0]}:`, error);
    throw error;
  }
};

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000, // 10 seconds
      retry: 1,
      refetchOnWindowFocus: false, // Disable auto refetch on window focus
      queryFn: defaultQueryFn, // Set the default query function
    },
  },
});

// Default options for fetch
type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  on401?: 'throw' | 'returnNull';
};

export const apiRequest = async (
  method: string,
  endpoint: string,
  body?: any,
  headers: Record<string, string> = {}
) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  // Use our apiClient instead of raw fetch
  switch (method.toUpperCase()) {
    case 'GET':
      return await apiClient.get(endpoint, options);
    case 'POST':
      return await apiClient.post(endpoint, body, options);
    case 'PUT':
      return await apiClient.put(endpoint, body, options);
    case 'PATCH':
      return await apiClient.patch(endpoint, body, options);
    case 'DELETE':
      return await apiClient.delete(endpoint, options);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};

export const getQueryFn = (opts: RequestOptions = {}) => {
  return async (context: any) => {
    try {
      // Assume the first element in the queryKey is the endpoint
      const endpoint = context.queryKey[0] as string;
      const method = opts.method || 'GET';
      
      // For GET requests, we don't provide a body
      if (method === 'GET') {
        return await apiClient.get(endpoint);
      } else {
        throw new Error(`Unsupported method in getQueryFn: ${method}`);
      }
    } catch (error) {
      if (error instanceof Response && error.status === 401 && opts.on401 === 'returnNull') {
        return null;
      }
      throw error;
    }
  };
};