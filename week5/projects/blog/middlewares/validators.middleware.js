import * as z from "zod"

const IDSchema = z.object({id: z.coerce.number().int().positive()})
export const validatePostsByIDEndpoint =(req, res, next)=>{
 IDSchema.parse(req.params)
 next()
}

const postBody = z.object({
 title: z.string().min(5).max(255),
 content: z.string().min(50).max(10000),
 excerpt: z.string().max(200).optional(),
 status: z.enum(['published', 'draft']).default('draft').catch('draft')
})

export const validatePostBodyEndpoint =(req, res, next)=>{
 postBody.parse(req.body)
 if(!req.file)return new Error("IMAGE_NOT_ADDED")
 next()
}
