import express from 'express'
import {
  getPosts,
  getCertainPost,
  createPosts,
  updatePost,
  deletePost,
  likePost,
  getPostsByTags,
} from '../controllers/post'
import auth from '../middleware/auth'
import {
  contentValidator,
  descriptionValidator, imgValidator,
  tagsValidator,
  titleValidator,
} from '../middleware/validators/post-validator'


const router = express.Router()

router.get('/tags', getPostsByTags)
router.get('/', getPosts)
router.get('/:id', getCertainPost)
router.post('/',
  auth,
  titleValidator,
  descriptionValidator,
  tagsValidator,
  contentValidator,
  imgValidator,
  createPosts)
router.patch('/:id',
  auth,
  titleValidator,
  descriptionValidator,
  tagsValidator,
  contentValidator,
  imgValidator,
  updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router

