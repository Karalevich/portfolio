import { body } from 'express-validator'

export const emailValidator = body('email').isEmail().isLength({max: 128}).withMessage('Invalid email')
export const passwordValidator = body('password').isLength({ min: 8, max: 32 }).withMessage('Invalid length of the password')
export const nameValidator = body('name').isLength({ min: 3, max: 128 }).withMessage('Invalid length of the name')
export const imageUrlValidator = body('imageUrl').isURL().withMessage('Invalid imageUrl')
export const confirmPasswordValidator =  body('confirmPassword').custom((value, { req }) => {
  // Check if the confirmPassword matches the password
  if (value !== req.body.password) {
    throw new Error('Passwords do not match');
  }
  return true;
})
