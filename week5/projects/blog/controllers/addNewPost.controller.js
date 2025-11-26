import createSlug from "../utils/createSlug.util.js"
import writePosts from '../utils/write.posts.js'
import readPosts from '../utils/read.posts.js'
let currentID = 1

const addNewPost = async(req, res)=>{
 const allPosts = await readPosts()
 const data = req.body
 data.id = currentID
 currentID ++
 const date = new Date()
 const slug = createSlug(data.title)
 const checkSlug = allPosts.filter((val)=>val.slug.startsWith(slug))
 data.slug = (checkSlug.length > 0) ? (slug + '-' + (checkSlug.length)) : slug
 data.excerpt = (data.excerpt) ? data.excerpt : data.content.substring(0, 200) + '...'
 data.status = (data.status === 'published') ? data.status : 'draft'
 data.view_count = 0
 data.created_at = date.toISOString()
 data.updated_at = date.toISOString()

 allPosts.push(data)
 writePosts(allPosts)

 res.status(201).json({
  "success": true,
  "message": "Post created successfully",
  "data" : {
   "post": data
  }
 })
}

export default addNewPost
