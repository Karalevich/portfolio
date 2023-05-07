import { FunctionComponent } from 'react'

type NavTabsProps = {
  className?: string,
  closeDrawer?: () => void
  handleSwitchTheme: () => void,
  isLightTheme: boolean
}

export type NavTabsComponent = FunctionComponent<NavTabsProps>