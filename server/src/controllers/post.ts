import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import postService from '../service/post'


export const getCertainPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postService.getPost(req.params.id)

    res.status(200).json(post)
  } catch (e) {
    next(e)
  }
}

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchQuery = '', page = 1, sortQuery = 0 } = req.query

    const { posts, allPages } = await postService.getPosts(String(searchQuery), Number(page), Number(sortQuery))

    res.status(200).json({ posts, allPages })
  } catch (e: any | unknown) {
    next(e)
  }
}

export const createPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    const newPost = await postService.createPosts(req.userId as string, req.body)

    res.status(201).json(newPost)
  } catch (e) {
    next(e)
  }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    await postService.updatePost(req.params.id, req.userId as string, req.body)

    res.status(201).json({ message: 'Post is successfully updated' })
  } catch (e) {
    next(e)
  }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await postService.deletePost(req.params.id, req.userId as string)

    res.status(204).json({ message: 'Post deleted successfully' })
  } catch (e) {
    next(e)
  }
}

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedPost = await postService.likePost(req.params.id, req.userId as string)

    res.status(201).json(updatedPost)
  } catch (e) {
    next(e)
  }
}

export const getPostsByTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postService.getPostsByTags(`${req.query.searchQuery}`)

    res.status(200).json(posts)
  } catch (e) {
    next(e)
  }
}