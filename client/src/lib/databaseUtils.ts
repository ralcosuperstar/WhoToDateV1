/**
 * Database utility functions for checking status and handling database operations
 */

import { toast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

/**
 * Checks the database status and table structure using our direct PostgreSQL connection
 * 
 * @returns Promise with database status information
 */
export const checkDatabaseStatus = async (): Promise<{
  success: boolean;
  connectionType: string;
  hasUpdatedAt: boolean;
  message: string;
  data?: any;
}> => {
  try {
    // First call our database table info endpoint
    const response = await apiRequest('GET', '/api/db-table-info') as Response;
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Database status check failed:', errorData);
      
      // Return failure with error message
      return {
        success: false,
        connectionType: 'unknown',
        hasUpdatedAt: false,
        message: `Database check failed: ${errorData.error || 'Unknown error'}`
      };
    }
    
    // Parse the successful response
    const data = await response.json();
    
    // Check if the table has updated_at column
    const hasUpdatedAt = Array.isArray(data.data) && 
      data.data.some((column: any) => column.column_name === 'updated_at');
    
    return {
      success: true,
      connectionType: data.connectionType || 'unknown',
      hasUpdatedAt,
      message: hasUpdatedAt 
        ? 'Database schema is properly configured' 
        : 'The updated_at column is missing in users table',
      data: data.data
    };
  } catch (error) {
    console.error('Exception checking database status:', error);
    return {
      success: false,
      connectionType: 'error',
      hasUpdatedAt: false,
      message: `Error checking database: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

/**
 * Fixes updated_at column for a specific user
 * 
 * @param userId The user ID to fix updated_at for
 * @returns Promise with fix results
 */
export const fixUpdatedAtColumn = async (userId: string): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  try {
    console.log(`Attempting to fix updated_at column for user: ${userId}`);
    
    // Call our fix endpoint
    const response = await apiRequest('POST', '/api/fix-updated-at', { userId }) as Response;
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Fix updated_at attempt failed:', errorData);
      
      // Show error toast
      toast({
        title: 'Database Fix Failed',
        description: errorData.error || 'Unknown error',
        variant: 'destructive',
      });
      
      return {
        success: false,
        message: `Failed to fix updated_at: ${errorData.error || 'Unknown error'}`
      };
    }
    
    // Parse the successful response
    const data = await response.json();
    
    // Show success toast
    toast({
      title: 'Database Fix Applied',
      description: data.message || 'Successfully updated database schema',
      variant: 'default',
    });
    
    return {
      success: true,
      message: data.message || 'Success',
      data: data.data
    };
  } catch (error) {
    console.error('Exception fixing updated_at column:', error);
    
    // Show error toast
    toast({
      title: 'Database Fix Failed',
      description: error instanceof Error ? error.message : String(error),
      variant: 'destructive',
    });
    
    return {
      success: false,
      message: `Error fixing database: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

/**
 * Performs necessary database fixes before profile updates
 * This should be called before making critical profile updates
 * 
 * @param userId The user ID to ensure database compatibility for
 * @returns Promise indicating if fix was required and successful
 */
export const ensureDatabaseCompatibility = async (userId: string): Promise<boolean> => {
  try {
    console.log('Checking database status before updates...');
    
    // First check if fixes are needed
    const status = await checkDatabaseStatus();
    
    if (!status.success) {
      console.warn('Database check failed, attempting fixes anyway:', status.message);
      // Continue with fixes even if check failed
    } else if (status.hasUpdatedAt) {
      console.log('Database schema is already compatible, no fixes needed');
      return true; // No fixes needed
    }
    
    console.log('Attempting to fix database schema before updating profile...');
    
    // Apply fixes
    const fixResult = await fixUpdatedAtColumn(userId);
    
    if (!fixResult.success) {
      console.error('Database schema fix failed:', fixResult.message);
      return false;
    }
    
    console.log('Database schema fix successful');
    return true;
  } catch (error) {
    console.error('Exception ensuring database compatibility:', error);
    return false;
  }
};

/**
 * Runs a full diagnostic for database connectivity and status
 * Useful for troubleshooting and debugging in development
 * 
 * @returns Promise with detailed diagnostic information
 */
export const runDatabaseDiagnostic = async (): Promise<{
  success: boolean;
  diagnosticResults: Record<string, any>;
}> => {
  const diagnosticResults: Record<string, any> = {};
  
  try {
    // Check database table info
    console.log('Running database diagnostic...');
    
    try {
      const tableInfoResult = await apiRequest('GET', '/api/db-table-info') as Response;
      
      if (!tableInfoResult.ok) {
        diagnosticResults.tableInfo = {
          success: false,
          error: await tableInfoResult.text()
        };
      } else {
        diagnosticResults.tableInfo = {
          success: true,
          data: await tableInfoResult.json()
        };
      }
    } catch (tableInfoError) {
      diagnosticResults.tableInfo = {
        success: false,
        error: tableInfoError instanceof Error ? tableInfoError.message : String(tableInfoError)
      };
    }
    
    // Check connection type
    diagnosticResults.connectionType = diagnosticResults.tableInfo?.data?.connectionType || 'unknown';
    
    // Check session store
    try {
      const sessionCheckResult = await apiRequest('GET', '/api/health') as Response;
      
      if (!sessionCheckResult.ok) {
        diagnosticResults.sessionStore = {
          success: false,
          error: await sessionCheckResult.text()
        };
      } else {
        diagnosticResults.sessionStore = {
          success: true,
          data: await sessionCheckResult.json()
        };
      }
    } catch (sessionError) {
      diagnosticResults.sessionStore = {
        success: false,
        error: sessionError instanceof Error ? sessionError.message : String(sessionError)
      };
    }
    
    return {
      success: Object.values(diagnosticResults).every((result: any) => result.success === true),
      diagnosticResults
    };
  } catch (error) {
    console.error('Exception running database diagnostic:', error);
    return {
      success: false,
      diagnosticResults: {
        error: error instanceof Error ? error.message : String(error)
      }
    };
  }
};