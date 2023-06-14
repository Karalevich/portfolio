import express from 'express'
import { sendMessageFromContactForm } from '../controllers/side-service'


const router = express.Router()

router.post('/contactForm', sendMessageFromContactForm)


export default router