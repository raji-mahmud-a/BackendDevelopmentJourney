import * as fs from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';

// Define a prefix for the temporary directory. 
// Using tmpdir() ensures we start in the system's temporary location (e.g., /tmp).
const prefix = tmpdir() + '/app-temp-'; 

// --- A. Callback Example ---
fs.mkdtemp(prefix + 'callback-', (err, dirPath) => {
  if (err) {
    console.error('Callback Error:', err.message);
    return;
  }
  console.log('--- Callback Result ---');
  console.log('Temporary directory created:', dirPath);
  // CLEANUP: Always remove temporary directories when done
  fs.rmdir(dirPath, { recursive: true }, () => console.log('Callback temp dir cleaned up.')); 
});

// --- B. Synchronous Example (fs.mkdtempSync) ---
try {
  const dirPath = fs.mkdtempSync(prefix + 'sync-'); 

  console.log('\n--- Synchronous Result ---');
  console.log('Temporary directory created:', dirPath);

  // CLEANUP
  fs.rmdirSync(dirPath, { recursive: true });
  console.log('Sync temp dir cleaned up.');

} catch (err) {
  console.error('Synchronous Error:', err.message);
}

// --- C. Promises Example (fs/promises.mkdtemp) ---
async function mkdtempPromise() {
  try {
    const dirPath = await mkdtemp(prefix + 'promises-'); 

    console.log('\n--- Promise Result ---');
    console.log('Temporary directory created:', dirPath);
    
    // CLEANUP
    await rm(dirPath, { recursive: true, force: true });
    console.log('Promise temp dir cleaned up.');

  } catch (err) {
    console.error('Promise Error:', err.message);
  }
}

// Execute the async function
mkdtempPromise();

