import { ThunkT } from '../reducers/store'
import * as api from '../api'
import {
  LOGOUT,
  SET_ERROR_SIGNIN_MESSAGE,
  SET_ERROR_SIGNUP_MESSAGE,
  SET_USER,
  TOGGLE_IS_AUTH_LOADING,
} from '../reducers/user/userReducer'
import { CreateUserT, GoogleUserT, UserActionsT, UserT } from 'src/reducers/user/types'
import { USER } from '../constants/user'
import { TokenResponse } from '@react-oauth/google'
import { getGoogleUserData } from '../api'
import { actionsModal } from './modalAction'
import { ModalActionT } from '../reducers/modal/types'

export const userActions = {
  setAuthAC: (user: UserT, token: string) =>
    ({
      type: SET_USER,
      payload: {
        user,
        token,
      },
    } as const),
  removeAuthAC: () =>
    ({
      type: LOGOUT,
    } as const),
  toggleIsAuthAC: () =>
    ({
      type: TOGGLE_IS_AUTH_LOADING,
    } as const),
  setErrSignInMessageAC: (errMessage: string) =>
    ({
      type: SET_ERROR_SIGNIN_MESSAGE,
      payload: {
        errMessage,
      },
    } as const),
  setErrSignUpMessageAC: (errMessage: string) =>
    ({
      type: SET_ERROR_SIGNUP_MESSAGE,
      payload: {
        errMessage,
      },
    } as const),
}

export const setUsedData =
  (user: UserT, token: string): ThunkT<UserActionsT> =>
    async (dispatch) => {
      //TODO cheack if needs async
      const saveToken = token ? token : JSON.parse(localStorage.getItem(USER) as string).token
      try {
        localStorage.setItem(USER, JSON.stringify({ user, token: saveToken }))
        dispatch(userActions.setAuthAC(user, saveToken))
      } catch (e) {
        console.log(e)
      }
    }

export const removeUsedData = (): ThunkT<UserActionsT> => async (dispatch) => {
  try {
    localStorage.removeItem(USER)
    dispatch(userActions.removeAuthAC())
  } catch (e) {
    console.log(e)
  }
}

export const googleSuccessThunk =
  (
    response: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>,
  ): ThunkT<UserActionsT | ModalActionT> =>
    async (dispatch) => {
      try {
        dispatch(userActions.toggleIsAuthAC())
        const result = await getGoogleUserData(response.access_token)
        const { name, picture, sub, email }: GoogleUserT = result.data
        const { data } = await api.googleSign({
          name,
          email,
          imageUrl: picture,
          id: sub,
        })
        dispatch(setUsedData(data.user, response.access_token))
        dispatch(actionsModal.closesModalAC())
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(userActions.toggleIsAuthAC())
      }
    }

export const signUpThunk = (formData: CreateUserT): ThunkT<UserActionsT | ModalActionT> =>
  async (dispatch) => {
    try {
      dispatch(userActions.toggleIsAuthAC())
      const { data } = await api.signUn(formData)
      dispatch(setUsedData(data.user, data.token))
      dispatch(actionsModal.closesModalAC())
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(userActions.toggleIsAuthAC())
    }
  }

export const signInThunk = (formData: Omit<CreateUserT, 'confirmPassword' | 'name'>): ThunkT<UserActionsT | ModalActionT> => async (dispatch) => {
  try {
    dispatch(userActions.toggleIsAuthAC())
    const { data } = await api.signIn(formData)
    dispatch(setUsedData(data.user, data.token))
    dispatch(actionsModal.closesModalAC())
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(userActions.toggleIsAuthAC())
  }
}

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
