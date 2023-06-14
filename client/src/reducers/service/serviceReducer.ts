import { ServiceActionT, ServiceStateT } from './types'

export const SET_LOADING_CONTACT_FORM = 'SET_LOADING_CONTACT_FORM'

const initialState = {
  isLoadingContactForm: false,
}

export default (state: ServiceStateT = initialState, action: ServiceActionT) => {
  switch (action.type) {
    case SET_LOADING_CONTACT_FORM:
      return {
        ...state,
        isLoadingContactForm: action.flag,
      }
    default:
      return state
  }
}
