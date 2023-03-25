import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_URl })

API.interceptors.request.use((req) => {
  const authData = localStorage.getItem('')
  const headers = req.headers
  if (authData && headers) {
    headers.Authorization = `Bearer ${JSON.parse(authData).token}`
    headers['Access-Control-Allow-Origin'] = `*`
  }

  return req
})

export const fetchPosts = (page: number) => API.get(`/posts?page=${page}`)
export const signIn = (formData: string) => API.post('/user/signin', formData)
