const iterations = 1000000;

console.time('allocUnsafe');
for (let i = 0; i < iterations; i++) {
  Buffer.allocUnsafe(100);
}
console.timeEnd('allocUnsafe');
// allocUnsafe: ~50ms

console.time('alloc');
for (let i = 0; i < iterations; i++) {
  Buffer.alloc(100);
}
console.timeEnd('alloc');
// alloc: ~150ms (3x slower due to zeroing)
