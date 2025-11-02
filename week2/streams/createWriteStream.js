const fs = require('fs');
const writable = fs.createWriteStream('output.txt');

function writeMillionLines() {
  let i = 0;
  
  function write() {
    let canContinue = true;
    
    while (i < 1000000 && canContinue) {
      i++;
      const line = `Line ${i}\n`;
      
      // write() returns false when buffer is full
      canContinue = writable.write(line);
      
      if (!canContinue) {
        console.log(`⚠️  Backpressure at line ${i}`);
        console.log('    Waiting for drain event...');
      }
    }
    
    if (i < 1000000) {
      // Buffer full, wait for drain
      writable.once('drain', () => {
        console.log('✅ Drain event - buffer emptied, resuming...');
        write(); // Continue writing
      });
    } else {
      // Done writing
      writable.end(() => {
        console.log('✅ Finished writing 1M lines');
      });
    }
  }
  
  write();
}

writeMillionLines();
