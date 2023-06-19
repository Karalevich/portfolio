import express from 'express'
import auth from '../middleware/auth'
import { addComment, getComments, deleteComment, updateComment, likeComment } from '../controllers/comment'

const router = express.Router()

router.get('/:id', getComments)
router.post('/:id/addComment', auth, addComment)
router.patch('/:id/updateComment', auth, updateComment)
router.patch('/:id/likeComment', auth, likeComment)
router.delete('/:id', auth, deleteComment)


export default router