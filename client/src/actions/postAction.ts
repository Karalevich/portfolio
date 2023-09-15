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
import { CertainPostT } from '../components/Home/Blog/PostCard/types'
import { notistackActions } from './notistackAction'
import { NotistackActionT } from '../reducers/notistack/types'
import { RecommendCardT } from '../components/Home/Blog/RecommendCard/types'

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
  (id: string): ThunkT<PostActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      dispatch(postActions.setFetchingCertainPostAC(true))
      const { data } = await api.fetchCertainPost(id)
      await dispatch(getPostsByTagsThunk(data.tags.join()))
      dispatch(postActions.setCertainPostAC(data))
    } catch (e) {
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Sorry, there was an error while fetching post',
          options: {
            variant: 'error',
          },
        })
      )
    } finally {
      dispatch(postActions.setFetchingCertainPostAC(false))
    }
  }

export const getPostsByTagsThunk =
  (tags: string): ThunkT<PostActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      dispatch(postActions.setFetchingRelatedPostsAC(true))
      const { data } = await api.fetchPostsByTags(tags)
      dispatch(postActions.setRelatedPostsAC(data))
    } catch (e) {
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Sorry, there was an error while fetching posts',
          options: {
            variant: 'error',
          },
        })
      )
    } finally {
      dispatch(postActions.setFetchingRelatedPostsAC(false))
    }
  }
export const createPostThunk =
  (
    post: PostFromFormWithArrayImgT,
    navigate: NavigateFunction
  ): ThunkT<PostActionT | BlogActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      dispatch(postActions.setFetchingFormAC(true))
      post.tags = updateTagsType(post.tags)
      const readyImg = await convertFileBeforeSendToServer(post.img[0])

      const { data } = await api.createPost({ ...post, img: readyImg })
      dispatch(blogActions.createPostAC(data))

      navigate('/blog')

      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Post successfully created!',
          options: {
            variant: 'success',
          },
        })
      )
    } catch (e) {
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Sorry, there was an error while creating post',
          options: {
            variant: 'error',
          },
        })
      )
    } finally {
      dispatch(postActions.setFetchingFormAC(false))
    }
  }
export const updatePostThunk =
  (
    id: string,
    post: PostFromFormWithArrayImgT,
    navigate: NavigateFunction
  ): ThunkT<PostActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      dispatch(postActions.setFetchingFormAC(true))
      post.tags = updateTagsType(post.tags)
      const readyImg = await convertFileBeforeSendToServer(post.img[0])

      await api.updatePost(id, { ...post, img: readyImg })

      dispatch(postActions.resetPostAC())

      navigate('/blog')

      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Post successfully updated!',
          options: {
            variant: 'success',
          },
        })
      )
    } catch (e) {
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Sorry, there was an error while updating post',
          options: {
            variant: 'error',
          },
        })
      )
    } finally {
      dispatch(postActions.setFetchingFormAC(false))
    }
  }

export const likePostThunk =
  (id: string): ThunkT<PostActionT | NotistackActionT> =>
  async (dispatch, getState) => {
    try {
      const { data } = await api.likePost(id)
      dispatch(postActions.setCertainPostAC(data))
    } catch (e) {
      const user = getState().user?.user
      user && dispatch(postActions.setLikestAC(user.id))
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Sorry, there was an error while liking',
          options: {
            variant: 'error',
          },
        })
      )
    }
  }
