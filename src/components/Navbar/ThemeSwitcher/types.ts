import { FunctionComponent } from "react"

type ThemeSwitcherProps = {
  handleSwitchTheme: () => void,
  isLightTheme: boolean
}
export type ThemeSwitcherComponent = FunctionComponent<ThemeSwitcherProps>