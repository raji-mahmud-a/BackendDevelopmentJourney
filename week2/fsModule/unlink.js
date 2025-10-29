import * as fs from 'node:fs';
import { unlink } from 'node:fs/promises';


// --- A. Callback Example ---
fs.unlink('./unlink_callback.txt', (err) => {
  if (err) {
    console.error('Callback Error:', err.message);
    return;
  }
  console.log('--- Callback Result ---');
  console.log('File successfully deleted via callback.');
});

// --- B. Synchronous Example (fs.unlinkSync) ---
try {
  fs.unlinkSync('./unlink_sync.txt');

  console.log('\n--- Synchronous Result ---');
  console.log('File successfully deleted via synchronous call.');

} catch (err) {
  console.error('Synchronous Error:', err.message);
}

// --- C. Promises Example (fs/promises.unlink) ---
async function deleteFilePromise() {
  try {
    await unlink('./unlink_promises.txt');

    console.log('\n--- Promise Result ---');
    console.log('File successfully deleted via Promises.');

  } catch (err) {
    console.error('Promise Error:', err.message);
  }
}

// Execute the async function
deleteFilePromise();

