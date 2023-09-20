import serviceReducer from './serviceReducer'
import { serviceActions } from '../../actions/serviceAction'

const initialState = {
  isLoadingContactForm: false,
}

describe('serviceReducer', () => {
  test('should handle SET_LOADING_CONTACT_FORM', () => {
    let newState = serviceReducer(initialState, serviceActions.setLoadingContactFormAC(true))

    expect(newState.isLoadingContactForm).toEqual(true)
  })
})
