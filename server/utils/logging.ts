/**
 * Logging utility for the application
 * Provides consistent, formatted log outputs with timestamps
 */

/**
 * Log a debug message
 * @param message The message to log
 * @param data Optional data to include
 */
export const logDebug = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'production' && process.env.DEBUG !== 'true') {
    return;
  }
  console.debug(
    `[DEBUG] ${new Date().toISOString()} - ${message}`,
    data ? data : ''
  );
};

/**
 * Log an info message
 * @param message The message to log
 * @param data Optional data to include
 */
export const logInfo = (message: string, data?: any) => {
  console.info(
    `[INFO] ${new Date().toISOString()} - ${message}`,
    data ? data : ''
  );
};

/**
 * Log a warning message
 * @param message The message to log
 * @param data Optional data to include
 */
export const logWarning = (message: string, data?: any) => {
  console.warn(
    `[WARN] ${new Date().toISOString()} - ${message}`,
    data ? data : ''
  );
};

/**
 * Log an error message
 * @param message The error message
 * @param error The error object
 */
export const logError = (message: string, error?: any) => {
  console.error(
    `[ERROR] ${new Date().toISOString()} - ${message}`,
    error ? (error.stack || error) : ''
  );
};

/**
 * Log API request details
 * @param method HTTP method
 * @param path Request path
 * @param duration Request duration in ms
 * @param status HTTP status code
 */
export const logRequest = (method: string, path: string, duration: number, status: number) => {
  const color = status >= 500 ? '\x1b[31m' : // Red for server errors
               status >= 400 ? '\x1b[33m' : // Yellow for client errors
               status >= 300 ? '\x1b[36m' : // Cyan for redirects
               status >= 200 ? '\x1b[32m' : // Green for success
               '\x1b[37m'; // White for other
  
  const resetColor = '\x1b[0m';
  const formattedDuration = duration.toFixed(2);
  const performanceFlag = duration > 500 ? '🐢 SLOW' : '';
  
  console.log(
    `${color}[${method}] ${new Date().toISOString()} - ${path} ${status} in ${formattedDuration}ms ${performanceFlag}${resetColor}`
  );
};
