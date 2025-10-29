import * as fs from 'node:fs';
import { copyFile } from 'node:fs/promises';

// --- Setup: Create dummy source files for copying ---
fs.writeFileSync('./copyFile_source_callback.txt', 'Source data for callback copy.');
fs.writeFileSync('./copyFile_source_sync.txt', 'Source data for sync copy.');
fs.writeFileSync('./copyFile_source_promises.txt', 'Source data for promises copy.');
// ----------------------------------------------------

// --- A. Callback Example ---
fs.copyFile('./copyFile_source_callback.txt', './copyFile_callback.txt', (err) => {
  if (err) {
    console.error('Callback Error:', err.message);
    return;
  }
  console.log('--- Callback Result ---');
  console.log('File successfully copied via callback.');
});

// --- B. Synchronous Example (fs.copyFileSync) ---
try {
  fs.copyFileSync('./copyFile_source_sync.txt', './copyFile_sync.txt');

  console.log('\n--- Synchronous Result ---');
  console.log('File successfully copied via synchronous call.');

} catch (err) {
  console.error('Synchronous Error:', err.message);
}

// --- C. Promises Example (fs/promises.copyFile) ---
async function copyFilePromise() {
  try {
    await copyFile('./copyFile_source_promises.txt', './copyFile_promises.txt');

    console.log('\n--- Promise Result ---');
    console.log('File successfully copied via Promises.');

  } catch (err) {
    console.error('Promise Error:', err.message);
  }
}

// Execute the async function
copyFilePromise();

