import { FunctionComponent } from 'react'
import { ModalStateT } from '../../../../reducers/modal/types'

type ConfirmModalProps = Partial<Omit<ModalStateT, 'type' | 'isOpen'>> & {
  cancelActionFromParent?: () => void
  confirmActionFromParent?: () => void
}

export type ConfirmModalComponent = FunctionComponent<ConfirmModalProps>
