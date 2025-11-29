import express from 'express';
import postRoutes from './routes/posts.routes.js';
import {loadEnvFile} from 'node:process';
import morgan from "morgan"
import { randomUUID } from 'crypto';
loadEnvFile()

const s = express()
const PORT = process.env.PORT

s.use(function assignId (req, res, next) {req.id = randomUUID(); next()})
morgan.token('id', function getId(req) { return req.id});
s.use(morgan(":id :method :url :status :response-time ms - :res[content-length]"))
s.use("/api/posts", postRoutes)
s.use('/static', express.static("./static"))

s.listen(PORT, (err)=>{
 if (err) {
  console.error(`Server failed to start on port ${PORT}.`, err.message);
  process.exit(1);
 } else {
  console.log(`Server up and active on port: ${PORT}`);
 }
})

