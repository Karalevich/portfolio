import { ActionTypes, ThunkType } from '../reducers/store'
import * as api from '../api'
import { AUTH } from '../reducers/authReducer'

import { NavigateFunction } from 'react-router-dom'

export type UserType = {}

export const actionsAuth = {
  setAuthActionCreator: (user: UserType, token: string) => ({
    type: AUTH,
    payload: {
      user,
      token
    }
  } as const),
}

export type AuthActionType = ActionTypes<typeof actionsAuth>

export const setUsedData = (user: UserType, token: string): ThunkType<AuthActionType> => async (dispatch) => {
  const saveToken = token ? token : JSON.parse(localStorage.getItem('') as string).token
  try {
    localStorage.setItem('', JSON.stringify({ user, token: saveToken }))
    dispatch(actionsAuth.setAuthActionCreator(user, saveToken))
  } catch (e) {
    console.log(e)
  }
}


export const signInThunk = (formData: any, navigate: NavigateFunction): ThunkType<AuthActionType> => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)
    dispatch(setUsedData(data.user, data.token))
    navigate('/')
  } catch (e) {
    console.log(e)
  }
}

