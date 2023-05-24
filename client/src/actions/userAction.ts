import { ActionT, ThunkT } from '../reducers/store'
import * as api from '../api'
import { TOGGLE_MODAL, SET_USER } from '../reducers/user/userReducer'
import { NavigateFunction } from 'react-router-dom'
import { UserT } from 'src/reducers/user/types'

export const userActions = {
  setUser: (user: UserT, token: string) =>
    ({
      type: SET_USER,
      payload: {
        user,
        token,
      },
    } as const),
  toggleModal: (isOpenModal: boolean) => ({ type: TOGGLE_MODAL, payload: { isOpenModal } } as const),
}

export type UserActionsT = ActionT<typeof userActions>

export const setUserToLocalStorage = (user: UserT, token: string) => {
  const saveToken = token ? token : JSON.parse(localStorage.getItem('') as string).token
  localStorage.setItem('', JSON.stringify({ user, token: saveToken }))
}

// export const signInThunk =
//   (formData: any, navigate: NavigateFunction): ThunkT<UserActionsT> =>
//   async (dispatch) => {
//     try {
//       const { data } = await api.signIn(formData)
//       setUserToLocalStorage(data.user, data.token)
//       dispatch(userActions.setUser(data.user, data.token))
//       navigate('/')
//     } catch (e) {
//       console.log(e)
//     }
//   }
