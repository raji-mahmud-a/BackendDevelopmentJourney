import http from "node:http"
const PORT = 35921

const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const server = http.createServer((req, res) => {
	// Manual extraction (pseudo-code)
let userIP = req.headers['x-forwarded-for'];

if (userIP) {
    // Take the first IP if it's a comma-separated list
    userIP = userIP.split(',')[0].trim();
} else {
    // Fallback to the direct connection address
    userIP = req.connection.remoteAddress;
}

	const clientIp = userIP
	console.log( green + `\nNew Connection ==》` + reset)
	console.log( red + `	From: ${clientIp}` +reset)
	console.log( yellow + `	To: ${req.url}` + reset)
	console.log( yellow + 	`	Timestamp: ${(new Date()).toISOString()}`  +reset)
	res.end(`<h1 style="margin:2rem auto;">I Got your ip Address: ${clientIp}<h1/> \n <h2>hahaha<h2/>`)
})

server.listen(PORT, ()=>{ console.log(green +  `Server Active, Up and running on port: ${PORT} \n Timestamp: ${(new Date()).toISOString()}` + reset) })
