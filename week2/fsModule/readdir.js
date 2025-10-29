import * as fs from 'node:fs';
import { readdir } from 'node:fs/promises';

const dirPath = './readdir_test_dir';

// --- Setup: Create directory and some files/subdirs inside it ---
fs.mkdirSync(dirPath, { recursive: true });
fs.writeFileSync(dirPath + '/file1.txt', 'data');
fs.writeFileSync(dirPath + '/file2.log', 'data');
fs.mkdirSync(dirPath + '/subdir');
// ----------------------------------------------------------------

// --- A. Callback Example ---
fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error('Callback Error:', err.message);
    return;
  }
  console.log('--- Callback Result (Names Array) ---');
  console.log(`Contents of ${dirPath}:`, files); 
  // Output example: [ 'file1.txt', 'file2.log', 'subdir' ]
});

// --- B. Synchronous Example (fs.readdirSync) ---
try {
  // Read using the withFileTypes option
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  console.log('\n--- Synchronous Result (Dirent Array) ---');
  console.log(`Contents of ${dirPath}:`);
  console.log(entries)
  entries.forEach(entry => {
    console.log(`- ${entry.name}: ${entry.isDirectory() ? 'Directory' : 'File'}`);
  });
  // Output example: - file1.txt: File, - subdir: Directory, etc.

} catch (err) {
  console.error('Synchronous Error:', err.message);
}

// --- C. Promises Example (fs/promises.readdir) ---
async function readdirPromise() {
  try {
    const files = await readdir(dirPath);

    console.log('\n--- Promise Result (Names Array) ---');
    console.log(`Contents of ${dirPath}:`, files);

  } catch (err) {
    console.error('Promise Error:', err.message);
  }
}

// Execute the async function
readdirPromise();

