// server-sliding-log.js
const http = require('http');

// Store: { userId: [timestamp1, timestamp2, ...] }
const rateLimitStore = new Map();

const WINDOW_SIZE_MS = 10000; // 10 seconds
const MAX_REQUESTS = 5;

function slidingWindowLog(userId) {
  const now = Date.now();
  const userLog = rateLimitStore.get(userId) || [];

  // Remove timestamps outside the current window
  const windowStart = now - WINDOW_SIZE_MS;
  const validRequests = userLog.filter(timestamp => timestamp > windowStart);

  // Check if user exceeded limit
  if (validRequests.length >= MAX_REQUESTS) {
    // Find when oldest request will expire
    const oldestTimestamp = validRequests[0];
    const resetIn = WINDOW_SIZE_MS - (now - oldestTimestamp);
    
    return { 
      allowed: false, 
      remaining: 0, 
      resetIn,
      currentCount: validRequests.length 
    };
  }

  // Allow request and add timestamp
  validRequests.push(now);
  rateLimitStore.set(userId, validRequests);

  return { 
    allowed: true, 
    remaining: MAX_REQUESTS - validRequests.length,
    currentCount: validRequests.length
  };
}

let requestCount = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/api/data' && req.method === 'GET') {
    requestCount++;
    
    const userId = req.headers['user-id'] || 'anonymous';
    const rateLimitResult = slidingWindowLog(userId);
    
    if (!rateLimitResult.allowed) {
      console.log(`❌ Request #${requestCount} BLOCKED for ${userId} (${rateLimitResult.currentCount}/${MAX_REQUESTS} in window)`);
      res.writeHead(429, { 
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetIn / 1000)
      });
      res.end(JSON.stringify({ 
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Try again in ${Math.ceil(rateLimitResult.resetIn / 1000)}s`,
        currentCount: rateLimitResult.currentCount
      }));
      return;
    }

    console.log(`✅ Request #${requestCount} allowed for ${userId} (${rateLimitResult.currentCount}/${MAX_REQUESTS} in sliding window)`);
    res.writeHead(200, { 
      'Content-Type': 'application/json',
      'X-RateLimit-Remaining': rateLimitResult.remaining.toString()
    });
    res.end(JSON.stringify({ 
      message: 'Success!', 
      requestNumber: requestCount,
      remaining: rateLimitResult.remaining,
      currentCount: rateLimitResult.currentCount
    }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server with Sliding Window Log rate limiting on http://localhost:3000');
  console.log('Limit: 5 requests per 10 second sliding window');
});
