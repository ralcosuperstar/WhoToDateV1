import { apiRequest } from './queryClient';

/**
 * Utility function to fix database-related issues
 * This function specifically helps resolve the updated_at column issue
 */
export const fixUpdatedAtColumn = async (userId: string): Promise<boolean> => {
  try {
    console.log('Attempting to fix updated_at column for user:', userId);
    
    // Call our fix-updated-at endpoint
    const response = await apiRequest('POST', '/api/fix-updated-at', { userId }) as Response;
    const result = await response.json();
    
    if (result.success) {
      console.log('Successfully fixed updated_at column:', result.message);
      return true;
    } else {
      console.error('Failed to fix updated_at column:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Exception fixing updated_at column:', error);
    return false;
  }
};

/**
 * A function that returns a debug view of the users table structure
 * Primarily for development use to diagnose database schema issues
 */
export const getTableStructure = async (): Promise<any> => {
  try {
    console.log('Fetching database table structure information...');
    
    const response = await apiRequest('GET', '/api/db-table-info') as Response;
    const result = await response.json();
    
    if (result.success) {
      console.log('Successfully retrieved table structure:', result.data);
      return result.data;
    } else {
      console.error('Failed to retrieve table structure:', result.error);
      return null;
    }
  } catch (error) {
    console.error('Exception retrieving table structure:', error);
    return null;
  }
};