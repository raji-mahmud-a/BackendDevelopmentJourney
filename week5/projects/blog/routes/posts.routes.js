import {Router} from 'express';
import getAllPosts from '../controllers/getAllPosts.controller.js';
import getPostBySlug from '../controllers/getPostBySlug.controller.js';
import deletePostBySlug from '../controllers/deletePostBySlug.controller.js';
import { validatePostsBySlugEndpoint, validatePostBodyEndpoint } from "../middlewares/validators.middleware.js"
import addNewPost from '../controllers/addNewPost.controller.js';
import upload from '../middlewares/post.multer.middleware.js';

const postRoutes = Router()

postRoutes.route('/:slug').all(validatePostsBySlugEndpoint).get(getPostBySlug).delete(deletePostBySlug)
postRoutes.route('/').get(getAllPosts).post(upload.single("upload"), validatePostBodyEndpoint, addNewPost)

export default postRoutes
