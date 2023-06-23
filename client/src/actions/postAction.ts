import {
  RESET_POST_STATE,
  SET_FETCHING_CERTAIN_POST,
  SET_FETCHING_FORM,
  SET_FETCHING_RELATED_POSTS,
  SET_LIKE,
  SET_POST,
  SET_RELATED_POST,
} from 'src/reducers/post/postReducer'
import * as api from '../api'
import { ThunkT } from '../reducers/store'
import { PostActionT } from '../reducers/post/types'
import { NavigateFunction } from 'react-router-dom'
import { PostFromFormWithArrayImgT } from '../components/Home/Blog/AddPost/types'
import { updateTagsType } from '../utils/updateTagsType'
import { convertFileBeforeSendToServer } from '../utils/convertFileBeforeSendToServer'
import { blogActions } from './blogAction'
import { BlogActionT } from '../reducers/blog/types'
import { CertainPostT, RecommendCardT } from '../components/Home/Blog/PostCard/types'
import { notistackActions } from './notistackAction'
import { NotistackActionT } from '../reducers/notistack/types'

export const postActions = {
  setCertainPostAC: (post: CertainPostT) =>
    ({
      type: SET_POST,
      payload: {
        post,
      },
    } as const),
  resetPostAC: () =>
    ({
      type: RESET_POST_STATE,
    } as const),
  setLikestAC: (userId: string) =>
    ({
      type: SET_LIKE,
      userId,
    } as const),
  setFetchingCertainPostAC: (flag: boolean) =>
    ({
      type: SET_FETCHING_CERTAIN_POST,
      flag,
    } as const),
  setRelatedPostsAC: (posts: Array<RecommendCardT>) =>
    ({
      type: SET_RELATED_POST,
      payload: {
        posts,
      },
    } as const),
  setFetchingRelatedPostsAC: (flag: boolean) =>
    ({
      type: SET_FETCHING_RELATED_POSTS,
      flag,
    } as const),

  setFetchingFormAC: (flag: boolean) =>
    ({
      type: SET_FETCHING_FORM,
      flag,
    } as const),
}

export const getCertainPostThunk =
  (id: string): ThunkT<PostActionT> =>
  async (dispatch) => {
    try {
      dispatch(postActions.setFetchingCertainPostAC(true))
      const { data } = await api.fetchCertainPost(id)
      await dispatch(getPostsByTagsThunk(data.tags.join()))
      dispatch(postActions.setCertainPostAC(data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(postActions.setFetchingCertainPostAC(false))
    }
  }

export const getPostsByTagsThunk =
  (tags: string): ThunkT<PostActionT> =>
  async (dispatch) => {
    try {
      dispatch(postActions.setFetchingRelatedPostsAC(true))
      const { data } = await api.fetchPostsByTags(tags)
      dispatch(postActions.setRelatedPostsAC(data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(postActions.setFetchingRelatedPostsAC(false))
    }
  }
export const createPostThunk =
  (post: PostFromFormWithArrayImgT, navigate: NavigateFunction): ThunkT<PostActionT | BlogActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      dispatch(postActions.setFetchingFormAC(true))
      post.tags = updateTagsType(post.tags)
      const readyImg = await convertFileBeforeSendToServer(post.img[0])

      const { data } = await api.createPost({ ...post, img: readyImg })
      dispatch(blogActions.createPostAC(data))

      navigate('/blog')
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(postActions.setFetchingFormAC(false))
      dispatch(notistackActions.enqueueSnackbarAC(
        {
          message: 'Post successfully created!',
          options: {
            variant: 'success',
          }
        }
      ))
    }
  }
export const updatePostThunk =
  (id: string, post: PostFromFormWithArrayImgT, navigate: NavigateFunction): ThunkT<PostActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      dispatch(postActions.setFetchingFormAC(true))
      post.tags = updateTagsType(post.tags)
      const readyImg = await convertFileBeforeSendToServer(post.img[0])

      await api.updatePost(id, { ...post, img: readyImg })

      dispatch(postActions.resetPostAC())

      navigate('/blog')
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(postActions.setFetchingFormAC(false))
      dispatch(notistackActions.enqueueSnackbarAC(
        {
          message: 'Post successfully updated!',
          options: {
            variant: 'success',
          }
        }
      ))
    }
  }

export const likePostThunk =
  (id: string): ThunkT<PostActionT> =>
  async (dispatch) => {
    try {
      const { data } = await api.likePost(id)
      dispatch(postActions.setCertainPostAC(data))
    } catch (e) {
      console.log(e)
    }
  }
