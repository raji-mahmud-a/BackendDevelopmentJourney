import {Router} from 'express';
import getAllPosts from '../controllers/getAllPosts.controller.js';
import getPostByID from '../controllers/getPostByID.controller.js';
import deletePostByID from '../controllers/deletePostByID.controller.js';
//import validateID from '../middlewares/validateID.middleware.js';
import { validatePostsByIDEndpoint, validatePostBodyEndpoint } from "../middlewares/validators.middleware.js"
import validateBody from '../middlewares/validateBody.middleware.js';
import addNewPost from '../controllers/addNewPost.controller.js';
import upload from '../middlewares/post.multer.middleware.js';

const postRoutes = Router()
postRoutes.route('/:id').all(validatePostsByIDEndpoint).get(getPostByID).delete(deletePostByID)
postRoutes.route('/').get(getAllPosts).post(upload.single("upload"), validatePostBodyEndpoint, addNewPost)

export default postRoutes
