import {readFile} from "node:fs" // callback API
import {readFileSync} from "node:fs" // Synchronous Api
import {readFile as readFilePromise} from "node:fs/promises" // Promise api

console.log("Beginning of callback API")

readFile("./readFile.txt",  (err, data)=>{
	if(err){console.log(`Callback Api Error: ${err}`); return}

	console.log(`Data recieved from callback api`)
	console.log(data)
	console.log(data.toString())
	console.log(typeof data)


})

console.log("end of callback api")



console.log("Sync Api Start")

const dataSync = readFileSync('./readFile.txt', 'utf8');
console.log(`Data recieved from sync api`)
console.log(dataSync)
console.log(typeof dataSync)

console.log("sync Api end")


console.log("promise Api Start")
console.log(await readFilePromise("./readFile.txt", "utf8")) // top level await
const dataPromise = readFilePromise("./readFile.txt", "utf8")
console.log(await dataPromise)
dataPromise.catch((e)=>{console.log("promise catched an error")})
console.log("promise Api end")
