import createSlug from "../utils/createSlug.util.js"
import db from "../db/database.config.js"

const addNewPost = async(req, res)=>{
 const { title, content, excerpt, status } = req.body
 const FeaturedImage = `${process.env.LIVE_URL}/static/uploads/${file.filename}`
 const Slug = createSlug(data.title)
 const Excerpt = (excerpt) ? excerpt : content.substring(0, 200) + '...'
 const Status = (status === 'published') ? status : 'draft'

 db.addNewPost(title, content, FeaturedImage, Slug, Excerpt, Status)

 res.status(201).json({
  "success": true,
  "message": "Post created successfully",
  "data": null
 })
}

export default addNewPost
