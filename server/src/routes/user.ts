import express from 'express'
import { signin, signup, googleSign, logOut, activate, refresh, resentActivateLink } from '../controllers/user'
import auth from '../middleware/auth'
import {
  confirmPasswordValidator,
  emailValidator, imageUrlValidator,
  nameValidator,
  passwordValidator,
} from '../middleware/validators/user-validator'

const router = express.Router()

router.post('/signin',
  emailValidator,
  passwordValidator,
  signin
)
router.post('/signup',
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
  nameValidator,
  signup
)
router.post('/google',
  emailValidator,
  nameValidator,
  imageUrlValidator,
  googleSign
)
router.post('/logout', auth, logOut)
router.get('/activate/:link', activate)
router.get('/refresh', refresh)
router.put('/resentActivationLink', resentActivateLink)
// router.post('/update', update)
// router.post('/image', updateUserImage)

export default router