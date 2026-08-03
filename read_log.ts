import fs from 'fs';

async function testApi() {
  console.log("Testing API endpoint directly...");
  try {
    // We can't easily test authenticated routes directly without the session cookie.
    // Instead we rely on the log file written by the running server.
    const logContent = fs.readFileSync('ask-loop-debug.log', 'utf8');
    console.log("Log content:", logContent);
  } catch (e) {
    console.log("No log file found yet.");
  }
}

testApi();
