// 1. Allocates 1KB of *uninitialized* memory (fastest)
const uninitializedBuffer = Buffer.alloc(1024);

// 2. Creates a Buffer from a string (UTF-8 by default)
const data = "BackendMaster";
const textBuffer = Buffer.from(data, 'utf8');
console.log(`Buffer length: ${textBuffer.length} bytes`);
// Internal: V8 converts the string 'BackendMaster' into raw bytes
// and stores it off-heap.
console.log(textBuffer)
// 3. Converting back to string (often needed for JSON parsing)
const decodedText = textBuffer.toString('utf8');
console.log(`Decoded text: ${decodedText}`);

// 4. Accessing raw bytes
console.log(`First byte (ASCII/UTF-8 code): ${textBuffer}`); // Output: 66 (for 'B')

