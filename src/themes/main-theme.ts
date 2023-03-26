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
  }
})