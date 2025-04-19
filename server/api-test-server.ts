import express from 'express';
import cors from 'cors';
import { Pool } from '@neondatabase/serverless';

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
  if (process.env.DATABASE_URL) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
    
    // Test the connection
    pool.query('SELECT NOW()').then(() => {
      dbConnected = true;
      console.log('✅ Database connection successful');
    }).catch(err => {
      dbError = err.message;
      console.error('❌ Database connection error:', err);
    });
  } else {
    dbError = 'DATABASE_URL not set';
    console.warn('⚠️ DATABASE_URL not set');
  }
} catch (error) {
  dbError = error.message;
  console.error('❌ Error initializing database connection:', error);
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