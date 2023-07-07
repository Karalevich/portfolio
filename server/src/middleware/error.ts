import ApiError from '../exceptions/api-error'
import { NextFunction, Request, Response } from 'express'

type ResponseType = {
  message: string
  code?: number
};

export default function(err: ApiError | Error, req: Request, res: Response, next: NextFunction) {
  console.log(err)
  if (err instanceof ApiError) {
    const response: ResponseType = {
      message: err.message,
    }
    if (err.code) {
      response.code = err.code
    }
    return res.status(err.status).json(response)
  }
  return res.status(500).json({ message: 'Something went wrong' })

};