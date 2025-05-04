
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read only their own data
CREATE POLICY "Users can read own data" ON users
    FOR SELECT
    USING (auth.uid() = id);

-- Create policy to allow users to update only their own data
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE
    USING (auth.uid() = id);
