import express from 'express';
import postRoutes from './routes/posts.routes.js';
import { loadEnvFile } from 'node:process';
import morgan from "morgan"
import { randomUUID } from 'crypto';
import db from "./db/database.config.js"
import http from "node:http"

loadEnvFile()

const s = express()
const PORT = process.env.PORT

s.use(function assignId (req, res, next) {req.id = randomUUID(); next()})
morgan.token('id', function getId(req) { return req.id});
s.use(morgan(":id :method :url :status :response-time ms - :res[content-length]"))
s.use("/api/posts", postRoutes)
s.use('/static', express.static("./static"))

const server = http.createServer(s)
server.listen(PORT, (err)=>{
 if (err) {
  console.error(`Server failed to start on port ${PORT}.`, err.message);
  process.exit(1);
 } else {
  console.log(`Server up and active on port: ${PORT}`);
 }
})
s.timeout = 10 * 1000

const shutdown =()=>{
 db.shutdown()
 s.close()
 console.log("shutting down server!!!")
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
