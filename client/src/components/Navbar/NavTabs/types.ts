import { FunctionComponent } from 'react'

export type NavTabsProps = {
  className?: string
  closeDrawer?: () => void
  handleSwitchTheme: () => void
  isLightTheme: boolean
}

export type NavTabsComponent = FunctionComponent<NavTabsProps>
