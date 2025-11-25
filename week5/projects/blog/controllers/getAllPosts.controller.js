import readPosts from '../utils/read.posts.js';

const getAllPosts = (req, res)=>{
 const data = readPosts()
 res.status(200).json({
  success: true,
  data: data,
  error: null
 })
}

export default getAllPosts
