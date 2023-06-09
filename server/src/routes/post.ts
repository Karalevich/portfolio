import express from 'express'
import {
  getPosts,
  commentPost,
  getCertainPost,
  getPostsBySearch,
  createPosts,
  updatePost,
  deletePost,
  likePost,
  getPostsByTags,
} from '../controllers/post'
import auth from '../middleware/auth'


const router = express.Router()

router.get('/search', getPostsBySearch)
router.get('/tags', getPostsByTags)
router.get('/', getPosts)
router.get('/:id', getCertainPost)
router.post('/', auth, createPosts)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', auth, commentPost)

export default router