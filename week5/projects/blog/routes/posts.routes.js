import {Router} from 'express';
import getAllPosts from '../controllers/getAllPosts.controller.js';
import getPostByID from '../controllers/getPostByID.controller.js';
import deletePostByID from '../controllers/deletePostByID.controller.js';
import validateID from '../middlewares/validateID.middleware.js';


const postRoutes = Router()
postRoutes.get('/', getAllPosts)
postRoutes.get('/:id', validateID, getPostByID)
postRoutes.delete('/:id', validateID, deletePostByID)



export default postRoutes
