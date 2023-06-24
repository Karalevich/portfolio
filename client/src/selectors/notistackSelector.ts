import { RootStateT } from '../reducers/store'

export const getNotificationsS = (state: RootStateT) => state.notistack.notifications
