import express from 'express'
import { signin, signup, googleSign, logOut, activate, refresh, resentActivateLink } from '../controllers/user'
import { body } from 'express-validator'

const router = express.Router()

router.post('/signin',
  body('email').isEmail().isLength({max: 128}).withMessage('Invalid email'),
  body('password').isLength({ min: 8, max: 32 }).withMessage('Invalid length of the password'),
  signin
)
router.post('/signup',
  body('email').isEmail().isLength({max: 128}).withMessage('Invalid email'),
  body('password').isLength({ min: 8, max: 32 }).withMessage('Invalid length of the password'),
  body('confirmPassword').custom((value, { req }) => {
    // Check if the confirmPassword matches the password
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }).withMessage('Passwords does not match'),
  body('name').isLength({ min: 3, max: 24 }).withMessage('Invalid length of the name'),
  signup)
router.post('/google', googleSign)
router.post('/logout', logOut)
router.get('/activate/:link', activate)
router.get('/refresh', refresh)
router.put('/resentActivationLink', resentActivateLink)
// router.post('/update', update)
// router.post('/image', updateUserImage)

export default router