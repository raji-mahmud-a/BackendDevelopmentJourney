


const EventEmitter = require("node:events")
  .EventEmitter
const http = require("node:http")
const emitter = new EventEmitter()
const readline = require("node:readline/promises")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$==》 "
});
let name
(async()=>{
  const name2 = await rl.question('Name? ');
  name = name2
})()

http.createServer((req, res)=>{
 emitter.on("broadcast", (data)=>{
  res.write(data)
 })
 rl.on("close", ()=>{
  res.end("Broadcast ended!! \n")
  process.exit(0)
 })
}).listen(3214)

rl.on('line', (line) => {
  line = line.trim()
  if(line === "exit"){rl.close(); return}
  emitter.emit("broadcast", `${name}: ${line} \n`)
  rl.prompt();
});

rl.prompt()
