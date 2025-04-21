-- This script adapts quiz_answers and reports tables to accept both integer and UUID user IDs
-- during the migration period, eventually we want to standardize on UUIDs

-- First check the current column type
DO $$
DECLARE
    quiz_user_id_type TEXT;
    report_user_id_type TEXT;
BEGIN
    -- Get column types
    SELECT data_type INTO quiz_user_id_type
    FROM information_schema.columns
    WHERE table_name = 'quiz_answers' AND column_name = 'user_id';
    
    SELECT data_type INTO report_user_id_type
    FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'user_id';
    
    -- Report the findings
    RAISE NOTICE 'quiz_answers.user_id current type: %', quiz_user_id_type;
    RAISE NOTICE 'reports.user_id current type: %', report_user_id_type;
    
    -- If the columns are UUID type, we need to change them to TEXT for compatibility
    IF quiz_user_id_type = 'uuid' THEN
        RAISE NOTICE 'Converting quiz_answers.user_id from UUID to TEXT for better compatibility';
        EXECUTE 'ALTER TABLE quiz_answers ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT';
    ELSIF quiz_user_id_type = 'integer' THEN
        RAISE NOTICE 'Converting quiz_answers.user_id from INTEGER to TEXT for better compatibility';
        EXECUTE 'ALTER TABLE quiz_answers ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT';
    ELSE
        RAISE NOTICE 'quiz_answers.user_id is already type %, no change needed', quiz_user_id_type;
    END IF;
    
    IF report_user_id_type = 'uuid' THEN
        RAISE NOTICE 'Converting reports.user_id from UUID to TEXT for better compatibility';
        EXECUTE 'ALTER TABLE reports ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT';
    ELSIF report_user_id_type = 'integer' THEN
        RAISE NOTICE 'Converting reports.user_id from INTEGER to TEXT for better compatibility';
        EXECUTE 'ALTER TABLE reports ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT';
    ELSE
        RAISE NOTICE 'reports.user_id is already type %, no change needed', report_user_id_type;
    END IF;
END $$;