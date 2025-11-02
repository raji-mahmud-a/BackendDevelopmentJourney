const fs = require('fs');

// --- Configuration ---
const FILE_NAME = 'app.log';
const TARGET_SIZE_MB = 1024 * 2;
const TARGET_SIZE_BYTES = TARGET_SIZE_MB * 1024 * 1024;

// Static data arrays for realistic variation
const LOG_LEVELS = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'];
const SERVICES = ['api-service', 'auth-worker', 'db-connector', 'scheduler', 'cache-manager'];
const INFO_MESSAGES = [
    "Request processed successfully for user:",
    "Database query execution time: 15ms.",
    "Session expiration check initiated.",
    "Data structure initialized with capacity:",
];
const ERROR_MESSAGES = [
    "Failed to connect to primary host: Connection timeout.",
    "NullPointerException in module:",
    "Invalid user input received from IP:",
    "Resource limit exceeded for service:",
];

// --- Helper Functions ---

/**
 * Returns a random integer between min and max (inclusive).
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random element from an array.
 */
function randomElement(arr) {
    return arr[randomInt(0, arr.length - 1)];
}

/**
 * Generates a fake IP address (e.g., 192.168.1.10)
 */
function generateIP() {
    return `${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}`;
}

/**
 * Generates a realistic, ISO-like timestamp from the last 24 hours.
 */
function generateTimestamp() {
    const now = Date.now();
    // Random offset up to 24 hours ago (86400000 milliseconds)
    const randomTime = now - randomInt(0, 86400000);
    return new Date(randomTime).toISOString().replace('T', ' ').split('.')[0];
}

/**
 * Generates a single, realistic log line.
 * @returns {string} A formatted log line.
 */
function generateLogLine() {
    const timestamp = generateTimestamp();
    const level = randomElement(LOG_LEVELS);
    const service = randomElement(SERVICES);
    const pid = randomInt(1000, 9999);
    let message;

    // Use a small switch to assign messages based on the log level
    switch (level) {
        case 'CRITICAL':
        case 'ERROR':
            message = randomElement(ERROR_MESSAGES) + ` [ID:${randomInt(10000, 99999)}]`;
            break;
        case 'WARN':
            message = `High latency detected for external API: ${randomInt(500, 1500)}ms.`;
            break;
        case 'DEBUG':
        case 'INFO':
        default:
            message = randomElement(INFO_MESSAGES) + (level === 'DEBUG' ? ` (Value: ${randomInt(1, 500)})` : ` ${generateIP()}`);
            break;
    }

    // Standard log format: [TIMESTAMP] [LEVEL] [SERVICE:PID] MESSAGE
    return `[${timestamp}] [${level.padEnd(8)}] [${service}:${pid}] ${message}\n`;
}

/**
 * Main function to generate the large file using a writable stream.
 */
function createLargeLogFile() {
    console.log(`🚀 Starting log file generation: ${FILE_NAME} (Target: ${TARGET_SIZE_MB}MB)...`);

    // Create the writable stream
    const writeStream = fs.createWriteStream(FILE_NAME);
    let currentSize = 0;

    // Function to write data and handle backpressure
    function write() {
        let ok = true;
        do {
            const chunk = generateLogLine();
            currentSize += Buffer.byteLength(chunk, 'utf8');

            if (currentSize >= TARGET_SIZE_BYTES) {
                // End the stream when the target size is reached
                writeStream.end(chunk);
                console.log(`✅ File creation complete. Final size is approx. ${Math.round(currentSize / (1024 * 1024))}MB.`);
                return;
            } else {
                // Call write() and check its return value for backpressure
                ok = writeStream.write(chunk);
            }
        } while (currentSize < TARGET_SIZE_BYTES && ok);

        // If 'ok' is false, the stream buffer is full (backpressure detected)
        if (currentSize < TARGET_SIZE_BYTES) {
            // Wait for the 'drain' event before continuing to write
            writeStream.once('drain', write);
        }
    }

    // Start the writing process
    write();

    // Error handling
    writeStream.on('error', (err) => {
        console.error('❌ An error occurred during file writing:', err);
    });
}

// Execute the main function
createLargeLogFile();

