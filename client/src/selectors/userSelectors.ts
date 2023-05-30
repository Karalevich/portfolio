import { RootStateT } from '../reducers/store'


export const getUserS = (state: RootStateT) => state.user.user

// export const getUserDataSelector = (state: RootStateT): UserType | null => state.authReducer?.user
// export const getTokenSelector = (state: RootStateT): string | null => state.authReducer?.token
