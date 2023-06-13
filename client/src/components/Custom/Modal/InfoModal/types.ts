import { FunctionComponent } from 'react'
import { ModalStateT } from '../../../../reducers/modal/types'

type InfoModalProps = Partial<Omit<ModalStateT, 'type' | 'isOpen'>> & {
  cancelActionFromParent?: () => void
  confirmActionFromParent?: () => void
}

export type InfoModalComponent = FunctionComponent<InfoModalProps>
