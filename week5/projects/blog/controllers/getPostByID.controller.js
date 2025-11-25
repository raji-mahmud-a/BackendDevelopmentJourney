import readPosts from '../utils/read.posts.js';


const getPostByID = async (req, res)=>{
 const ID = req.validatedID
 const data = await readPosts()
 const IdData = data.filter((val)=>val.id === ID)

 res.status(200).json({
  success: true,
  data: IdData,
  error: null
 })
}

export default getPostByID
