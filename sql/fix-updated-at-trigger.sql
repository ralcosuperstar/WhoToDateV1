-- Check for and remove any existing updated_at triggers
DO $$
DECLARE
    trg RECORD;
BEGIN
    -- Loop through all triggers in database
    FOR trg IN
        SELECT tgname, relname
        FROM pg_trigger t
        JOIN pg_class c ON t.tgrelid = c.oid
    LOOP
        -- If trigger name contains updated_at or set_updated_at, drop it
        IF trg.tgname LIKE '%updated_at%' OR trg.tgname LIKE '%set_updated_at%' THEN
            EXECUTE 'DROP TRIGGER IF EXISTS ' || trg.tgname || ' ON ' || trg.relname;
            RAISE NOTICE 'Dropped trigger % on table %', trg.tgname, trg.relname;
        END IF;
    END LOOP;
END;
$$;

-- Add proper updated_at column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create a proper updated_at trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    -- Only update updated_at column if it exists on the target table
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = TG_TABLE_NAME 
        AND column_name = 'updated_at'
    ) THEN
        NEW.updated_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to users table
DROP TRIGGER IF EXISTS set_updated_at ON users;
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

COMMENT ON FUNCTION set_updated_at() IS 'Trigger function to set updated_at column when a record is updated';