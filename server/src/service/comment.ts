import { CommentDocument } from '../models/comment'
import Comment from '../models/comment'
import { ObjectId, Schema } from 'mongoose'
import Post, { PostDocument } from '../models/post'
import User from '../models/user'
import ApiError from '../exceptions/api-error'
import { LIMIT_COMMENTS_ON_PAGE } from '../constants'

class CommentService {
  async deleteCommentAndChildren(comment: CommentDocument, post: PostDocument) {
    // Delete children recursively
    for (const childId of comment.children) {
      const childComment = await Comment.findById(childId)
      if (childComment) {
        await this.deleteCommentAndChildren(childComment, post)
      }
    }

    // Remove the comment from its parent's children array
    if (comment.parent) {
      const parentComment = await Comment.findById(comment.parent)
      if (parentComment) {
        parentComment.children = parentComment.children.filter(childId => childId.toString() !== comment._id.toString())
        await parentComment.save()
      }
    }

    // Remove the comment
    await Comment.findByIdAndRemove(comment._id)

    // Remove the comment ID from the post's comments array
    post.comments = post.comments.filter(commentId => commentId.toString() !== comment._id.toString())
  }

  async deletePostComments(comments: Array<Schema.Types.ObjectId>) {
    for (const commentId of comments) {
      await Comment.findByIdAndRemove(commentId)
    }
  }

  async addComment(userId: string, postId: string, parentId: string, message: string) {
    let user = await User.findById(userId)
    if (!user) {
      throw ApiError.UnauthorizedError('User does not exist in database', 4013)
    }

    if (!user.isActivated) {
      throw ApiError.Forbidden('Please ensure that your account is activated', 4031)
    }

    const post = await Post.findById(postId)
    if (!post) {
      throw ApiError.NotFound('No post with that id')
    }

    const newComment = new Comment({ message, post: postId, parent: parentId, author: userId })
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

    return newComment
  }

  async getComments(page: number, postId: string, sortQuery: number) {
    const startIndex = (page - 1) * LIMIT_COMMENTS_ON_PAGE
    const sortOptions: { [key: number]: any } = {
      0: { _id: -1 },
      1: { date: 1 },
      2: { likesCount: -1 },
    }

    const post = await Post.findById(postId)
      .populate({
        path: 'comments',
        options: { sort: sortOptions[sortQuery] },
        populate: { path: 'author', select: 'name imageUrl' },
      })
      .exec()
    if (!post) {
      throw ApiError.NotFound('No post with that id')
    }

    const comments = post.comments

    const commentsCount = comments.length
    const pagesCount = Math.ceil(commentsCount / LIMIT_COMMENTS_ON_PAGE)
    // const paginatedComments = comments.slice(startIndex, startIndex + LIMIT_COMMENTS_ON_PAGE)

    return { comments, commentsCount, pagesCount }
  }

  async deleteComment(userId: string, commentId: string) {
    if (!userId) {
      throw ApiError.UnauthorizedError('Unauthenticated')
    }

    const comment = await Comment.findById(commentId)

    if (!comment) {
      throw ApiError.NotFound('No post with that id')
    }

    if (comment.author.toString() !== userId) {
      throw ApiError.Forbidden('Forbidden')
    }

    const post = await Post.findById(comment.post)

    if (!post) {
      throw ApiError.NotFound('No post with that id')
    }

    // Delete the comment and its children recursively
    await this.deleteCommentAndChildren(comment, post)
    await post.save()

    return post.comments.length
  }

  async updateComment(userId: string, commentId: string, message: string) {
    let user = await User.findById(userId)

    if (!user) {
      throw ApiError.UnauthorizedError('User does not exist in database', 4013)
    }

    const comment = await Comment.findOne({ _id: commentId, author: userId })
    if (!comment) {
      throw ApiError.BadRequest('Action forbidden')
    }

    comment.message = message
    await comment.save()
    await comment.populate('author', 'name imageUrl')

    return comment
  }

  async likeComment(userId: string, commentId: string) {
    let user = await User.findById(userId)

    if (!user) {
      throw ApiError.UnauthorizedError('User does not exist in database', 4013)
    }

    const comment = await Comment.findById(commentId)

    if (!comment) {
      throw ApiError.NotFound('No post with that id')
    }

    const index = comment.likes.findIndex(idx => idx.toString() === userId)
    if (index === -1) {
      comment.likes.push(userId as unknown as ObjectId)
    } else {
      comment.likes = comment.likes.filter(idx => idx.toString() !== userId)
    }

    await comment.save()

    return index === -1 ? 'Like added' : 'Like removed'

  }

}

export default new CommentService()