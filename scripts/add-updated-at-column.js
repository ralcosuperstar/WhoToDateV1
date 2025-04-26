// Script to add updated_at column to the users table
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Make sure SUPABASE_URL and SUPABASE_SERVICE_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// SQL statements to add updated_at column and trigger
const addUpdatedAtSQL = `
-- Add updated_at column to users table
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
`;

async function addUpdatedAtColumn() {
  console.log('Adding updated_at column to users table');

  try {
    // First check if the column already exists
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (userError) {
      console.error('Error checking users table:', userError.message);
      return;
    }

    const row = userData && userData.length > 0 ? userData[0] : null;
    
    if (row && Object.keys(row).includes('updated_at')) {
      console.log('updated_at column already exists in users table');
      return;
    }

    console.log('Adding updated_at column...');

    // Using raw SQL approach
    // First, let's try using the REST API method
    try {
      // Create a temporary table to verify we can execute SQL
      console.log('Testing SQL execution capability...');
      const { data: testData, error: testError } = await supabase
        .from('_temp_test')
        .insert({ id: 1, name: 'test' })
        .select();

      if (testError && testError.message.includes('relation "_temp_test" does not exist')) {
        console.log('SQL test confirmed - we get the expected error about non-existent table');
      } else if (testError) {
        console.log('Unexpected test error:', testError.message);
      } else {
        console.log('Unexpected success creating a test table');
      }
    } catch (testError) {
      console.log('Test error caught:', testError.message);
    }

    console.log('\nAttempting to execute SQL directly...');
    
    // Method 1: Try using Supabase's REST API for SQL
    try {
      const { data: sqlData, error: sqlError } = await supabase.rpc('execute_sql', {
        sql_query: addUpdatedAtSQL
      });

      if (sqlError) {
        console.error('Error executing SQL via RPC:', sqlError.message);
        console.log('Trying alternative approach...');
      } else {
        console.log('Successfully executed SQL via RPC');
        return;
      }
    } catch (rpcError) {
      console.error('RPC execution error:', rpcError.message);
      console.log('Trying alternative approach...');
    }

    // Method 2: Update a user record to at least add a timestamp to existing rows
    console.log('\nAttempting to update user records to trigger a schema update...');

    // Get all user IDs
    const { data: allUsers, error: getAllError } = await supabase
      .from('users')
      .select('id')
      .limit(100);

    if (getAllError) {
      console.error('Error getting user IDs:', getAllError.message);
      return;
    }

    if (!allUsers || allUsers.length === 0) {
      console.log('No users found to update');
      return;
    }

    // Update each user to add a current timestamp
    console.log(`Updating ${allUsers.length} users to add timestamps...`);
    
    for (const user of allUsers) {
      const { data, error } = await supabase
        .from('users')
        .update({ 
          updated_at: new Date().toISOString() 
        })
        .eq('id', user.id)
        .select();

      if (error) {
        if (error.message.includes('column "updated_at" of relation "users" does not exist')) {
          console.log(`Column doesn't exist yet for user ${user.id}`);
        } else {
          console.error(`Error updating user ${user.id}:`, error.message);
        }
      } else {
        console.log(`Successfully updated user ${user.id}`);
      }
    }

    // Check if it worked
    console.log('\nVerifying updated_at column was added...');
    const { data: checkData, error: checkError } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (checkError) {
      console.error('Error verifying column addition:', checkError.message);
      return;
    }

    const checkRow = checkData && checkData.length > 0 ? checkData[0] : null;
    
    if (checkRow && Object.keys(checkRow).includes('updated_at')) {
      console.log('Success! updated_at column now exists in users table');
    } else {
      console.log('Failed to add updated_at column');
    }

  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

addUpdatedAtColumn()
  .then(() => console.log('\nProcess completed'))
  .catch(error => console.error('Unhandled error:', error))
  .finally(() => process.exit(0));