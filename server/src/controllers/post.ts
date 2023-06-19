import Post, { PostDocument } from '../models/post'
import { ObjectId } from 'mongoose'
import { LIMIT_CARDS_ON_PAGE } from '../constants'
import { Request, Response } from 'express'
import User from '../models/user'
import commentService from '../service/comment'


export const getCertainPost = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const post = await Post
      .findById(id)
      .populate('author', 'name imageUrl')

    if (!post) {
      return res.status(404).json({ message: 'Page not found!' })
    }

    res.status(200).json(post)
  } catch (e: any | unknown) {
    res.status(404).json({ message: e.message })
  }
}

export const getPosts = async (req: Request, res: Response) => {
  const { searchQuery, page, sortQuery } = req.query

  try {
    const search = new RegExp(searchQuery as string, 'i')
    const startIndex = (Number(page) - 1) * LIMIT_CARDS_ON_PAGE
    const sortOptions: { [key: number]: any } = {
      0: { _id: -1 },
      1: { title: 1 },
      2: { date: 1 },
      3: { likesCount: -1 },
    }

    const total = await Post.countDocuments().or([{ title: search }, { tags: search }, { description: search }])
    const posts = await Post.aggregate([
      { $addFields: { likesCount: { $size: '$likes' } } },
      { $match: { $or: [{ title: search }, { tags: search }, { description: search }] } },
      { $sort: sortOptions[Number(sortQuery)] },
      { $skip: startIndex },
      { $limit: LIMIT_CARDS_ON_PAGE },
      {
        $project: {
          img: 1,
          title: 1,
          description: 1,
          likesCount: 1,
        },
      },
    ])

    res.status(200).json({ posts, allPages: Math.ceil(total / LIMIT_CARDS_ON_PAGE) })
  } catch (e: any | unknown) {
    res.status(404).json({ message: e.message })
  }
}

export const createPosts = async (req: Request, res: Response) => {
  const post = req.body
  try {
    let user = await User.findById(req.userId)
    if (!user) {
      return res.status(401).json({ message: 'User does not exist in database', code: 4013 })
    }

    if (!user.isActivated) {
      return res.status(403).json({ message: 'Please ensure that your account is activated', code: 4031 })
    }
    const newPost = new Post({ ...post, author: req.userId, date: new Date().toISOString() })
    await newPost.save()

    res.status(201).json(newPost)
  } catch (e: any | unknown) {
    res.status(409).json({ message: e.message })
  }
}

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params
  const postData = req.body

  try {
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).send('No post with that id')
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).send('Forbidden')
    }

    await Post.findByIdAndUpdate(id, { ...postData, id }, { new: true })

    res.status(201).json({ message: 'Post is successfully updated' })
  } catch (e: any | unknown) {
    res.status(409).json({ message: e.message })
  }
}

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!req.userId) {
    return res.status(401).send('Unauthenticated')
  }

  try {
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).send('No post with that id')
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).send('Forbidden')
    }

    await commentService.deletePostComments(post.comments)

    await Post.findByIdAndRemove(id)

    res.json({ message: 'Post deleted successfully' })
  } catch (e: any | unknown) {
    res.status(409).json({ message: e.message })
  }
}

export const likePost = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!req.userId) {
    return res.status(401).send('Unauthenticated')
  }

  try {
    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).send('No post with that id')
    }

    const index = post.likes.findIndex(idx => idx.toString() === String(req.userId))
    if (index === -1) {
      post.likes.push(req.userId as unknown as ObjectId)
    } else {
      post.likes = post.likes.filter(idx => idx.toString() !== String(req.userId))
    }

    const updatedPost = await Post
      .findByIdAndUpdate(id, post, { new: true })
      .populate('author', 'name imageUrl')

    res.status(201).json(updatedPost)

  } catch (e: any | unknown) {
    res.status(409).json({ message: e.message })
  }
}

export const getPostsByTags = async (req: Request, res: Response) => {
  const { searchQuery } = req.query

  try {
    const relatedPosts = await Post
      .find({ tags: { $in: `${searchQuery}`.split(',') } })
      .limit(3)
      .populate('author', 'name')
      .select('date img title')
      .lean()

    let additionalPosts: Array<PostDocument> = []

    // If there are less than 3 related blog, fetch additional random blog
    if (relatedPosts.length < 3) {
      const randomPostsCount = 3 - relatedPosts.length
      additionalPosts = await Post
        .find({ _id: { $nin: relatedPosts.map(post => post._id) } })
        .limit(randomPostsCount)
        .populate('author', 'name')
        .select('date img title author')
        .lean()
    }

    const posts = [...relatedPosts, ...additionalPosts]
    res.status(200).json(posts)
  } catch (e: any | unknown) {
    res.status(404).send('Error fetching related blog')
  }
}