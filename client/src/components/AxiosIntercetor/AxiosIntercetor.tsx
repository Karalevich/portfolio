import { useEffect, useState } from 'react'
import { AxiosInterceptorComponent } from './types'
import { API } from '../../api'
import { AxiosError, AxiosResponse } from 'axios'
import { useAppDispatch } from '../../hooks/hooks'
import { removeUsedData, userActions } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'

const AxiosInterceptor: AxiosInterceptorComponent = ({ children }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isSet, setIsSet] = useState(false)

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response
    }

    const errInterceptor = (error: AxiosError) => {
      switch (error?.response?.status) {
        case 401:
          dispatch(userActions.setErrSignInMessageAC(error?.response?.data?.message))
          break
        case 400:
          dispatch(userActions.setErrSignUpMessageAC(error?.response?.data?.message))
          break
        case 404:
          navigate('/not-found')
          break
        case 498:
          dispatch(removeUsedData())
          break
        default:
          return Promise.reject(error)
      }

      return Promise.reject(error)
    }

    const interceptor = API.interceptors.response.use(resInterceptor, errInterceptor)
    setIsSet(true)
    return () => API.interceptors.response.eject(interceptor)
  }, [])

  return isSet && children
}

export default AxiosInterceptor
