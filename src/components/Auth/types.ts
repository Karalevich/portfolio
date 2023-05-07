import { FunctionComponent, ReactNode } from 'react'

type AuthProps = {
}
export type AuthComponent = FunctionComponent<AuthProps>

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  id: number;
}

export type TabPanelComponent = FunctionComponent<TabPanelProps>
