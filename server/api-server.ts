import express from 'express';
import cors from 'cors';
import { supabaseStorage } from './supabaseStorage';
import { registerRoutes } from './routes';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Check for required environment variables
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SESSION_SECRET'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: Environment variable ${envVar} is required but not set.`);
    process.exit(1);
  }
}

// Create a dedicated API server without Vite
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for all routes (important for cross-port API requests)
app.use(cors());

// Log middleware for debugging
app.use((req, res, next) => {
  console.log(`API Server: ${req.method} ${req.path}`);
  next();
});

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  console.log('💖 API Health check endpoint hit');
  return res.json({ status: 'ok', time: new Date().toISOString() });
});

// Simple test endpoint that returns user information
app.get('/api/test-users', async (req, res) => {
  try {
    const users = await supabaseStorage.getAllUsers();
    console.log('📊 Retrieved users count:', users.length);
    // Don't send sensitive data like passwords
    const safeUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified
    }));
    return res.json({ users: safeUsers });
  } catch (error) {
    console.error('❌ Error retrieving users:', error);
    return res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// Initialize routes and server
(async () => {
  console.log('✅ Starting dedicated API server...');
  console.log('✅ Connecting to Supabase...');
  
  // Register all API routes
  const server = await registerRoutes(app);
  
  // Start the server on port 4000
  const PORT = 4000;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ API server running on port ${PORT}`);
    console.log('📣 API base URL: http://localhost:4000/api');
  });
})();