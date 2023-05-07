import { RootStateT } from '../reducers/store'

export const getIsOpenModal = (state: RootStateT) => state.user.isOpenModal
