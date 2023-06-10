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
  SET_FETCHING_CERTAIN_POST,
  SET_CURRENT_PAGE,
  SET_SORT_VALUE,
  SET_SEARCH_VALUE,
  SET_FETCHING_PAGINATED_POSTS,
  ADD_POSTS,
} from '../reducers/posts/postsReducer'
import { updateTagsType } from '../utils/updateTagsType'
import { PostFromFormWithArrayImgT } from '../components/Home/Blog/AddPost/types'
import { NavigateFunction } from 'react-router-dom'
import { convertFileBeforeSendToServer } from '../utils/convertFileBeforeSendToServer'

export const actionsPosts = {
  setPostsAC: (posts: Array<PostT>, allPages: number) =>
    ({
      type: FETCH_POSTS,
      payload: {
        posts,
        allPages,
      },
    } as const),
  setFetchingPostsAC: (flag: boolean) =>
    ({
      type: SET_FETCHING_POSTS,
      flag,
    } as const),
  setCertainPostAC: (post: CertainPostT | null) =>
    ({
      type: SET_POST,
      payload: {
        post,
      },
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
  setCurrentPageAC: (page: number) =>
    ({
      type: SET_CURRENT_PAGE,
      page,
    } as const),
  setSortValueAC: (sortValue: number) =>
    ({
      type: SET_SORT_VALUE,
      sortValue,
    } as const),
  setSearchValueAC: (searchValue: string) =>
    ({
      type: SET_SEARCH_VALUE,
      searchValue,
    } as const),
  setFetchingPaginatedPostsAC: (flag: boolean) =>
    ({
      type: SET_FETCHING_PAGINATED_POSTS,
      flag,
    } as const),
  addPostsAC: (posts: Array<PostT>, allPages: number) =>
    ({
      type: ADD_POSTS,
      payload: {
        posts,
        allPages,
      },
    } as const),
  // updateCommentsAC: (payload: PostsResponseDataI) => ({
  //   type: COMMENTS,
  //   payload
  // } as const),
}

export const getCertainPostThunk =
  (id: string): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      dispatch(actionsPosts.setFetchingCertainPostAC(true))
      const { data } = await api.fetchCertainPost(id)
      await dispatch(getPostsByTagsThunk(data.tags.join()))
      dispatch(actionsPosts.setCertainPostAC(data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(actionsPosts.setFetchingCertainPostAC(false))
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
  (post: PostFromFormWithArrayImgT, navigate: NavigateFunction): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      dispatch(actionsPosts.setFetchingFormAC(true))
      post.tags = updateTagsType(post.tags)
      const readyImg = await convertFileBeforeSendToServer(post.img[0])

      const { data } = await api.createPost({ ...post, img: readyImg })
      dispatch(actionsPosts.createPostAC(data))

      navigate('/blog')
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(actionsPosts.setFetchingFormAC(false))
    }
  }
export const updatePostThunk =
  (id: string, post: PostFromFormWithArrayImgT, navigate: NavigateFunction): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      dispatch(actionsPosts.setFetchingFormAC(true))
      post.tags = updateTagsType(post.tags)
      const readyImg = await convertFileBeforeSendToServer(post.img[0])

      await api.updatePost(id, { ...post, img: readyImg })

      dispatch(actionsPosts.changeOpenedPostIdAC(''))
      dispatch(actionsPosts.setCertainPostAC(null))

      navigate('/blog')
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

export const getPostsThunk =
  (searchQuery: string, sortQuery: number, page: number): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      dispatch(actionsPosts.setFetchingPostsAC(true))
      const { data } = await api.fetchPosts(searchQuery, sortQuery, page)
      dispatch(actionsPosts.setPostsAC(data.posts, data.allPages))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(actionsPosts.setFetchingPostsAC(false))
    }
  }

export const getPaginatedPostsThunk =
  (searchQuery: string, sortQuery: number, page: number): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      dispatch(actionsPosts.setFetchingPaginatedPostsAC(true))
      const { data } = await api.fetchPosts(searchQuery, sortQuery, page)
      dispatch(actionsPosts.addPostsAC(data.posts, data.allPages))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(actionsPosts.setFetchingPaginatedPostsAC(false))
    }
  }

export const likePostThunk =
  (id: string): ThunkT<PostsActionT> =>
  async (dispatch) => {
    try {
      const { data } = await api.likePost(id)
      dispatch(actionsPosts.setCertainPostAC(data))
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

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
