import React, { StrictMode } from 'react'
import './index.scss'
import 'react-quill/dist/quill.snow.css'
import './styles/editorRewrite.scss'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './reducers/store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { SnackbarProvider } from 'notistack'
import { mainTheme } from './styles/themes/mainTheme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { themeSnackbar } from './styles/themes/snackbarTheme'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
      <Provider store={store}>
        <ThemeProvider theme={mainTheme}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            Components={themeSnackbar}
          >
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
