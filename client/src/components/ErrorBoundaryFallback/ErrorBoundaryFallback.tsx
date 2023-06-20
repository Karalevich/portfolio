import React, { useEffect, useRef, useState } from 'react'
import { ErrorBoundaryFallbackComponent } from './types'
import { useLocation, useNavigate } from 'react-router-dom'
import { useErrorBoundary } from 'react-error-boundary'
import ErrorModal from '../Custom/Modal/ErrorModal/ErrorModal'
import { Dialog } from '@mui/material'

export const ErrorBoundaryFallback: ErrorBoundaryFallbackComponent = ({ description, redirectUrl }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const errorLocation = useRef(location.pathname)
  const [isOpen, setIsOpen] = useState(true)
  const { resetBoundary } = useErrorBoundary()

  const confirmAction = () => {
    setIsOpen(false)
    redirectUrl && navigate(`/${redirectUrl}`)
  }

  useEffect(() => {
    if (location.pathname !== errorLocation.current) {
      resetBoundary()
    }
  }, [location.pathname])

  return (
    <Dialog open={isOpen} onClose={confirmAction}>
      <ErrorModal confirmActionFromParent={confirmAction} description={description} />
    </Dialog>
  )
}

export default ErrorBoundaryFallback
