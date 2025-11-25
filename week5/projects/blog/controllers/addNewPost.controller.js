import slugify from "slugify"
import writePosts from '../utils/write.posts.js'
import readPosts from '../utils/read.posts.js'
let currentID = 0

const addNewPost = async(req, res)=>{
 const allPosts = await readPosts()
 const data = req.body
 data.id = currentID++
 const date = new Date()
 const slug = slugify(data.title, {
  replacement: '-',
  remove: /[*+~.()""''!:@]/g,
  lower: true,
  strict: true,
  locale: 'en',
  trim: true
 });
 const checkSlug = allPosts.filter((val)=>val.slug.startsWith(slug))
 console.log(checkSlug.length)
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
