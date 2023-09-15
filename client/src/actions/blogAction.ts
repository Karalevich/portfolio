import * as api from '../api'
import { ThunkT } from '../reducers/store'
import { BlogActionT } from '../reducers/blog/types'
import { PostT } from '../components/Home/Blog/PostCard/types'
import {
  CREATE,
  DELETE,
  FETCH_POSTS,
  SET_FETCHING_POSTS,
  UPDATE,
  SET_CURRENT_PAGE,
  SET_SORT_VALUE,
  SET_SEARCH_VALUE,
  SET_FETCHING_PAGINATED_POSTS,
  ADD_POSTS,
} from '../reducers/blog/blogReducer'
import { NavigateFunction } from 'react-router-dom'
import { notistackActions } from './notistackAction'
import { NotistackActionT } from '../reducers/notistack/types'

export const blogActions = {
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
  createPostAC: (payload: PostT) =>
    ({
      type: CREATE,
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
}

export const deletePostThunk =
  (id: string, navigate: NavigateFunction): ThunkT<BlogActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      //dispatch(actionsPosts.setFetchingForm(true))
      await api.deletePost(id)
      dispatch(blogActions.deletePostAC(id))
      navigate('/blog')

      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Post successfully deleted!',
          options: {
            variant: 'success',
          },
        })
      )
    } catch (e) {
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Sorry, there was an error while deleting post',
          options: {
            variant: 'error',
          },
        })
      )
    } finally {
      //dispatch(actionsPosts.setFetchingForm(false))
    }
  }

export const getPostsThunk =
  (searchQuery: string, sortQuery: number, page: number): ThunkT<BlogActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      dispatch(blogActions.setFetchingPostsAC(true))
      const { data } = await api.fetchPosts(searchQuery, sortQuery, page)
      dispatch(blogActions.setPostsAC(data.posts, data.allPages))
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
      dispatch(blogActions.setFetchingPostsAC(false))
    }
  }

export const getPaginatedPostsThunk =
  (searchQuery: string, sortQuery: number, page: number): ThunkT<BlogActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      dispatch(blogActions.setFetchingPaginatedPostsAC(true))
      const { data } = await api.fetchPosts(searchQuery, sortQuery, page)
      dispatch(blogActions.addPostsAC(data.posts, data.allPages))
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
      dispatch(blogActions.setFetchingPaginatedPostsAC(false))
    }
  }
