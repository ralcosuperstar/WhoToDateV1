/**
 * Format a successful response
 * @param data The data to send in the response
 * @param message Optional success message
 */
export const successResponse = (data: any, message = "Success") => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString()
});

/**
 * Format an error response
 * @param message Error message
 * @param statusCode HTTP status code
 * @param details Optional error details
 */
export const errorResponse = (message: string, statusCode = 500, details?: any) => ({
  success: false,
  message,
  statusCode,
  details: process.env.NODE_ENV !== 'production' ? details : undefined,
  timestamp: new Date().toISOString()
});

/**
 * Format a paginated response
 * @param data The array of items
 * @param page Current page number
 * @param limit Items per page
 * @param total Total number of items
 */
export const paginatedResponse = (
  data: any[], 
  page: number, 
  limit: number, 
  total: number
) => ({
  success: true,
  data,
  pagination: {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit)
  },
  timestamp: new Date().toISOString()
});
