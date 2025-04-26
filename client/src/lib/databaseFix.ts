/**
 * Database fix utility for client-side checks and fixes
 * Used to handle database schema compatibility issues
 */
import { apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';

/**
 * Checks if updated_at column exists in users table
 * @returns Promise with check results
 */
export const checkUpdatedAtColumn = async (): Promise<{
  success: boolean;
  hasUpdatedAt: boolean;
  message: string;
}> => {
  try {
    console.log('Checking if updated_at column exists in users table...');
    
    // Call API endpoint
    const response = await apiRequest('GET', '/check-updated-at') as Response;
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error checking updated_at column:', errorData);
      
      return {
        success: false,
        hasUpdatedAt: false,
        message: errorData.error || 'Failed to check updated_at column'
      };
    }
    
    // Parse response
    const data = await response.json();
    
    return {
      success: true,
      hasUpdatedAt: data.hasUpdatedAt,
      message: data.hasUpdatedAt 
        ? 'The updated_at column exists in users table' 
        : 'The updated_at column is missing in users table'
    };
  } catch (error) {
    console.error('Error checking updated_at column:', error);
    
    return {
      success: false,
      hasUpdatedAt: false,
      message: error instanceof Error ? error.message : String(error)
    };
  }
};

/**
 * Adds updated_at column to users table if missing
 * @returns Promise with add results
 */
export const addUpdatedAtColumn = async (): Promise<{
  success: boolean;
  columnAdded: boolean;
  message: string;
}> => {
  try {
    console.log('Adding updated_at column to users table...');
    
    // Show toast for user feedback
    toast({
      title: 'Database Fix',
      description: 'Adding updated_at column to users table...',
    });
    
    // Call API endpoint
    const response = await apiRequest('POST', '/add-updated-at') as Response;
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error adding updated_at column:', errorData);
      
      // Show error toast
      toast({
        title: 'Database Fix Failed',
        description: errorData.error || 'Failed to add updated_at column',
        variant: 'destructive',
      });
      
      return {
        success: false,
        columnAdded: false,
        message: errorData.error || 'Failed to add updated_at column'
      };
    }
    
    // Parse response
    const data = await response.json();
    
    // Show success toast
    toast({
      title: 'Database Fix Complete',
      description: data.message || 'Successfully fixed database schema',
      variant: 'default',
    });
    
    return {
      success: true,
      columnAdded: data.columnAdded,
      message: data.message || 'Successfully added updated_at column'
    };
  } catch (error) {
    console.error('Error adding updated_at column:', error);
    
    // Show error toast
    toast({
      title: 'Database Fix Failed',
      description: error instanceof Error ? error.message : String(error),
      variant: 'destructive',
    });
    
    return {
      success: false,
      columnAdded: false,
      message: error instanceof Error ? error.message : String(error)
    };
  }
};

/**
 * Ensures database schema is compatible by checking and adding updated_at column if needed
 * @returns Promise with ensure results
 */
export const ensureDatabaseSchema = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    console.log('Ensuring database schema is compatible...');
    
    // Check if column exists
    const checkResult = await checkUpdatedAtColumn();
    
    if (!checkResult.success) {
      return {
        success: false,
        message: `Failed to check database schema: ${checkResult.message}`
      };
    }
    
    // If column already exists, return success
    if (checkResult.hasUpdatedAt) {
      console.log('Database schema is already compatible');
      return {
        success: true,
        message: 'Database schema is already compatible'
      };
    }
    
    // Add column if missing
    console.log('Database schema requires fixes, adding updated_at column...');
    const addResult = await addUpdatedAtColumn();
    
    return {
      success: addResult.success,
      message: addResult.message
    };
  } catch (error) {
    console.error('Error ensuring database schema:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error)
    };
  }
};