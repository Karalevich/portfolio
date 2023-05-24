import * as api from '../api'
import { ActionT, ThunkT } from '../reducers/store'
import { PostsActionT } from '../reducers/posts/types'
import { PostT } from '../components/Home/Blog/types'
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


export const actionsPosts = {
  setPostsAC: (posts: Array<PostT>, numberOfPages: number) => ({
    type: FETCH_POSTS,
    payload: {
      posts,
      numberOfPages,
    },
  } as const),
  setFetchingPostsAC: (flag: boolean) => ({
    type: SET_FETCHING_POSTS,
    flag,
  } as const),
  setCertainPostAC: (post: PostT) => ({
    type: SET_POST,
    payload: {
      post
    }
  } as const),
  // setRelatedPostsAC: (posts: Array<PostsResponseDataI>) => ({
  //   type: SET_RELATED_POST,
  //   payload: {
  //     posts
  //   }
  // } as const),
  // createPostAC: (payload: PostsResponseDataI) => ({
  //   type: CREATE,
  //   payload
  // } as const),
  // updatePostAC: (payload: PostsResponseDataI) => ({
  //   type: UPDATE,
  //   payload
  // } as const),
  // updateCommentsAC: (payload: PostsResponseDataI) => ({
  //   type: COMMENTS,
  //   payload
  // } as const),
  // deletePostAC: (id: string) => ({
  //   type: DELETE,
  //   id
  // } as const),
  // changeOpenedPostIdAC: (payload: string | null) => ({
  //   type: CHANGE_OPENED_POST_ID,
  //   payload
  // } as const),
  // setFetchingFormAC: (flag: boolean) => ({
  //   type: SET_FETCHING_FORM,
  //   flag
  // } as const),
  // setFetchingRelatedPostsAC: (flag: boolean) => ({
  //   type: SET_FETCHING_RELATED_POSTS,
  //   flag
  // } as const)
}

export const getPostsThunk = (page?: number): ThunkT<PostsActionT> => async (dispatch) => {
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

export const getCertainPostThunk = (id?: string): ThunkT<PostsActionT> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingPostsAC(true))
    const { data } = await api.fetchCertainPost(id)
    dispatch(actionsPosts.setCertainPostAC(data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(actionsPosts.setFetchingPostsAC(false))
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
//
// export const getPostsByTagsThunk = (tags: string): ThunkType<PostsActionType> => async (dispatch) => {
//   try {
//     dispatch(actionsPosts.setFetchingRelatedPosts(true))
//     const { data } = await api.fetchPostsByTags(tags)
//     dispatch(actionsPosts.setRelatedPostsAC(data))
//   } catch (e) {
//     console.log(e)
//   } finally {
//     dispatch(actionsPosts.setFetchingRelatedPosts(false))
//   }
// }
//
// export const createPostThunk = (post: PostDataInterface): ThunkType<PostsActionType> => async (dispatch) => {
//   try {
//     dispatch(actionsPosts.setFetchingForm(true))
//     post.tags = updateTagsType(post.tags)
//     const { data } = await api.createPost(post)
//     dispatch(actionsPosts.createPostAC(data))
//   } catch (e) {
//     console.log(e)
//   } finally {
//     dispatch(actionsPosts.setFetchingForm(false))
//   }
// }
//
// export const updatePostThunk = (id: string, post: PostDataInterface): ThunkType<PostsActionType> => async (dispatch) => {
//   try {
//     dispatch(actionsPosts.setFetchingForm(true))
//     post.tags = updateTagsType(post.tags)
//     const { data } = await api.updatePost(id, post)
//     dispatch(actionsPosts.updatePostAC(data))
//   } catch (e) {
//     console.log(e)
//   } finally {
//     dispatch(actionsPosts.setFetchingForm(false))
//   }
// }
//
// export const deletePostThunk = (id: string): ThunkType<PostsActionType> => async (dispatch) => {
//   try {
//     //dispatch(actionsPosts.setFetchingForm(true))
//     await api.deletePost(id)
//     dispatch(actionsPosts.deletePostAC(id))
//   } catch (e) {
//     console.log(e)
//   } finally {
//     //dispatch(actionsPosts.setFetchingForm(false))
//   }
// }
//
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
