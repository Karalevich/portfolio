import tokenService from '../service/token'
import { NextFunction, Request, Response } from 'express'

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req?.headers?.authorization
    const token = authorization && authorization.split(' ')[1]

    if (!token) {
      return res.status(498).json({ message: 'Invalid token' })
    }

    const decodeData = tokenService.validateAccessToken(token)
    if (!decodeData) {
      return res.status(498).json({ message: 'Invalid token' })
    }

    req.userId = decodeData.id

    next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

export default auth