import { RootStateT } from '../reducers/store'

export const getUserS = (state: RootStateT) => state.user.user
export const getUserEmailS = (state: RootStateT) => state.user.user?.email
export const getUserIdS = (state: RootStateT) => state.user.user?.id
export const getIsAuthLoading = (state: RootStateT) => state.user.isAuthLoading
export const getErrSignInMessage = (state: RootStateT) => state.user.errSignInMessage
export const getErrSignUpMessage = (state: RootStateT) => state.user.errSignUpMessage
export const getIsFetchingLogoutS = (state: RootStateT) => state.user.isFetchingLogout

// export const getTokenSelector = (state: RootStateT): string | null => state.authReducer?.token
