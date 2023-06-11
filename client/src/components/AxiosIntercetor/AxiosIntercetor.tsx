import { useEffect, useState } from 'react'
import { AxiosInterceptorComponent } from './types'
import { API } from '../../api'
import { AxiosError, AxiosResponse } from 'axios'
import { useAppDispatch } from '../../hooks/hooks'
import { removeUsedData, userActions } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'
import { actionsModal } from '../../actions/modalAction'
import { MODAL_TYPE } from '../../reducers/modal/types'

const AxiosInterceptor: AxiosInterceptorComponent = ({ children }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isSet, setIsSet] = useState(false)

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response
    }

    const errInterceptor = (error: AxiosError) => {
      if (error?.response?.data?.code) {    // check if there is provided specific error code
        switch (error.response.data.code) {
          case 4011:
          case 4012:
          case 5001:
            dispatch(userActions.setErrSignInMessageAC(error.response.data.message))
            break
          case 4001:
          case 4002:
          case 5002:
            dispatch(userActions.setErrSignUpMessageAC(error.response.data.message))
            break
          case 5003:
            dispatch(userActions.setErrSignInMessageAC(error.response.data.message))
            dispatch(userActions.setErrSignUpMessageAC(error.response.data.message))
            break
          default:
            return Promise.reject(error)
        }
      } else {
        switch (error?.response?.status) { //  if there is not provided specific error code look what error status
          case 404:
            navigate('/not-found')
            break
          case 498:
            dispatch(removeUsedData())
            break
          case 500:
            dispatch(actionsModal.openModalAC(MODAL_TYPE.ERROR))
            break
          default:
            return Promise.reject(error)
        }
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
