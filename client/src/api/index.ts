import axios from 'axios'
import { PostFromFormT } from '../components/Home/Blog/AddPost/types'
import { CreateUserT, UserT } from '../reducers/user/types'
import { USER } from '../constants/user'

export const API = axios.create({ withCredentials: true, baseURL: process.env.REACT_APP_API_URl })

API.interceptors.request.use((req) => {
  const authData = localStorage.getItem(USER)
  const headers = req.headers
  if (authData && headers) {
    headers.Authorization = `Bearer ${JSON.parse(authData).token}`
  }

  return req
})

// POST API
export const fetchCertainPost = (id: string) => API.get(`/posts/${id}`)
export const fetchPostsByTags = (tags: string) => API.get(`/posts/tags?searchQuery=${tags}`)
export const createPost = (newPost: PostFromFormT) => API.post('/posts', newPost)
export const updatePost = (id: string, updatePost: PostFromFormT) =>
  API.patch(`/posts/${id}`, updatePost)
export const deletePost = (id: string) => API.delete(`/posts/${id}`)
export const fetchPosts = (searchQuery: string, sortQuery: number, page: number) =>
  API.get(`/posts?page=${page}&searchQuery=${searchQuery}&sortQuery=${sortQuery}`)
export const likePost = (id: string) => API.patch(`/posts/${id}/likePost`)
// export const comment = (value: string, id: string | undefined) => API.post(`/posts/${id}/commentPost`, { value })


// USER API
export const googleSign = (formData: UserT) => API.post('/user/google', formData)
export const getGoogleUserData = (token: string) =>
  axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
export const signUn = (formData: CreateUserT) => API.post('/user/signup', formData)
export const signIn = (formData: Omit<CreateUserT, 'confirmPassword' | 'name'>) =>
  API.post('/user/signin', formData)
export const logOut = () => API.post('/user/logout')
export const resentActivationLink = (email: string) => API.put(`/user/resentActivationLink`, {email})
// export const updateUserData = (formData: UserType) => API.post('/user/update', formData)
// export const updateUserImage = (data: { newUserImage: string, email?: string }) => API.post('/user/image', data)


export const refresh = () => axios.get(`${process.env.REACT_APP_API_URl}/user/refresh`, { withCredentials: true })