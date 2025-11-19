const http = require('http');

let requestCount = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/api/data' && req.method === 'GET') {
    requestCount++;
    console.log(`Request #${requestCount} at ${new Date().toISOString()}`);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      message: 'Success!', 
      requestNumber: requestCount,
      timestamp: Date.now()
    }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Try: curl http://localhost:3000/api/data');
});
