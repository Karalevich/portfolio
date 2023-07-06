import express from 'express'
import auth from '../middleware/auth'
import { addComment, getComments, deleteComment, updateComment, likeComment } from '../controllers/comment'
import { messageValidator, parentIdValidator } from '../middleware/validators/comment-validator'

const router = express.Router()

router.get('/:id', getComments)
router.post('/:id/addComment', auth, messageValidator, parentIdValidator, addComment)
router.patch('/:id/updateComment', auth, messageValidator, updateComment)
router.patch('/:id/likeComment', auth, likeComment)
router.delete('/:id', auth, deleteComment)


export default router