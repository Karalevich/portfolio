import { Request, Response } from 'express'
import mailService from '../service/mail'
import { validationResult } from 'express-validator'

export const sendMessageFromContactForm = async (req: Request, res: Response) => {
  try {
    const { email, name, message, subject } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    await mailService.sendEmailFromContactForm(email, name, message, subject)
    return res.status(200).json({ message: 'Email sent' })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}






