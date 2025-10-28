import http from "node:http"

http.createServer((req, res) => {
  const start = Date.now()
//  console.log(req)

  let url = new URL(req.url, "http://localDevEnv")
  console.log(url.searchParams)
  res.end('Done')
  //console.log(res)
}).listen(3000)


