import { Request, Response } from 'express'
import User from '../models/user'
import Post from '../models/post'
import Comment from '../models/comment'
import { LIMIT_COMMENTS_ON_PAGE } from '../constants'
import commentService from '../service/comment'

export const addComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { message, parentId } = req.body

    let user = await User.findOne({ _id: req.userId })
    if (!user) {
      return res.status(401).json({ message: 'User does not exist in database', code: 4013 })
    }

    if (!user.isActivated) {
      return res.status(403).json({ message: 'Please ensure that your account is activated', code: 4031 })
    }

    if (!message) {
      return res.status(400).send('Message is required')
    }

    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).send('No post with that id')
    }

    const newComment = new Comment({ message, post: id, parent: parentId, author: req.userId })
    await newComment.save()
    await newComment.populate('author', 'name imageUrl')

    //store the new comment id in the post's comments array
    post.comments.unshift(newComment._id)
    await post.save()

    //store new comment id in parent array of child comments
    const parentComment = await Comment.findById(parentId)
    if (parentComment) {
      parentComment.children.push(newComment._id)
      await parentComment.save()
    }

    res.status(201).json(newComment)
  } catch (e: any | unknown) {
    res.status(500).json({ message: e.message })
  }
}

export const getComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { page = 1, sortQuery = 0 } = req.query
    const startIndex = (Number(page) - 1) * LIMIT_COMMENTS_ON_PAGE
    const sortOptions: { [key: number]: any } = {
      0: { _id: -1 },
      1: { date: 1 },
      2: { likesCount: -1 },
    }

    const post = await Post.findById(id)
      .populate({
        path: 'comments',
        options: { sort: sortOptions[Number(sortQuery)] },
        populate: { path: 'author', select: 'name imageUrl' },
      })
      .exec()
    if (!post) {
      return res.status(404).send('No post with that id')
    }

    const comments = post.comments

    const commentsCount = comments.length
    const pagesCount = Math.ceil(commentsCount / LIMIT_COMMENTS_ON_PAGE)
    const paginatedComments = comments.slice(startIndex, startIndex + LIMIT_COMMENTS_ON_PAGE)


    res.status(200).json({ comments: paginatedComments, commentsCount, pagesCount })
  } catch (e: any | unknown) {
    res.status(500).json({ message: e.message })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!req.userId) {
      return res.status(401).send('Unauthenticated')
    }

    const comment = await Comment.findById(id)

    if (!comment) {
      return res.status(404).send('No comment with that id')
    }

    if (comment.author.toString() !== req.userId) {
      return res.status(403).send('Forbidden')
    }

    const post = await Post.findById(comment.post)

    if (!post) {
      return res.status(404).send('No post with that id')
    }

    // Delete the comment and its children recursively
    await commentService.deleteCommentAndChildren(comment, post)
    await post.save()

    res.status(200).json({ message: 'Comment deleted successfully' })
  } catch (e: any | unknown) {
    res.status(500).json({ message: e.message })
  }
}