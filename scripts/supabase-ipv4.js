// Script to test IPv4 connections to Supabase
import { createClient } from '@supabase/supabase-js';
import dns from 'dns';

// Configure DNS resolution to prefer IPv4
dns.setDefaultResultOrder('ipv4first');
console.log('Set DNS resolution to prefer IPv4');

// Supabase credentials
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to test connection
async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Make a simple API call
    const { data, error } = await supabase.from('users').select('id').limit(1);
    
    if (error) {
      console.error('API Error:', error.message);
      return false;
    }
    
    console.log('Successfully connected to Supabase API!');
    console.log('Data:', data);
    return true;
  } catch (error) {
    console.error('Connection error:', error.message);
    return false;
  }
}

// Run the test
testConnection()
  .then(success => {
    console.log('Connection test completed with result:', success ? 'SUCCESS' : 'FAILURE');
  })
  .catch(error => {
    console.error('Unhandled error:', error);
  });