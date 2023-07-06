import { body } from 'express-validator'

export const messageValidator = body('message').isLength({max: 500}).escape().withMessage('Invalid message')
export const subjectValidator = body('subject').isLength({ max: 128 }).withMessage('Invalid length of the subject')
