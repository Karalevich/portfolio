import { FunctionComponent } from 'react'

type ErrorBoundaryFallbackProps = {
  description?: string
  redirectUrl?: string
}
export type ErrorBoundaryFallbackComponent = FunctionComponent<ErrorBoundaryFallbackProps>
