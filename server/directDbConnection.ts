// Direct database connection using connection string
import { Client } from 'pg';

/**
 * Execute direct database operations using a raw PostgreSQL connection
 * This bypasses Supabase's API layer and permissions model
 */
export async function executeDirectSql(sql: string, params: any[] = []): Promise<any> {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:qAavwmkovbMWrxMI@db.truulijpablpqxipindo.supabase.co:5432/postgres',
  });
  
  try {
    await client.connect();
    console.log('Connected directly to PostgreSQL database');
    
    const result = await client.query(sql, params);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error executing direct SQL:', error);
    return { 
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    try {
      await client.end();
      console.log('Direct PostgreSQL connection closed');
    } catch (err) {
      console.error('Error closing PostgreSQL connection:', err);
    }
  }
}

/**
 * Fix the updated_at column issue by adding it if it doesn't exist
 * and creating a trigger to automatically update it
 */
export async function fixUpdatedAtColumn(): Promise<any> {
  // SQL to add updated_at column if it doesn't exist
  const addColumnSql = `
    DO $$
    BEGIN
      -- Check if updated_at column exists
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'users' 
        AND column_name = 'updated_at'
      ) THEN
        -- Add updated_at column
        ALTER TABLE public.users ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
        RAISE NOTICE 'Added updated_at column to users table';
      ELSE
        RAISE NOTICE 'updated_at column already exists';
      END IF;
    END $$;
  `;
  
  // SQL to create trigger function if it doesn't exist
  const createTriggerFunctionSql = `
    DO $$
    BEGIN
      -- Create or replace the trigger function
      CREATE OR REPLACE FUNCTION public.set_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      
      RAISE NOTICE 'Created or updated set_updated_at trigger function';
    END $$;
  `;
  
  // SQL to add trigger if it doesn't exist
  const addTriggerSql = `
    DO $$
    BEGIN
      -- Drop trigger if it exists (to ensure we have the latest version)
      DROP TRIGGER IF EXISTS set_updated_at_trigger ON public.users;
      
      -- Create trigger
      CREATE TRIGGER set_updated_at_trigger
      BEFORE UPDATE ON public.users
      FOR EACH ROW
      EXECUTE FUNCTION public.set_updated_at();
      
      RAISE NOTICE 'Created updated_at trigger on users table';
    END $$;
  `;
  
  try {
    // Execute the SQL statements in sequence
    console.log('Adding updated_at column if needed...');
    const addColumnResult = await executeDirectSql(addColumnSql);
    if (!addColumnResult.success) {
      throw new Error(`Failed to add updated_at column: ${addColumnResult.error}`);
    }
    
    console.log('Creating/updating trigger function...');
    const createFunctionResult = await executeDirectSql(createTriggerFunctionSql);
    if (!createFunctionResult.success) {
      throw new Error(`Failed to create trigger function: ${createFunctionResult.error}`);
    }
    
    console.log('Creating trigger...');
    const addTriggerResult = await executeDirectSql(addTriggerSql);
    if (!addTriggerResult.success) {
      throw new Error(`Failed to create trigger: ${addTriggerResult.error}`);
    }
    
    return { 
      success: true, 
      message: 'Successfully added updated_at column and trigger' 
    };
  } catch (error) {
    console.error('Error fixing updated_at column:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Update a user's profile with a direct database connection
 * This is a fallback for when the Supabase API fails due to schema issues
 */
export async function updateUserProfileDirect(
  userId: string, 
  userData: {
    first_name?: string | null;
    last_name?: string | null;
    phone_number?: string | null;
    full_name?: string | null;
  }
): Promise<any> {
  try {
    // First, ensure the updated_at column and trigger exist
    const fixResult = await fixUpdatedAtColumn();
    if (!fixResult.success) {
      console.warn('Warning: Failed to fix updated_at column:', fixResult.error);
      // Continue anyway - the update might still work
    }
    
    // Build the SQL update statement dynamically
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    // Add each field that's present in userData
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });
    
    // Add userId as the last parameter
    values.push(userId);
    
    // Only proceed if there are fields to update
    if (updateFields.length === 0) {
      return { success: false, error: 'No fields to update' };
    }
    
    const updateSql = `
      UPDATE public.users 
      SET ${updateFields.join(', ')} 
      WHERE id = $${paramIndex}
      RETURNING *;
    `;
    
    console.log('Executing direct update SQL:', updateSql);
    console.log('With values:', values);
    
    const result = await executeDirectSql(updateSql, values);
    
    if (!result.success) {
      throw new Error(`Failed to update user profile: ${result.error}`);
    }
    
    if (!result.data || result.data.length === 0) {
      throw new Error('User not found or update failed');
    }
    
    return { 
      success: true, 
      user: result.data[0],
      message: 'Profile updated successfully via direct database connection'
    };
  } catch (error) {
    console.error('Error updating user profile via direct connection:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Get database table information for debugging
 */
export async function getTableInfo(tableName: string = 'users'): Promise<any> {
  const sql = `
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = $1
    ORDER BY ordinal_position;
  `;
  
  return executeDirectSql(sql, [tableName]);
}