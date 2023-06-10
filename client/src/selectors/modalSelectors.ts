import { RootStateT } from '../reducers/store'

export const getModalIsOpenS = (state: RootStateT) => state.modal.isOpen
export const getModalTypeS = (state: RootStateT) => state.modal.type
export const getModalTitleS = (state: RootStateT) => state.modal.title
export const getModalDescriptionS = (state: RootStateT) => state.modal.description
export const getModalCancelTextS = (state: RootStateT) => state.modal.cancelText
export const getModalConfirmTextS = (state: RootStateT) => state.modal.confirmText
