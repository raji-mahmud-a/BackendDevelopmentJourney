import fs from "node:fs"

const readStream = fs.createReadStream('vid.mp4');
const writeStream = fs.createWriteStream('vid2222.mp4');


console.time("stream")
readStream.pipe(writeStream);
console.timeEnd("stream")

process.exit(1)
