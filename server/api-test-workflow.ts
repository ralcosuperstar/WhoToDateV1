import { exec } from 'child_process';

// Start the API test server
exec('tsx server/api-test-server.ts', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting API test server: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`API test server stderr: ${stderr}`);
  }
  console.log(`API test server stdout: ${stdout}`);
});