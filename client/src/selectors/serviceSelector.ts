import { RootStateT } from '../reducers/store'

export const getIsLoadingContactFormS = (state: RootStateT) => state.service.isLoadingContactForm
