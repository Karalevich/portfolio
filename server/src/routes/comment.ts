import express from 'express'
import auth from '../middleware/auth'
import { addComment, getComments, deleteComment } from '../controllers/comment'


const router = express.Router()

router.get('/:id', getComments)
router.post('/:id/addComment', auth, addComment)
router.delete('/:id', auth, deleteComment)


export default router