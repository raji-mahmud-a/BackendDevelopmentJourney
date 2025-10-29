import * as fs from 'node:fs';
import { writeFile } from 'node:fs/promises';

const content = 'This data will be written to a file, overwriting any existing content.';

// --- A. Callback Example ---
fs.writeFile('./writefile_callback.txt', content + ' (Callback)', 'utf8', (err) => {
  if (err) {
    console.error('Callback Error:', err.message);
    return;
  }
  console.log('--- Callback Result ---');
  console.log('File written successfully via callback.');
});

// --- B. Synchronous Example (fs.writeFileSync) ---
try {
  fs.writeFileSync('./writefile_sync.txt', content + ' (Sync)', 'utf8');

  console.log('\n--- Synchronous Result ---');
  console.log('File written successfully via synchronous call.');

} catch (err) {
  console.error('Synchronous Error:', err.message);
}

// --- C. Promises Example (fs/promises.writeFile) ---
async function writeFilePromise() {
  try {
    await writeFile('./writefile_promise.txt', content + ' (Promise)', 'utf8');

    console.log('\n--- Promise Result ---');
    console.log('File written successfully via Promises.');

  } catch (err) {
    console.error('Promise Error:', err.message);
  }
}

// Execute the async function
writeFilePromise();

