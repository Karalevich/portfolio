import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req?.headers?.authorization
    const token = authorization && authorization.split(' ')[1]

    if (token) {
      const decodeData = jwt.verify(token, process.env.SECRET as string) as JwtPayload
      req.userId = decodeData?.id
    }
    next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Server error' })
  }
}

export default auth