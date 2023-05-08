import React, { StrictMode } from 'react'
import './index.scss'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './reducers/store'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
