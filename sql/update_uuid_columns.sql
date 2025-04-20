-- Alter quiz_answers table to change user_id to text (for UUID storage)
ALTER TABLE quiz_answers 
  ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;

-- Alter reports table to change user_id to text (for UUID storage)
ALTER TABLE reports
  ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;

-- Alter payments table to change user_id to text (for UUID storage)
ALTER TABLE payments
  ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;