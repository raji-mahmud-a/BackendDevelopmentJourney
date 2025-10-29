import * as fs from 'node:fs';
import { rm } from 'node:fs/promises';

// --- Setup: Create files and a directory tree for deletion ---
fs.writeFileSync('./rm_file_callback.txt', 'Delete me.');
fs.writeFileSync('./rm_file_sync.txt', 'Delete me.');
fs.writeFileSync('./rm_file_promises.txt', 'Delete me.');

fs.mkdirSync('./rm_dir_sync/sub', { recursive: true });
fs.writeFileSync('./rm_dir_sync/sub/file.txt', 'Contents.');

fs.mkdirSync('./rm_dir_promises/sub', { recursive: true });
// -------------------------------------------------------------

// --- A. Callback Example (Deleting a File) ---
fs.rm('./rm_file_callback.txt', (err) => {
  if (err) {
    console.error('Callback Error:', err.message);
    return;
  }
  console.log('--- Callback Result ---');
  console.log('File successfully deleted via callback.');
});

// --- B. Synchronous Example (fs.rmSync - Deleting a Directory Recursively) ---
try {
  // Use recursive: true to delete the directory and all its contents
  fs.rmSync('./rm_dir_sync', { recursive: true }); 

  console.log('\n--- Synchronous Result ---');
  console.log('Directory successfully deleted recursively via synchronous call.');

} catch (err) {
  console.error('Synchronous Error:', err.message);
}

// --- C. Promises Example (fs/promises.rm - Deleting a File) ---
async function rmPromise() {
  try {
    // Deleting a file
    await rm('./rm_file_promises.txt');
    console.log('\n--- Promise Result ---');
    console.log('File successfully deleted via Promises.');

    // Deleting a directory (optional: to show recursive deletion)
    await rm('./rm_dir_promises', { recursive: true });
    console.log('Directory successfully deleted recursively via Promises.');

  } catch (err) {
    console.error('Promise Error:', err.message);
  }
}

// Execute the async function
rmPromise();

