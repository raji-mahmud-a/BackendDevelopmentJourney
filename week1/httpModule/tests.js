import http from "node:http"

http.createServer((req, res) => {
  const start = Date.now()
//  console.log(req)
console.log(res)
  while (Date.now() - start < 5000) {} // Busy loop
  res.end('Done')
  //console.log(res)
}).listen(3000)


