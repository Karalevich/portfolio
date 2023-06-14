import { Request, Response } from 'express'
import mailService from '../service/mail'

export const sendMessageFromContactForm = async (req: Request, res: Response) => {
  try {
    const { email, name, message, subject } = req.body

    if (!email || !name || !message) {
      return res.status(404).json({ message: 'Empty required fields', code: 4043 })
    }

    await mailService.sendEmailFromContactForm(email, name, message, subject)
    return res.status(200).json({message: 'Email sent'})
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}






