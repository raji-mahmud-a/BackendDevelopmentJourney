import * as z from "zod"

const SlugSchema = z.object({id: z.text().min(5)})
export const validatePostsBySlugEndpoint =(req, res, next)=>{
 SlugSchema.parse(req.params)
 next()
}

const postBody = z.object({
 title: z.string().min(5).max(200),
 content: z.string().min(50).max(1000),
 excerpt: z.string().max(200).optional(),
 status: z.enum(['published', 'draft']).default('draft').catch('draft')
})

export const validatePostBodyEndpoint =(req, res, next)=>{
 postBody.parse(req.body)
 if(!req.file)return new Error("IMAGE_NOT_ADDED")
 next()
}
