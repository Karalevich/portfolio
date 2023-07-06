import { body } from 'express-validator'

export const messageValidator = body('message').trim().isLength({ min: 1, max: 500 }).withMessage('Invalid message')
export const parentIdValidator = body('parentId').optional().isMongoId().withMessage('Invalid parentId')
