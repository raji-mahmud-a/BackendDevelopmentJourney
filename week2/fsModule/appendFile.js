import * as fs from 'node:fs';
import { appendFile } from 'node:fs/promises';

const contentToAppend = '\n--- New line appended at ' + new Date().toLocaleTimeString() + '.';

// --- A. Callback Example ---
fs.appendFile('./appendFile_callback.txt', contentToAppend + ' (Callback)', 'utf8', (err) => {
  if (err) {
    console.error('Callback Error:', err.message);
    return;
  }
  console.log('--- Callback Result ---');
  console.log('Data appended successfully via callback.');
});

// --- B. Synchronous Example (fs.appendFileSync) ---
try {
  fs.appendFileSync('./appendFile_sync.txt', contentToAppend + ' (Sync)', 'utf8');

  console.log('\n--- Synchronous Result ---');
  console.log('Data appended successfully via synchronous call.');

} catch (err) {
  console.error('Synchronous Error:', err.message);
}

// --- C. Promises Example (fs/promises.appendFile) ---
async function appendFilePromise() {
  try {
    await appendFile('./appendFile_promises.txt', contentToAppend + ' (Promise)', 'utf8');

    console.log('\n--- Promise Result ---');
    console.log('Data appended successfully via Promises.');

  } catch (err) {
    console.error('Promise Error:', err.message);
  }
}

// Execute the async function
appendFilePromise();

