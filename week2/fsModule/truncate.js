import * as fs from 'node:fs';
import { truncate } from 'node:fs/promises';

const initialContent = 'This is a long string of data that will be cut short.';
const initialLength = Buffer.byteLength(initialContent, 'utf8');
const newLength = 10; // Truncate the file to only the first 10 bytes

// --- Setup: Create dummy files with content ---
fs.writeFileSync('./truncate_callback.txt', initialContent);
fs.writeFileSync('./truncate_sync.txt', initialContent);
fs.writeFileSync('./truncate_promises.txt', initialContent);
// ---------------------------------------------

// --- A. Callback Example ---
fs.truncate('./truncate_callback.txt', newLength, (err) => {
  if (err) {
    console.error('Callback Error:', err.message);
    return;
  }
  console.log('--- Callback Result ---');
  console.log(`File successfully truncated to ${newLength} bytes via callback.`);
});

// --- B. Synchronous Example (fs.truncateSync) ---
try {
  fs.truncateSync('./truncate_sync.txt', newLength);

  console.log('\n--- Synchronous Result ---');
  console.log(`File successfully truncated to ${newLength} bytes via synchronous call.`);

} catch (err) {
  console.error('Synchronous Error:', err.message);
}

// --- C. Promises Example (fs/promises.truncate) ---
async function truncateFilePromise() {
  try {
    await truncate('./truncate_promises.txt', newLength);

    console.log('\n--- Promise Result ---');
    console.log(`File successfully truncated to ${newLength} bytes via Promises.`);

  } catch (err) {
    console.error('Promise Error:', err.message);
  }
}

// Execute the async function
truncateFilePromise();

