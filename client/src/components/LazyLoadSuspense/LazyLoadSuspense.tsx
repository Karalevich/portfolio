import React, { Suspense } from 'react'
import { LazyLoadSuspenseComponent } from './types'
import { LinearProgress } from '@mui/material'

const LazyLoadSuspense: LazyLoadSuspenseComponent = ({ children }) => {
  return <Suspense fallback={<LinearProgress />}>{children}</Suspense>
}

export default LazyLoadSuspense
