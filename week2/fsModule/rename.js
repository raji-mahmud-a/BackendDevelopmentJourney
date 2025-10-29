import * as fs from 'node:fs';
import { rename } from 'node:fs/promises';

// --- Setup: Create dummy files for renaming ---
// In a real application, you'd ensure these exist or handle the error.
fs.writeFileSync('./rename_old_callback.txt', 'Callback data.');
fs.writeFileSync('./rename_old_sync.txt', 'Sync data.');
fs.writeFileSync('./rename_old_promises.txt', 'Promise data.');
// ---------------------------------------------

// --- A. Callback Example ---
fs.rename('./rename_old_callback.txt', './rename_callback.txt', (err) => {
  if (err) {
    console.error('Callback Error:', err.message);
    return;
  }
  console.log('--- Callback Result ---');
  console.log('File successfully renamed via callback.');
});

// --- B. Synchronous Example (fs.renameSync) ---
try {
  fs.renameSync('./rename_old_sync.txt', './rename_sync.txt');

  console.log('\n--- Synchronous Result ---');
  console.log('File successfully renamed via synchronous call.');

} catch (err) {
  console.error('Synchronous Error:', err.message);
}

// --- C. Promises Example (fs/promises.rename) ---
async function renameFilePromise() {
  try {
    await rename('./rename_old_promises.txt', './rename_promises.txt');

    console.log('\n--- Promise Result ---');
    console.log('File successfully renamed via Promises.');

  } catch (err) {
    console.error('Promise Error:', err.message);
  }
}

// Execute the async function
renameFilePromise();

