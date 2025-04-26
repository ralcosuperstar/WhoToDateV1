// Script to update user records and trigger schema update
import { createClient } from '@supabase/supabase-js';
import dns from 'dns';

// Configure DNS resolution to prefer IPv4
dns.setDefaultResultOrder('ipv4first');
console.log('Set DNS resolution to prefer IPv4');

// Supabase credentials
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Make sure SUPABASE_URL and SUPABASE_SERVICE_KEY are set.');
  process.exit(1);
}

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to simulate updating all user records
async function updateAllUsers() {
  console.log('Updating all user records to simulate schema update...');
  
  try {
    // First, get all users
    const { data: users, error: fetchError } = await supabase
      .from('users')
      .select('id, email')
      .limit(100);
      
    if (fetchError) {
      console.error('Error fetching users:', fetchError.message);
      return false;
    }
    
    console.log(`Found ${users.length} users to update`);
    
    // Update each user with a small change to trigger updated_at
    let successCount = 0;
    let failureCount = 0;
    
    for (const user of users) {
      try {
        // Try just updating a basic field to trigger any existing triggers
        const { error: basicUpdateError } = await supabase
          .from('users')
          .update({ 
            // Keep email the same
            email: user.email || null 
          })
          .eq('id', user.id);
          
        if (basicUpdateError) {
          console.error(`User ${user.id}: Failed with basic update:`, basicUpdateError.message);
          failureCount++;
        } else {
          console.log(`User ${user.id}: Basic update successful`);
          successCount++;
        }
      } catch (error) {
        console.error(`User ${user.id}: Exception during update:`, error.message);
        failureCount++;
      }
    }
    
    console.log(`Update complete: ${successCount} successes, ${failureCount} failures`);
    
    // Now check if we have the updated_at column
    const { data: checkData, error: checkError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
      
    if (checkError) {
      console.error('Error checking users table after updates:', checkError.message);
      return false;
    }
    
    const hasUpdatedAt = checkData && checkData.length > 0 && 
                         Object.keys(checkData[0]).includes('updated_at');
                         
    console.log(`After updates, updated_at column exists: ${hasUpdatedAt ? 'YES' : 'NO'}`);
    
    return successCount > 0;
  } catch (error) {
    console.error('Error updating users:', error.message);
    return false;
  }
}

// Run the update
updateAllUsers()
  .then(success => {
    console.log('Process completed with result:', success ? 'SUCCESS' : 'FAILURE');
  })
  .catch(error => {
    console.error('Unhandled error:', error);
  });