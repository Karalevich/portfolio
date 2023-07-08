import { NextFunction, Request, Response } from 'express'
import commentService from '../service/comment'
import { validationResult } from 'express-validator'

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, parentId } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    const newComment = await commentService.addComment(req.userId as string, req.params.id, parentId, message)

    res.status(201).json(newComment)
  } catch (e) {
    next(e)
  }
}

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, sortQuery = 0 } = req.query

    const {
      comments,
      commentsCount,
      pagesCount,
    } = await commentService.getComments(Number(page), req.params.id, Number(sortQuery))

    res.status(200).json({ comments, commentsCount, pagesCount })
  } catch (e) {
    next(e)
  }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentsCount = await commentService.deleteComment(req.userId as string, req.params.id)

    res.status(204).json({ message: 'Comment deleted successfully', commentsCount })
  } catch (e) {
    next(e)
  }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    const comment = await commentService.updateComment(req.userId as string, req.params.id, message)

    res.status(201).json(comment)
  } catch (e) {
    next(e)
  }
}

export const likeComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await commentService.likeComment(req.userId as string, req.params.id)

    res.status(201).json({ message })
  } catch (e) {
    next(e)
  }
}
