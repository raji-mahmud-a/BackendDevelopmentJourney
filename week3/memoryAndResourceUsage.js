function formatMemory(bytes) {
  return `${Math.round(bytes / 1024 / 1024 * 100) / 100} MB`;
}

class ProcessMonitor {
  constructor() {
    this.startTime = Date.now();
    this.startCPU = process.cpuUsage();
  }
  
  getStats() {
    const mem = process.memoryUsage();
    const cpu = process.cpuUsage(this.startCPU);
    const uptime = (Date.now() - this.startTime) / 1000;
    
    return {
      uptime: `${Math.floor(uptime)}s`,
      memory: {
        rss: formatMemory(mem.rss),
        heapUsed: formatMemory(mem.heapUsed),
        heapTotal: formatMemory(mem.heapTotal)
      },
      cpu: {
        user: `${(cpu.user / 1000).toFixed(2)}ms`,
        system: `${(cpu.system / 1000).toFixed(2)}ms`
      }
    };
  }
  
  startMonitoring(interval = 10000) {
    setInterval(() => {
      console.log('Process Stats:', this.getStats());
    }, interval);
  }
}

const monitor = new ProcessMonitor();
monitor.startMonitoring();
