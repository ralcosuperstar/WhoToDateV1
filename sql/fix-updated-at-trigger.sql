-- Helper functions to check database objects existence

-- Function to check if another function exists
CREATE OR REPLACE FUNCTION function_exists(function_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE p.proname = function_name
    AND n.nspname = 'public'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if a column exists in a table
CREATE OR REPLACE FUNCTION column_exists(table_name TEXT, column_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = column_exists.table_name
    AND column_name = column_exists.column_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if a trigger exists on a table
CREATE OR REPLACE FUNCTION trigger_exists(table_name TEXT, trigger_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON t.tgrelid = c.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE t.tgname = trigger_name
    AND c.relname = table_name
    AND n.nspname = 'public'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to execute SQL code with elevated permissions
CREATE OR REPLACE FUNCTION exec_sql(sql TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get table information
CREATE OR REPLACE FUNCTION get_table_info(table_name TEXT)
RETURNS JSON AS $$
BEGIN
  RETURN (
    SELECT json_build_object(
      'columns', (
        SELECT json_agg(
          json_build_object(
            'name', column_name,
            'type', data_type,
            'nullable', is_nullable,
            'default', column_default
          )
        )
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = get_table_info.table_name
      ),
      'triggers', (
        SELECT json_agg(
          json_build_object(
            'name', t.tgname,
            'enabled', t.tgenabled = 'O'
          )
        )
        FROM pg_trigger t
        JOIN pg_class c ON t.tgrelid = c.oid
        JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE c.relname = get_table_info.table_name
        AND n.nspname = 'public'
      ),
      'constraints', (
        SELECT json_agg(
          json_build_object(
            'name', constraint_name,
            'type', constraint_type
          )
        )
        FROM information_schema.table_constraints
        WHERE table_schema = 'public'
        AND table_name = get_table_info.table_name
      )
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Setup for the updated_at trigger

-- Create function to update the updated_at field
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Make sure the updated_at column exists
ALTER TABLE users
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Make sure the last_update_trigger column exists - we'll update this to trigger the updated_at to update
ALTER TABLE users
ADD COLUMN IF NOT EXISTS last_update_trigger TIMESTAMPTZ DEFAULT NOW();

-- Create the trigger
DROP TRIGGER IF EXISTS set_updated_at_trigger ON users;
CREATE TRIGGER set_updated_at_trigger
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- To test, run:
-- UPDATE users SET last_update_trigger = NOW() WHERE id = 'user-id-here';
-- Then check if updated_at was updated automatically.