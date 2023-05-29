import * as api from '../api'
import { ThunkT } from '../reducers/store'
import { PostsActionT } from '../reducers/posts/types'
import { CertainPostT, PostT, RecommendCardT } from '../components/Home/Blog/PostCard/types'
import {
  CHANGE_OPENED_POST_ID,
  COMMENTS,
  CREATE,
  DELETE,
  FETCH_POSTS,
  SET_FETCHING_FORM,
  SET_FETCHING_POSTS,
  SET_FETCHING_RELATED_POSTS,
  SET_POST,
  SET_RELATED_POST,
  UPDATE,
} from '../reducers/posts/postsReducer'
import { updateTagsType } from '../utils/updateTagsType'
import { PostFromFormWithArrayImgT } from '../components/Home/Blog/AddPost/types'
import { NavigateFunction } from 'react-router-dom'
import { convertFileBeforeSendToServer } from '../utils/convertFileBeforeSendToServer'

export const actionsPosts = {
  setPostsAC: (posts: Array<PostT>, numberOfPages: number) =>
    ({
      type: FETCH_POSTS,
      payload: {
        posts,
        numberOfPages,
      },
    } as const),
  setFetchingPostsAC: (flag: boolean) =>
    ({
      type: SET_FETCHING_POSTS,
      flag,
    } as const),
  setCertainPostAC: (post: CertainPostT) =>
    ({
      type: SET_POST,
      payload: {
        post,
      },
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
  createPostAC: (payload: PostT) =>
    ({
      type: CREATE,
      payload,
    } as const),
  setFetchingFormAC: (flag: boolean) =>
    ({
      type: SET_FETCHING_FORM,
      flag,
    } as const),
  changeOpenedPostIdAC: (payload: string) =>
    ({
      type: CHANGE_OPENED_POST_ID,
      payload,
    } as const),
  updatePostAC: (payload: PostT) =>
    ({
      type: UPDATE,
      payload,
    } as const),
  deletePostAC: (id: string) =>
    ({
      type: DELETE,
      id,
    } as const),
  // updateCommentsAC: (payload: PostsResponseDataI) => ({
  //   type: COMMENTS,
  //   payload
  // } as const),
}

export const getPostsThunk =
  (page?: number): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      dispatch(actionsPosts.setFetchingPostsAC(true))
      const { data } = await api.fetchPosts(page)
      dispatch(actionsPosts.setPostsAC(data.posts, data.numberOfPages))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(actionsPosts.setFetchingPostsAC(false))
    }
  }

export const getCertainPostThunk =
  (id: string, navigate: NavigateFunction): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      dispatch(actionsPosts.setFetchingPostsAC(true))
      const { data } = await api.fetchCertainPost(id)
      dispatch(actionsPosts.setCertainPostAC(data))
    } catch (e) {
      console.log(e)
      navigate('/not-found')
    } finally {
      dispatch(actionsPosts.setFetchingPostsAC(false))
    }
  }

export const getPostsByTagsThunk =
  (tags: string): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      dispatch(actionsPosts.setFetchingRelatedPostsAC(true))
      const { data } = await api.fetchPostsByTags(tags)
      dispatch(actionsPosts.setRelatedPostsAC(data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(actionsPosts.setFetchingRelatedPostsAC(false))
    }
  }
export const createPostThunk =
  (post: PostFromFormWithArrayImgT): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      dispatch(actionsPosts.setFetchingFormAC(true))
      post.tags = updateTagsType(post.tags)
      const readyImg = await convertFileBeforeSendToServer(post.img[0])

      const { data } = await api.createPost({ ...post, img: readyImg })
      dispatch(actionsPosts.createPostAC(data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(actionsPosts.setFetchingFormAC(false))
    }
  }
export const updatePostThunk =
  (id: string, post: PostFromFormWithArrayImgT): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      dispatch(actionsPosts.setFetchingFormAC(true))
      post.tags = updateTagsType(post.tags)
      const readyImg = await convertFileBeforeSendToServer(post.img[0])
      const { data } = await api.updatePost(id, { ...post, img: readyImg })
      dispatch(actionsPosts.updatePostAC(data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(actionsPosts.setFetchingFormAC(false))
    }
  }

export const deletePostThunk =
  (id: string, navigate: NavigateFunction): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      //dispatch(actionsPosts.setFetchingForm(true))
      await api.deletePost(id)
      dispatch(actionsPosts.deletePostAC(id))
      navigate('/blog')
    } catch (e) {
      console.log(e)
    } finally {
      //dispatch(actionsPosts.setFetchingForm(false))
    }
  }

// export const getPostsBySearchThunk = (searchQuery: string, page: number): ThunkType<PostsActionType> => async (dispatch) => {
//   try {
//     dispatch(actionsPosts.setFetchingPosts(true))
//     const { data } = await api.fetchPostsBySearch(searchQuery, page)
//     dispatch(actionsPosts.setPostsAC(data.posts, data.numberOfPages))
//   } catch (e) {
//     console.log(e)
//   } finally {
//     dispatch(actionsPosts.setFetchingPosts(false))
//   }
// }

// export const likePostThunk = (id: string): ThunkType<PostsActionType> => async (dispatch) => {
//   try {
//     //dispatch(actionsPosts.setFetchingForm(true))
//     const { data } = await api.likePost(id)
//     dispatch(actionsPosts.updatePostAC(data))
//   } catch (e) {
//     console.log(e)
//   } finally {
//     //dispatch(actionsPosts.setFetchingForm(false))
//   }
// }
//
// export const commentPostThunk = (value: string, id: string | undefined): ThunkType<PostsActionType> => async (dispatch) => {
//   try {
//     //dispatch(actionsPosts.setFetchingForm(true))
//     const { data } = await api.comment(value, id)
//     dispatch(actionsPosts.updateCommentsAC(data))
//   } catch (e) {
//     console.log(e)
//   } finally {
//     //dispatch(actionsPosts.setFetchingForm(false))
//   }
// }
