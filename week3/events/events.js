const http = require('http');

// --- HTTP Server Setup ---
const PORT = 3000;
const server = http.createServer((req, res) => {
  // Simulate a request that takes a moment to process
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Node.js HTTP Server!');
  }, 10);
});

// Start listening
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`PID: ${process.pid}. Press Ctrl+C to test graceful shutdown.`);
});


// --- Critical Process Events ---

process.on('exit', (code) => {
  console.log(`Process exiting with code: ${code}`);
});

process.on('beforeExit', (code) => {
  if (!global.ranBeforeExitAsync) {
    global.ranBeforeExitAsync = true;
    setTimeout(() => {
      console.log('Async work done, re-entering event loop.');
    }, 100);
  }
});

process.on('uncaughtException', (error, origin) => {
  console.error('\n💥 Uncaught Exception:', error.message);
  gracefulShutdown('UNCAUGHT_EXCEPTION', 1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n💔 Unhandled Rejection:', reason);
  gracefulShutdown('UNHANDLED_REJECTION', 1);
});

process.on('warning', (warning) => {
  console.warn('\n⚠️ Process Warning:', warning.message);
});


// --- Graceful Shutdown Logic ---

function gracefulShutdown(signal, exitCode = 0) {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  // 1. Stop the HTTP server from accepting new connections
  server.close(() => {
    // 2. This callback runs when all existing connections are closed
    console.log('HTTP server closed. All active requests completed.');
    // 3. Close other resources (e.g., database.close(), file locks)
    // 4. Exit the process
    process.exit(exitCode);
  });
  
  // 5. Force shutdown after a timeout if cleanup hangs
  setTimeout(() => {
    console.error('Forceful shutdown after timeout: Cleanup took too long!');
    process.exit(1);
  }, 5000).unref(); // unref() allows Node to exit if this is the only thing left
}

// --- Signal Listeners ---

process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Termination signal
process.on('SIGINT', () => gracefulShutdown('SIGINT'));   // Ctrl+C signal

// --- Event Triggers ---

// Test Warning
process.emitWarning('Low memory detected.', { code: 'MEMORY_ALERT' });

// Test Unhandled Rejection
setTimeout(() => {
  Promise.reject(new Error('Promise failed without a catch!'));
}, 500);

// Uncomment the block below to test uncaughtException

setTimeout(() => {
  throw new Error('A synchronous error was thrown!');
}, 1000);

