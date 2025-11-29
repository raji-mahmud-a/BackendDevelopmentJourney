import readPosts from '../utils/read.posts.js';
import createSlug from '../utils/createSlug.util.js';

const validateBody = async(req, res, next)=>{
 const data = await readPosts()
 const slug = createSlug(req.body.title)
 if(!req.body.content || !req.body.title)return res.status(400).json({success: false, error: "Title and content are required"})
 if(req.body.title.length > 255 || req.body.title.length < 5)return res.status(422).json({success: false, error: "Title mustbe 5-255 characters"})
 if(req.body.content.length < 50)return res.status(422).json({"success": false,"error": "Content must be at least 50 characters"})
 if(slug && data.find((val)=>val.slug === slug))return res.status(409).json({success: false, error: "A post with similar title already exists"})
 if(!req.body.status || req.body.status !== 'published')req.body.status = 'draft'
 next()
}

export default validateBody
