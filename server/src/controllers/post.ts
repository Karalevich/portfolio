import Post from '../models/post'
import mongoose from 'mongoose'
import { LIMIT_CARDS_ON_PAGE } from '../constants'
import { Request, Response } from 'express'

export const getPosts = async (req: Request, res: Response) => {
  const { page } = req.query

  try {
    const startIndex = page ? (Number(page) - 1) * LIMIT_CARDS_ON_PAGE : 0
    const total = await Post.countDocuments({})
    const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT_CARDS_ON_PAGE).skip(startIndex)

    res.status(200).json({ posts, numberOfPages: Math.ceil(total / LIMIT_CARDS_ON_PAGE) })
  } catch (e: any | unknown) {
    res.status(404).json({ message: e.message })
  }
}

export const getCertainPost = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Page not found!' })
    }
    // TODO using author find info about creator and add to response, now it hardcode
    res.status(200).json({ ...post.toJSON(), authorName: 'Andrei Karlevich', authorImg: '' })
  } catch (e: any | unknown) {
    res.status(404).json({ message: e.message })
  }
}

export const getPostsBySearch = async (req: Request, res: Response) => {
  const { searchQuery, page } = req.query

  try {
    const search = new RegExp(searchQuery as string, 'i')
    const startIndex = (Number(page) - 1) * LIMIT_CARDS_ON_PAGE

    const total = await Post.countDocuments().or([{ title: search }, { tags: search }, { message: search }])
    const posts = await Post
      .find()
      .or([{ title: search }, { tags: search }, { message: search }])
      .sort({ _id: -1 })
      .limit(LIMIT_CARDS_ON_PAGE)
      .skip(startIndex)

    res.status(200).json({ posts, numberOfPages: Math.ceil(total / LIMIT_CARDS_ON_PAGE) })
  } catch (e: any | unknown) {
    res.status(404).json({ message: e.message })
  }
}

export const createPosts = async (req: Request, res: Response) => {
  const post = req.body
  const newPost = new Post({ ...post, author: req.userId, date: new Date().toISOString() })
  try {
    await newPost.save()

    res.status(201).json(newPost)
  } catch (e: any | unknown) {
    res.status(409).json({ message: e.message })
  }
}

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params
  const post = req.body

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    const updatePost = await Post.findByIdAndUpdate(id, { ...post, id }, { new: true })

    res.status(201).json(updatePost)
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send('No post with that id')
    } else {
      const post = await Post.findById(id)

      if (post && !post.author.equals(new mongoose.Types.ObjectId(`${req.userId}`))) {
        return res.status(403).send('Forbidden')
      }

      await Post.findByIdAndRemove(id)

      res.json({ message: 'Post deleted successfully' })
    }
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
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    const post = await Post.findById(id)

    if (post) {
      const index = post.likes.findIndex(idx => idx === String(req.userId))
      if (!index || index === -1) {
        post.likes.push(String(req.userId))
      } else {
        post.likes = post.likes.filter(idx => idx !== String(req.userId))
      }

      const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })

      res.status(201).json(updatedPost)
    }
  } catch (e: any | unknown) {
    res.status(409).json({ message: e.message })
  }
}

export const commentPost = async (req: Request, res: Response) => {
  const { id } = req.params
  const { value } = req.body

  try {
    const post = await Post.findById(id)
    if (post && post.comments) {
      post.comments.push(value)
      const updatePost = await Post.findByIdAndUpdate(id, post, { new: true })

      res.status(201).json(updatePost)
    } else {
      res.status(404).send('No post with that id')
    }
  } catch (e: any | unknown) {
    res.status(409).json({ message: e.message })
  }
}

export const getPostsByTags = async (req: Request, res: Response) => {
  const { searchQuery } = req.query

  try {
    let relatedPosts = await Post.find({ tags: { $in: `${searchQuery}`.split(',') } })
      .limit(3)
      .populate('author', 'name')
      .select('date img title')
      .lean();

    relatedPosts = relatedPosts.map(post => ({
      ...post,
      // @ts-ignore
      authorName: post.author.name,
    }))

    let additionalPosts = []

    // If there are less than 3 related posts, fetch additional random posts
    if (relatedPosts.length < 3) {
      const randomPostsCount = 3 - relatedPosts.length
      additionalPosts = await Post.aggregate([
        { $match: { _id: { $nin: [...relatedPosts.map(post => post._id)] } } },
        { $sample: { size: randomPostsCount } },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'authorData',
          },
        },
        {
          $project: {
            _id: 1,
            date: 1,
            img: 1,
            title: 1,
            authorName: { $arrayElemAt: ['$authorData.name', 0] },
          },
        },
      ])
    }

    const posts = [...relatedPosts, ...additionalPosts]
    res.status(200).json(posts)
  } catch (e: any | unknown) {
    res.status(404).send('Error fetching related posts')
  }
}