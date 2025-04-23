import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

// Create Express server
const app = express();
const PORT = 4400;

// Parse JSON request body
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));

// Check database connection
let dbConnected = false;
let dbError = null;

try {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
    
    // Test the connection
    supabase.from('users').select('count').limit(1).then(() => {
      dbConnected = true;
      console.log('✅ Supabase database connection successful');
    }).catch(err => {
      dbError = err.message;
      console.error('❌ Supabase connection error:', err);
    });
  } else {
    dbError = 'Supabase configuration not set';
    console.warn('⚠️ SUPABASE_URL or SUPABASE_SERVICE_KEY not set');
  }
} catch (error) {
  dbError = error.message;
  console.error('❌ Error initializing Supabase connection:', error);
}

// Basic test routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    server: 'test-server'
  });
});

// Configuration endpoint
app.get('/api/config', (req, res) => {
  res.json({
    apiVersion: '1.0',
    environment: process.env.NODE_ENV || 'development',
    cors: {
      enabled: true,
      origins: ['http://localhost:3000', 'http://localhost:5000']
    },
    database: {
      connected: dbConnected,
      error: dbError
    },
    supabase: {
      url: process.env.SUPABASE_URL ? '✓ Set' : '✗ Not set',
      anonKey: process.env.SUPABASE_ANON_KEY ? '✓ Set' : '✗ Not set',
      serviceKey: process.env.SUPABASE_SERVICE_KEY ? '✓ Set' : '✗ Not set'
    }
  });
});

// Echo endpoint for testing
app.post('/api/echo', (req, res) => {
  res.json({
    received: req.body,
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API Test Server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /api/health');
  console.log('- GET /api/config');
  console.log('- POST /api/echo');
});