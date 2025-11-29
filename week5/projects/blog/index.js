import express from 'express';
import postRoutes from './routes/posts.routes.js';
import {loadEnvFile} from 'node:process';
loadEnvFile()
const s = express()
const PORT = process.env.PORT
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

