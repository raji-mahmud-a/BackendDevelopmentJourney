const v8 = require('v8');

// Before allocation
const before = process.memoryUsage();

// Allocate 100MB of buffers
const buffers = [];
for (let i = 0; i < 100; i++) {
  buffers.push(Buffer.alloc(1024 * 1024)); // 1MB each
}

// After allocation
const after = process.memoryUsage();

console.log('External memory (C++):', 
  (after.external - before.external) / 1024 / 1024, 'MB');
console.log('Heap used (V8):', 
  (after.heapUsed - before.heapUsed) / 1024 / 1024, 'MB');

// Output:
// External memory (C++): ~100 MB ← Buffer data
// Heap used (V8): ~2 MB ← JavaScript wrapper objects
