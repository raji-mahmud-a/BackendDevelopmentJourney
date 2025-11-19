const http = require('http');

// Store: { userId: { count: number, windowStart: timestamp } }
const rateLimitStore = new Map();

const WINDOW_SIZE_MS = 10000; // 10 seconds
const MAX_REQUESTS = 5;

function fixedWindowRateLimit(userId) {
  const now = Date.now();
  const userLimit = rateLimitStore.get(userId);

  // No record or window expired - start new window
  if (!userLimit || now - userLimit.windowStart >= WINDOW_SIZE_MS) {
    rateLimitStore.set(userId, {
      count: 1,
      windowStart: now
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  // Within current window
  if (userLimit.count < MAX_REQUESTS) {
    userLimit.count++;
    return { allowed: true, remaining: MAX_REQUESTS - userLimit.count };
  }

  // Rate limit exceeded
  const resetIn = WINDOW_SIZE_MS - (now - userLimit.windowStart);
  return { allowed: false, remaining: 0, resetIn };
}

let requestCount = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/api/data' && req.method === 'GET') {
    requestCount++;
    
    // Extract user ID (in real world: from JWT, API key, etc.)
    const userId = req.headers['user-id'] || 'anonymous';
    
    const rateLimitResult = fixedWindowRateLimit(userId);
    
    if (!rateLimitResult.allowed) {
      console.log(`❌ Request #${requestCount} BLOCKED for ${userId}`);
      res.writeHead(429, { 
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetIn / 1000)
      });
      res.end(JSON.stringify({ 
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Try again in ${Math.ceil(rateLimitResult.resetIn / 1000)}s`
      }));
      return;
    }

    console.log(`✅ Request #${requestCount} allowed for ${userId} (${rateLimitResult.remaining} remaining)`);
    res.writeHead(200, { 
      'Content-Type': 'application/json',
      'X-RateLimit-Remaining': rateLimitResult.remaining.toString()
    });
    res.end(JSON.stringify({ 
      message: 'Success!', 
      requestNumber: requestCount,
      remaining: rateLimitResult.remaining
    }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server with Fixed Window rate limiting on http://localhost:3000');
  console.log('Limit: 5 requests per 10 seconds');
});
