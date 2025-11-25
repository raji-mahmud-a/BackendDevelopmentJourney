import readPosts from '../utils/read.posts.js';

const deletePostByID = async(req, res)=>{
 const ID = req.validatedID
 const posts = await readPosts()
 const post = posts.find(post => post.id === ID);

 if(!post){
   return res.status(404).json({
   success: false,
   data: null,
   error: `A post with the specific ID(${ID}) not found`
  })
 }

 res.status(200).json({
  success: true,
  data: `The post with the specific ID(${ID}) has been succesfully deleted`,
  error: null
 })
}

export default deletePostByID
