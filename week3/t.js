function formatMemory(bytes) {
  return `${Math.round(bytes / 1024 / 1024 * 100) / 100} MB`;
}

/*
setInterval(() => {
  const used = process.memoryUsage();
  console.log({
    timestamp: new Date().toISOString(),
    heapUsed: formatMemory(used.heapUsed),
    rss: formatMemory(used.rss)
  });
}, 500);
*/

let baseline = process.memoryUsage().heapUsed;

function checkMemoryLeak() {
  const current = process.memoryUsage().heapUsed;
  const growth = current - baseline;
  
  console.log(`Memory growth: ${formatMemory(growth)}`);
  
  if (growth > 100 * 1024 * 1024) { // 100 MB
    console.warn('Potential memory leak detected!');
  }
  
  baseline = current;
}

setInterval(checkMemoryLeak, 6000); // Check every minute
