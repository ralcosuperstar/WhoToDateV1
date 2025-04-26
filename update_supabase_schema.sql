-- Add updated_at column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create trigger function to automatically update the timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_users_timestamp ON users;
CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Add updated_at column to quiz_answers table if it doesn't exist
ALTER TABLE quiz_answers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_quiz_answers_timestamp ON quiz_answers;
CREATE TRIGGER update_quiz_answers_timestamp
BEFORE UPDATE ON quiz_answers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Add updated_at column to reports table if it doesn't exist
ALTER TABLE reports ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_reports_timestamp ON reports;
CREATE TRIGGER update_reports_timestamp
BEFORE UPDATE ON reports
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Add updated_at column to payments table if it doesn't exist
ALTER TABLE payments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_payments_timestamp ON payments;
CREATE TRIGGER update_payments_timestamp
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Add updated_at column to blog_posts table if it doesn't exist
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_blog_posts_timestamp ON blog_posts;
CREATE TRIGGER update_blog_posts_timestamp
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();