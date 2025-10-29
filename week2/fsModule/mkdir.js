import * as fs from 'node:fs';
import { mkdir } from 'node:fs/promises';

const baseDir = './mkdir_test_';

// --- A. Callback Example ---
// This creates a directory recursively
fs.mkdir(baseDir + 'callback/sub/dir', { recursive: true }, (err) => {
  if (err) {
    console.error('Callback Error:', err.message);
    return;
  }
  console.log('--- Callback Result ---');
  console.log(`Directory successfully created: ${baseDir}callback/sub/dir`);
});

// --- B. Synchronous Example (fs.mkdirSync) ---
try {
  const newPath = baseDir + 'sync';
  fs.mkdirSync(newPath); // Creates only the final directory

  console.log('\n--- Synchronous Result ---');
  console.log(`Directory successfully created: ${newPath}`);

} catch (err) {
  console.error('Synchronous Error:', err.message);
}

// --- C. Promises Example (fs/promises.mkdir) ---
async function mkdirPromise() {
  const newPath = baseDir + 'promises/deep';
  try {
    const result = await mkdir(newPath, { recursive: true });

    console.log('\n--- Promise Result ---');
    console.log(`Directory successfully created: ${newPath}`);
    // Logs the path of the created directory if recursive: true
    if (result) {
      console.log(`Path of first created directory: ${result}`);
    }

  } catch (err) {
    console.error('Promise Error:', err.message);
  }
}

// Execute the async function
mkdirPromise();

