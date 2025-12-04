import checkSlug from "../utils/checkSlug.util.js"
import db from "../db/database.config.js"
import incrementViewCount from "../utils/incrementViewCount.util.js"

const getPostBySlug = async (req, res)=>{
 const slug = req.body.slug
 const exists = checkSlug(slug)

 if(!exists){
   return res.status(404).json({
   success: false,
   data: null,
   error: `The required post was not found`
  })
 }

 const post = db.getPostBySlug(slug)
 incrementViewCount(slug)

 res.status(200).json({
  success: true,
  data: post,
  error: null
 })
}

export default getPostByID
