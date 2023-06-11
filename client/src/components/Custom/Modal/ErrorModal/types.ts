import { FunctionComponent } from 'react'
import { ModalStateT } from '../../../../reducers/modal/types'

type ErrorModalProps = Partial<Omit<ModalStateT, 'type' | 'isOpen' | 'cancelText'>> & {
  confirmActionFromParent?: () => void
}

export type ErrorModalComponent = FunctionComponent<ErrorModalProps>
