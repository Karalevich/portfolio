import express from 'express'
import { signin, signup, googleSign, logOut, activate, refresh, resentActivateLink } from '../controllers/user'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/google', googleSign)
router.post('/logout', logOut)
router.get('/activate/:link', activate)
router.get('/refresh', refresh)
router.put('/resentActivationLink', resentActivateLink)
// router.post('/update', update)
// router.post('/image', updateUserImage)

export default router