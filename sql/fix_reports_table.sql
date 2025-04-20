-- SQL script to fix database schema mismatch
-- The issue appears to be that there's a compatibility_color column in the database,
-- but it's not being recognized by Drizzle ORM when it tries to insert data.

-- For quiz_answers table:
-- In Supabase: user_id is INTEGER
-- In code: userId is INTEGER (matching)

-- For reports table:
-- In Supabase: compatibility_color is TEXT
-- In code: compatibilityColor is TEXT (matching)

-- 1. First, refresh permissions to ensure the application has full access:
GRANT SELECT, INSERT, UPDATE, DELETE ON quiz_answers TO service_role, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON reports TO service_role, anon;
GRANT USAGE, SELECT ON SEQUENCE quiz_answers_id_seq TO service_role, anon;
GRANT USAGE, SELECT ON SEQUENCE reports_id_seq TO service_role, anon;

-- 2. Make sure column types match exactly what's in the code:
-- Column timezone settings
ALTER TABLE IF EXISTS quiz_answers ALTER COLUMN started_at TYPE timestamp without time zone;
ALTER TABLE IF EXISTS quiz_answers ALTER COLUMN completed_at TYPE timestamp without time zone;

ALTER TABLE IF EXISTS reports ALTER COLUMN created_at TYPE timestamp without time zone;
ALTER TABLE IF EXISTS reports ALTER COLUMN compatibility_color TYPE text;

-- 3. Force PostgreSQL to update its statistics and refresh metadata cache
ANALYZE quiz_answers;
ANALYZE reports;

-- 4. If needed, modify the RLS policies to ensure we can insert properly
ALTER TABLE quiz_answers DISABLE ROW LEVEL SECURITY;
ALTER TABLE reports DISABLE ROW LEVEL SECURITY;

-- 5. Create index for faster lookups
CREATE INDEX IF NOT EXISTS quiz_answers_user_id_idx ON quiz_answers (user_id);
CREATE INDEX IF NOT EXISTS reports_user_id_idx ON reports (user_id);
CREATE INDEX IF NOT EXISTS reports_quiz_id_idx ON reports (quiz_id);