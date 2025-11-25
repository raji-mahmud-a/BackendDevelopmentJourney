import express from 'express';
import postRoutes from './routes/posts.routes.js';
import {loadEnvFile} from 'node:process';
loadEnvFile()
const PORT = process.env.PORT
const s = express()

s.use(express.json())
s.use("/api/posts", postRoutes)

s.listen(PORT, ()=>{
  console.log('server up and active on port: ', PORT)
})

