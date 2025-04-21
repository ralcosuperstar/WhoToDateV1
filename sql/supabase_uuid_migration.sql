-- SQL migration to properly set up supabase_uuid field instead of clerk_id

-- 1. Add the supabase_uuid column if it doesn't exist
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS supabase_uuid UUID;

-- 2. Add unique constraint to supabase_uuid column
ALTER TABLE users 
DROP CONSTRAINT IF EXISTS users_supabase_uuid_key;

ALTER TABLE users
ADD CONSTRAINT users_supabase_uuid_key UNIQUE (supabase_uuid);

-- 3. Copy values from clerk_id to supabase_uuid for existing users
-- Only copy values that are valid UUIDs
UPDATE users
SET supabase_uuid = clerk_id::uuid
WHERE clerk_id IS NOT NULL 
  AND clerk_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

-- 4. Change the data type of the ID column to UUID in a way that preserves data
-- This is a complex operation that should be carefully tested on a staging environment
-- Consider doing this in a separate migration after thorough testing

-- 5. Change user_id columns in related tables from integer to text/UUID
-- Carefully migrate existing data with appropriate joins

-- Add comment explaining the purpose of the migration
COMMENT ON COLUMN users.supabase_uuid IS 'UUID from Supabase Auth for user identification';