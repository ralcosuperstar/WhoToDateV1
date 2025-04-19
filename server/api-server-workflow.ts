import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// For ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Start the API Server
console.log('Starting API Server...');

// Run the API server with tsx
const apiServer = spawn('npx', ['tsx', path.join(__dirname, 'api-server.ts')], {
  stdio: 'inherit', // Pipe stdio to the parent process
});

// Handle process exit
process.on('exit', () => {
  console.log('Shutting down API Server...');
  apiServer.kill();
});

// Handle ctrl+c
process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down API Server...');
  apiServer.kill();
  process.exit(0);
});

// Handle termination
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down API Server...');
  apiServer.kill();
  process.exit(0);
});

// Log the server start
console.log('API Server workflow started');