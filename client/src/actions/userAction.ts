import { ThunkT } from '../reducers/store'
import * as api from '../api'
import {
  LOGOUT,
  SET_ERROR_SIGNIN_MESSAGE,
  SET_ERROR_SIGNUP_MESSAGE,
  SET_USER,
  TOGGLE_IS_AUTH_LOADING,
  SET_FETCHING_LOGOUT,
} from '../reducers/user/userReducer'
import { CreateUserT, GoogleUserT, UserActionsT, UserT } from 'src/reducers/user/types'
import { USER } from '../constants/user'
import { TokenResponse } from '@react-oauth/google'
import { modalActions } from './modalAction'
import { ModalActionT } from '../reducers/modal/types'
import { BlogActionT } from '../reducers/blog/types'
import { notistackActions } from './notistackAction'
import { NotistackActionT } from '../reducers/notistack/types'

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
  setFetchingLogoutAC: (flag: boolean) =>
    ({
      type: SET_FETCHING_LOGOUT,
      flag,
    } as const),
}

export const setUsedData =
  (user: UserT, token: string): ThunkT<UserActionsT | NotistackActionT> =>
  async (dispatch) => {
    const saveToken = token ? token : JSON.parse(localStorage.getItem(USER) as string).token
    try {
      localStorage.setItem(USER, JSON.stringify({ user, token: saveToken }))
      dispatch(userActions.setAuthAC(user, saveToken))
    } catch (e) {
      console.log(e)
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Sorry, there was an error saving user',
          options: {
            variant: 'error',
          },
        })
      )
    }
  }

export const removeUsedData = (): ThunkT<UserActionsT | NotistackActionT> => async (dispatch) => {
  try {
    localStorage.removeItem(USER)
    dispatch(userActions.removeAuthAC())
  } catch (e) {
    console.log(e)
    dispatch(
      notistackActions.enqueueSnackbarAC({
        message: 'Sorry, there was an error while removing user',
        options: {
          variant: 'error',
        },
      })
    )
  }
}

export const logOutThunk = (): ThunkT<UserActionsT | NotistackActionT> => async (dispatch) => {
  try {
    dispatch(userActions.setFetchingLogoutAC(true))
    await api.logOut()
    await dispatch(removeUsedData())
  } catch (e) {
    console.log(e)
    dispatch(
      notistackActions.enqueueSnackbarAC({
        message: 'Sorry, there was an error while logout',
        options: {
          variant: 'error',
        },
      })
    )
  } finally {
    dispatch(userActions.setFetchingLogoutAC(false))
    dispatch(
      notistackActions.enqueueSnackbarAC({
        message: 'Logout successful!',
        options: {
          variant: 'success',
        },
      })
    )
  }
}

export const checkAuth = (): ThunkT<UserActionsT | NotistackActionT> => async (dispatch) => {
  try {
    dispatch(userActions.setFetchingLogoutAC(true))
    const { data } = await api.refresh()
    await dispatch(setUsedData(data.user, data.accessToken))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(userActions.setFetchingLogoutAC(false))
  }
}

export const googleSuccessThunk =
  (
    response: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>
  ): ThunkT<UserActionsT | ModalActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      dispatch(userActions.toggleIsAuthAC())
      const result = await api.getGoogleUserData(response.access_token)
      const { name, picture, sub, email }: GoogleUserT = result.data
      const { data } = await api.googleSign({
        name,
        email,
        imageUrl: picture,
        id: sub,
      })
      await dispatch(setUsedData(data.user, data.token))
      dispatch(modalActions.closesModalAC())
    } catch (e) {
      console.log(e)
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Sorry, there was an error while login',
          options: {
            variant: 'error',
          },
        })
      )
    } finally {
      dispatch(userActions.toggleIsAuthAC())
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Login successful!',
          options: {
            variant: 'success',
          },
        })
      )
    }
  }

export const signUpThunk =
  (formData: CreateUserT): ThunkT<UserActionsT | ModalActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      dispatch(userActions.toggleIsAuthAC())
      const { data } = await api.signUn(formData)
      await dispatch(setUsedData(data.user, data.token))
      dispatch(modalActions.closesModalAC())
    } catch (e) {
      console.log(e)
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Sorry, there was an error while creating account',
          options: {
            variant: 'error',
          },
        })
      )
    } finally {
      dispatch(userActions.toggleIsAuthAC())
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Account successfully created!',
          options: {
            variant: 'success',
          },
        })
      )
    }
  }

export const signInThunk =
  (
    formData: Omit<CreateUserT, 'confirmPassword' | 'name'>
  ): ThunkT<UserActionsT | ModalActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      dispatch(userActions.toggleIsAuthAC())
      const { data } = await api.signIn(formData)
      await dispatch(setUsedData(data.user, data.token))
      dispatch(modalActions.closesModalAC())
    } catch (e) {
      console.log(e)
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Sorry, there was an error while signin',
          options: {
            variant: 'error',
          },
        })
      )
    } finally {
      dispatch(userActions.toggleIsAuthAC())
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Login successful!',
          options: {
            variant: 'success',
          },
        })
      )
    }
  }

export const resentActivationLinkThunk =
  (email: string): ThunkT<BlogActionT | NotistackActionT> =>
  async (dispatch) => {
    try {
      await api.resentActivationLink(email)
    } catch (e) {
      console.log(e)
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Sorry, there was an error while resent link',
          options: {
            variant: 'error',
          },
        })
      )
    } finally {
      dispatch(
        notistackActions.enqueueSnackbarAC({
          message: 'Link successfully sent!',
          options: {
            variant: 'success',
          },
        })
      )
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

//   user: {
//   name: "Test fo delete",
//     "email": "ajboffstark666@betmelli20.com",
//     "imageUrl": "",
//     "isActivated": false,
//     "id": "6487deee0a91a48c1b7088a7"
// },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFqYm9mZnN0YXJrNjY2QGJldG1lbGxpMjAuY29tIiwiaWQiOiI2NDg3ZGVlZTBhOTFhNDhjMWI3MDg4YTciLCJpc0FjdGl2YXRlZCI6dHJ1ZSwiaWF0IjoxNjg2NjMyMzQ3LCJleHAiOjE2ODY2MzQxNDd9.YisXtC1nMJRLAC8ZMy0li_z1v299KcmFzKgNyKkI16Y"
