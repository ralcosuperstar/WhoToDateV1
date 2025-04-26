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
 * Update user profile directly via our direct database connection
 * This is used as a fallback when the Supabase API fails
 */
export const updateUserProfileDirect = async (
  userId: string,
  userData: {
    first_name?: string | null;
    last_name?: string | null;
    phone_number?: string | null;
    full_name?: string | null;
  }
): Promise<any> => {
  try {
    console.log('Updating user profile directly for user:', userId);
    console.log('With data:', userData);
    
    // First try to fix the database schema if needed
    await fixUpdatedAtColumn(userId);
    
    // Then use our direct update endpoint
    const response = await apiRequest(
      'POST', 
      '/api/direct-user-update', 
      { userId, userData }
    ) as Response;
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Successfully updated user profile directly:', result.message);
      return { success: true, user: result.user };
    } else {
      console.error('Failed to update user profile directly:', result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('Exception updating user profile directly:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
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