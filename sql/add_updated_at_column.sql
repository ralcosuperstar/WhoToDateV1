-- Script to add the updated_at column to the users table
-- This solves compatibility issues with code expecting this column

-- First check if the column already exists
DO $$
BEGIN
    -- Check if the updated_at column exists
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'users'
        AND column_name = 'updated_at'
    ) THEN
        -- Add the updated_at column with a default value of current timestamp
        EXECUTE 'ALTER TABLE users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()';
        
        -- Add a trigger to automatically update the updated_at column
        EXECUTE '
        CREATE OR REPLACE FUNCTION update_modified_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        ';
        
        EXECUTE '
        CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_modified_column();
        ';
        
        RAISE NOTICE 'Successfully added updated_at column to users table with auto-update trigger';
    ELSE
        RAISE NOTICE 'The updated_at column already exists in the users table';
    END IF;
END
$$;