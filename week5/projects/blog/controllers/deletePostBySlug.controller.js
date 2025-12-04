import db from "../db/database.config.js"
import checkSlug from "../utils/checkSlug.util.js"

const deletePostBySlug = async(req, res)=>{
 const slug = req.params.slug
 const post = checkSlug(slug)
 if(!post){
   return res.status(404).json({
   success: false,
   data: null,
   error: `The required post was not found`
  })
 }

 db.deletePost(slug)

 res.status(200).json({
  success: true,
  data: `The post has been succesfully deleted`,
  error: null
 })
}

export default deletePostByID
