import readPosts from '../utils/read.posts.js';
import writePosts from '../utils/write.posts.js';

const getPostByID = async (req, res)=>{
 const ID = req.validatedID
 const data = await readPosts()
 const IdData = data.find((val)=>val.id === ID)

 IdData.view_count += 1
 await writePosts(data)

 res.status(200).json({
  success: true,
  data: IdData
 })
}

export default getPostByID
