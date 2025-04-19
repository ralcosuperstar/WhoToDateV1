/**
 * API Client
 * 
 * This is a dedicated API client that directly connects to the API server
 * running on a separate port, bypassing Vite middleware completely.
 */

// In production or preview, use the same origin
const isProduction = process.env.NODE_ENV === 'production';
const sameOriginApiUrl = '/api';

// For development, we have two options:
// 1. Use the dedicated API server on port 4000
// 2. Fallback to the main server on port 3000
const API_BASE_URL = isProduction 
  ? sameOriginApiUrl 
  : '/api'; // Use relative URL to avoid CORS issues

// Add a console message when this module is imported
console.log('🔌 API Client initialized with base URL:', API_BASE_URL);

/**
 * Generic fetch wrapper for API requests
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    console.log(`API Request: ${options.method || 'GET'} ${url}`);
    
    // Add credentials to include cookies for session-based auth
    const requestOptions: RequestInit = {
      ...options,
      headers,
      credentials: 'include' as RequestCredentials
    };
    
    // Make the request with typed credentials
    const response = await fetch(url, {
      ...requestOptions,
      credentials: 'include'
    });
    
    // Check for HTML responses that might indicate middleware interception
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      console.error(`API Error: Received HTML instead of JSON at ${url}, likely middleware interception`);
      throw new Error(`API Error: Received HTML instead of JSON, likely middleware interception.`);
    }

    // Check if response is OK
    if (!response.ok) {
      const errorText = await response.text();
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
      } catch (e) {
        // If not JSON, use the text
        console.error(`API Error (${response.status}): ${errorText}`);
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }
      console.error(`API Error: ${errorJson.message || errorJson.error || `Status ${response.status}`}`);
      throw new Error(
        errorJson.message || 
        errorJson.error || 
        `API Error (${response.status})`
      );
    }

    // Parse the response as JSON
    const data = await response.json();
    console.log(`API Success: ${url}`, data);
    return data as T;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

/**
 * Available API methods
 */
export const apiClient = {
  /**
   * Performs a GET request to the API
   */
  get: <T>(endpoint: string, options: RequestInit = {}) => 
    apiFetch<T>(endpoint, { ...options, method: 'GET' }),

  /**
   * Performs a POST request to the API
   */
  post: <T>(endpoint: string, data: any, options: RequestInit = {}) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * Performs a PUT request to the API
   */
  put: <T>(endpoint: string, data: any, options: RequestInit = {}) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  /**
   * Performs a PATCH request to the API
   */
  patch: <T>(endpoint: string, data: any, options: RequestInit = {}) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  /**
   * Performs a DELETE request to the API
   */
  delete: <T>(endpoint: string, options: RequestInit = {}) =>
    apiFetch<T>(endpoint, { ...options, method: 'DELETE' }),

  /**
   * Checks if the API server is accessible
   */
  checkHealth: async () => {
    try {
      const result = await apiFetch<{ status: string; time: string }>('/health');
      return { 
        ok: result.status === 'ok', 
        serverTime: result.time 
      };
    } catch (error) {
      console.error('API health check failed:', error);
      return { ok: false, error };
    }
  }
};