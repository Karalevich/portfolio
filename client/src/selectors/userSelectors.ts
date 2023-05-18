import { RootStateT } from '../reducers/store'

export const getIsOpenModal = (state: RootStateT) => state.user.isOpenModal
export const getUser = (state: RootStateT) => state.user.user
