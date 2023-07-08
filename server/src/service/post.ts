import Post, { PostDocument, PostI } from '../models/post'
import ApiError from '../exceptions/api-error'
import { LIMIT_CARDS_ON_PAGE } from '../constants'
import User from '../models/user'
import commentService from './comment'
import { ObjectId } from 'mongoose'

class PostService {
  async getPost(id: string) {
    const post = await Post
      .findById(id)
      .populate('author', 'name imageUrl')

    if (!post) {
      throw ApiError.NotFound('Page not found!')
    }

    return post
  }

  async getPosts(searchQuery: string, page: number, sortQuery: number) {
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

    return { posts, allPages: Math.ceil(total / LIMIT_CARDS_ON_PAGE) }
  }

  async createPosts(userId: string, post: Pick<PostI, 'title' | 'description' | 'content' | 'tags' | 'img'>) {
    let user = await User.findById(userId)
    if (!user) {
      throw ApiError.UnauthorizedError('User does not exist in database', 4013)
    }

    if (!user.isActivated) {
      throw ApiError.Forbidden('Please ensure that your account is activated', 4031)
    }

    const newPost = new Post({ ...post, author: userId, date: new Date().toISOString() })
    await newPost.save()

    return newPost
  }

  async updatePost(postId: string, userId: string, postData: Pick<PostI, 'title' | 'description' | 'content' | 'tags' | 'img'>) {
    const post = await Post.findById(postId)
    if (!post) {
      throw ApiError.NotFound('No post with that id')
    }

    if (post.author.toString() !== userId) {
      throw ApiError.Forbidden('Forbidden')
    }

    await Post.findByIdAndUpdate(postId, postData, { new: true })
  }

  async deletePost(postId: string, userId: string) {
    if (!userId) {
      throw ApiError.UnauthorizedError('Unauthenticated')
    }
    const post = await Post.findById(postId)
    if (!post) {
      throw ApiError.NotFound('No post with that id')
    }

    if (post.author.toString() !== userId) {
      throw ApiError.Forbidden('Forbidden')
    }

    await commentService.deletePostComments(post.comments)

    await Post.findByIdAndRemove(postId)
  }

  async likePost(postId: string, userId: string) {
    if (!userId) {
      throw ApiError.UnauthorizedError('Unauthenticated')
    }
    const post = await Post.findById(postId)

    if (!post) {
      throw ApiError.NotFound('No post with that id')
    }

    const index = post.likes.findIndex(idx => idx.toString() === userId)
    if (index === -1) {
      post.likes.push(userId as unknown as ObjectId)
    } else {
      post.likes = post.likes.filter(idx => idx.toString() !== userId)
    }

    return Post
      .findByIdAndUpdate(postId, post, { new: true })
      .populate('author', 'name imageUrl')
  }

  async getPostsByTags(searchQuery: string) {
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

    return [...relatedPosts, ...additionalPosts]
  }
}

export default new PostService()