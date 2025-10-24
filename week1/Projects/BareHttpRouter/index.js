import http from "node:http"
const PORT = 35921

const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const server = http.createServer((req, res) => {
	const clientIp = req.socket.remoteAddress;

	console.log( green + `\nNew Connection ==》` + reset)
	console.log( red + `	From: ${clientIp}` +reset)
	console.log( yellow + `	To: ${req.url}` + reset)
	console.log( yellow + 	`	Timestamp: ${(new Date()).toISOString()}`  +reset)
})

server.listen(PORT, ()=>{ console.log(green +  `Server Active, Up and running on port: ${PORT} \n Timestamp: ${(new Date()).toISOString()}` + reset) })
