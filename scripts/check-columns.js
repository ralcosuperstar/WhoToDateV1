// Script to check if updated_at column exists using Supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Make sure SUPABASE_URL and SUPABASE_SERVICE_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tables = ['users', 'quiz_answers', 'reports', 'payments', 'blog_posts'];

async function checkColumns() {
  console.log('Checking columns in Supabase tables...');
  
  for (const table of tables) {
    try {
      console.log(`\nChecking table: ${table}`);
      
      // Get columns for this table
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.error(`Error querying table ${table}:`, error.message);
        continue;
      }
      
      if (!data || data.length === 0) {
        console.log(`No data found in table ${table}. Creating a temporary record to check schema.`);
        
        // Try to create a temporary record (this will reveal column structure)
        try {
          const { data: tempData, error: tempError } = await supabase
            .from(table)
            .insert({
              // Use a dummy UUID to prevent conflicts
              id: '00000000-0000-0000-0000-000000000001',
              // Add minimum required fields based on table
              ...(table === 'users' && { email: 'temp@example.com' }),
              ...(table === 'quiz_answers' && { user_id: '00000000-0000-0000-0000-000000000001', answers: {} }),
              ...(table === 'reports' && { user_id: '00000000-0000-0000-0000-000000000001', report: {} }),
              ...(table === 'payments' && { report_id: 1, amount: 0, status: 'test' }),
              ...(table === 'blog_posts' && { title: 'Test', content: 'Test', slug: 'test' })
            })
            .select();
            
          if (tempError) {
            console.log(`Could not create temporary record: ${tempError.message}`);
          } else {
            console.log('Created temporary record to check schema');
            
            // Delete the temporary record
            await supabase
              .from(table)
              .delete()
              .eq('id', '00000000-0000-0000-0000-000000000001');
          }
        } catch (tempInsertError) {
          console.log(`Could not create temporary record: ${tempInsertError.message}`);
        }
        
        // Try another approach - get table info from information schema
        try {
          console.log('Trying information_schema method...');
          const { data: infoData, error: infoError } = await supabase.rpc('get_table_columns', { 
            table_name: table 
          });
          
          if (infoError) {
            console.error(`Error getting schema information: ${infoError.message}`);
          } else {
            console.log(`Columns in ${table}:`, infoData.map(col => col.column_name).join(', '));
            
            const hasUpdatedAt = infoData.some(col => col.column_name === 'updated_at');
            console.log(`updated_at column exists: ${hasUpdatedAt ? 'YES' : 'NO'}`);
          }
        } catch (infoError) {
          console.error(`Error querying information schema: ${infoError.message}`);
        }
        
        continue;
      }
      
      // List all columns from the first row
      const row = data[0];
      const columns = Object.keys(row);
      console.log(`Columns in ${table}:`, columns.join(', '));
      
      // Check if updated_at exists
      const hasUpdatedAt = columns.includes('updated_at');
      console.log(`updated_at column exists: ${hasUpdatedAt ? 'YES' : 'NO'}`);
    } catch (error) {
      console.error(`Error checking table ${table}:`, error.message);
    }
  }
}

checkColumns()
  .then(() => console.log('\nColumn check completed'))
  .catch(error => console.error('Unhandled error:', error))
  .finally(() => process.exit(0));