import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const minLengthGoogleToken = 500

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req?.headers?.authorization
    const token = authorization && authorization.split(' ')[1]

    if (token) {
      const isCustomAuth = token.length < minLengthGoogleToken

      let decodeData

      if (isCustomAuth) {
        decodeData = jwt.verify(token, process.env.SECRET as string) as JwtPayload
        req.userId = decodeData?.id
      } else {
        decodeData = jwt.decode(token)
        req.userId = decodeData?.sub
      }
    }
    next()
  } catch (e) {
    console.log(e)
  }
}

export default auth