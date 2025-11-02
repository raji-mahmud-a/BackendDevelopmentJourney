const fs = require("node:fs")
const os = require('os');

const readderr = fs.createReadStream(`/app.log`)
let data = ""
let count = 0
readderr.setEncoding("utf8")

readderr.on("data", (chunk)=>{
	let logs = chunk.split("\n")
	logs.forEach(line => {
		if (line.includes(`[${process.argv[2].padEnd(8).toUpperCase()}]`)) {
			console.log(line)		       
			count++;
		}
	})
})

readderr.on("end", ()=>{
	console.log(count)
})

readderr.on("error", (err)=>{
	console.log(err.code)
})
