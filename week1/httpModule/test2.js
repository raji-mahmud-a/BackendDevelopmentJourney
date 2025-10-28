const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);
	console.log(req)
  // Get different parts of the URL
  const pathname = parsedUrl.pathname; // The path without query string
  const query = parsedUrl.query; // The query string as an object

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    pathname,
    query,
    fullUrl: req.url
  }, null, 2));
});

server.listen(3000);
