import db from "../db/database.config.js"

const getAllPosts = (req, res)=>{
 const posts = db.getAllPosts()

 res.status(200).json({
  success: true,
  data: posts,
  error: null
 })
}

export default getAllPosts
