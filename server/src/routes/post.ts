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
import { body } from 'express-validator'


const router = express.Router()

router.get('/tags', getPostsByTags)
router.get('/', getPosts)
router.get('/:id', getCertainPost)
router.post('/',
  auth,
  body('title').isLength({ min: 3, max: 64 }).withMessage('Invalid title'),
  body('description').isLength({ min: 90, max: 150 }).withMessage('Invalid description'),
  body('tags').isLength({ max: 48 }).withMessage('Invalid tags'),
  body('content').isLength({ max: 15000 }).withMessage('Invalid content'),
  body('img')
    .custom((value) => {
      if (!value) {
        throw new Error('Image is required')
      }

      const [imageData, metadata] = value.split('#metadata=')

      const base64Regex = /^data:image\/(jpeg|jpg|png|webp);base64,/
      if (!base64Regex.test(imageData)) {
        throw new Error('Only JPEG, JPG, WEBP and PNG images are allowed')
      }

      const imageSizeBytes = Buffer.from(imageData.replace(base64Regex, ''), 'base64').length;

      const maxSize = 0.5 * 1024 * 1024 // 0.5MB
      if (imageSizeBytes > maxSize) {
        throw new Error('Image size exceeds the allowed limit')
      }

      return true
    }),
  createPosts)
router.patch('/:id',
  auth,
  body('title').isLength({ min: 3, max: 64 }).withMessage('Invalid title'),
  body('description').isLength({ min: 90, max: 150 }).withMessage('Invalid description'),
  body('tags').isLength({ max: 48 }).withMessage('Invalid tags'),
  body('content').isLength({ max: 15000 }).withMessage('Invalid content'),
  body('img')
    .custom((value) => {
      if (!value) {
        throw new Error('Image is required')
      }

      const [imageData, metadata] = value.split('#metadata=')

      const base64Regex = /^data:image\/(jpeg|jpg|png|webp);base64,/
      if (!base64Regex.test(imageData)) {
        throw new Error('Only JPEG, JPG, WEBP and PNG images are allowed')
      }

      const imageSizeBytes = Buffer.from(imageData.replace(base64Regex, ''), 'base64').length;

      const maxSize = 0.5 * 1024 * 1024 // 0.5MB
      if (imageSizeBytes > maxSize) {
        throw new Error('Image size exceeds the allowed limit')
      }

      return true
    }),
  updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router

