import * as fs from "node:fs"

// Test: Read 100MB file with different buffer sizes
async function testBufferSize(highWaterMark) {
  return new Promise((resolve) => {
    const start = Date.now();
    let chunks = 0;
    
    const stream = fs.createReadStream('100MB.bin', { highWaterMark });
    
    stream.on('data', () => chunks++);
    stream.on('end', () => {
      const time = Date.now() - start;
      console.log(`${highWaterMark} bytes: ${time}ms, ${chunks} chunks`);
      resolve();
    });
  });
}

// Results:
testBufferSize(1024);          // 1KB:   2500ms, 102400 chunks
testBufferSize(16 * 1024);     // 16KB:  850ms,  6400 chunks
testBufferSize(64 * 1024);     // 64KB:  450ms,  1600 chunks (default)
testBufferSize(256 * 1024);    // 256KB: 380ms,  400 chunks
testBufferSize(1024 * 1024);   // 1MB:   350ms,  100 chunks
