import express from 'express'
import { sendMessageFromContactForm } from '../controllers/side-service'
import { emailValidator, nameValidator } from '../middleware/validators/user-validator'
import { messageValidator, subjectValidator } from '../middleware/validators/side-service-validator'


const router = express.Router()

router.post('/contactForm',
  nameValidator,
  emailValidator,
  messageValidator,
  subjectValidator,
  sendMessageFromContactForm)


export default router