import { ActionT, ThunkT } from '../reducers/store'
import * as api from '../api'
import { LOGOUT, SET_USER } from '../reducers/user/userReducer'
import { NavigateFunction } from 'react-router-dom'
import { GoogleUserT, UserActionsT, UserT } from 'src/reducers/user/types'
import { USER } from '../constants/user'
import { CredentialResponse } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'

export const userActions = {
  setAuthAC: (user: UserT, token: string) =>
    ({
      type: SET_USER,
      payload: {
        user,
        token,
      },
    } as const),
  removeAuthAC: () => ({
    type: LOGOUT
  } as const)
}

export const setUsedData = (user: UserT, token: string): ThunkT<UserActionsT> => async (dispatch) => { //TODO cheack if needs async
  const saveToken = token ? token : JSON.parse(localStorage.getItem(USER) as string).token
  try {
    localStorage.setItem(USER, JSON.stringify({ user, token: saveToken }))
    dispatch(userActions.setAuthAC(user, saveToken))
  } catch (e) {
    console.log(e)
  }
}


export const googleSuccessThunk = (res: CredentialResponse): ThunkT<UserActionsT> => async (dispatch) => {
  const token = res.credential
  try {
    const {name, picture, sub, email}: GoogleUserT = jwtDecode(`${token}`)
    console.log(jwtDecode(`${token}`))
    // const { data } = await api.googleSign({
    //   name,
    //   email,
    //   imageUrl: picture,
    //   _id: sub
    // })
    //dispatch(setUsedData(data.user, `${token}`))
  } catch (e) {
    console.log(e)
  }
}

// export const removeUsedData = (): ThunkType<UserActionsT> => async (dispatch) => {
//   try {
//     localStorage.removeItem(USER)
//     dispatch(userActions.removeAuthActionCreator())
//   } catch (e) {
//     console.log(e)
//   }
// }

// export const signInThunk = (formData: AuthFormStateType, navigate: NavigateFunction): ThunkType<UserActionsT> => async (dispatch) => {
//   try {
//     const { data } = await api.signIn(formData)
//     dispatch(setUsedData(data.user, data.token))
//     navigate('/')
//   } catch (e) {
//     console.log(e)
//   }
// }
//
// export const signUpThunk = (formData: AuthFormStateType, navigate: NavigateFunction): ThunkType<UserActionsT> => async (dispatch) => {
//   try {
//     const { data } = await api.signUn(formData)
//     dispatch(setUsedData(data.user, data.token))
//     navigate('/')
//   } catch (e) {
//     console.log(e)
//   }
// }
//
// export const updateUserDataThunk = (formData: UserType): ThunkType<UserActionsT> => async (dispatch) => {
//   try {
//     const { data } = await api.updateUserData({
//       ...formData,
//       name: `${formData.firstName} ${formData.lastName}`
//     })
//     dispatch(setUsedData(data.user, data.token))
//   } catch (e) {
//     console.log(e)
//   }
// }
//
// export const setUserImageThunk = (newUserImage: string, email?: string): ThunkType<UserActionsT> => async (dispatch) => {
//   try {
//     const { data } = await api.updateUserImage({ newUserImage, email })
//     dispatch(setUsedData(data.user, data.token))
//   } catch (e) {
//     console.log(e)
//   }
// }
