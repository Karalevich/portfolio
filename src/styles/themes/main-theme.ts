import { createTheme } from '@mui/material/styles'

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#FFB400',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: '0px !important',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {},
    },
    MuiTab: {
      styleOverrides: {
        root: {
          width: '40px',
          borderRadius: '50% !important',
          marginBottom: '4.7vh',
          minHeight: '0',
          minWidth: '0',
          padding: '0',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: '9.375rem',
          height: '9.375rem',
          backgroundColor: '#f0f0f6'
        },
      },
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'Inter',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})