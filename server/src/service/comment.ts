import { CommentDocument } from '../models/comment'
import Comment from '../models/comment'
import { Schema } from 'mongoose'
import { PostDocument } from '../models/post'


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

  async deletePostComments(comments: Array<Schema.Types.ObjectId>){

    for(const commentId of comments){
      await Comment.findByIdAndRemove(commentId)
    }

  }

}

export default new CommentService()