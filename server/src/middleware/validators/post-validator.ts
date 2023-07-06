import { body } from 'express-validator'

export const titleValidator = body('title').isLength({ min: 3, max: 64 }).withMessage('Invalid title')
export const descriptionValidator = body('description').isLength({
  min: 90,
  max: 150,
}).withMessage('Invalid description')
export const tagsValidator = body('tags').isLength({ max: 48 }).withMessage('Invalid tags')
export const contentValidator = body('content').isLength({ max: 15000 }).withMessage('Invalid content')
export const imgValidator = body('img')
  .custom((value) => {
    if (!value) {
      throw new Error('Image is required')
    }

    const [imageData, metadata] = value.split('#metadata=')

    const base64Regex = /^data:image\/(jpeg|jpg|png|webp);base64,/
    if (!base64Regex.test(imageData)) {
      throw new Error('Only JPEG, JPG, WEBP and PNG images are allowed')
    }

    const imageSizeBytes = Buffer.from(imageData.replace(base64Regex, ''), 'base64').length

    const maxSize = 0.5 * 1024 * 1024 // 0.5MB
    if (imageSizeBytes > maxSize) {
      throw new Error('Image size exceeds the allowed limit')
    }

    return true
  })