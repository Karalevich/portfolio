import { createTheme } from '@mui/material/styles'

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#FFB400',
    },
    secondary: {
      main: '#ffffff',
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
          backgroundColor: 'var(--substrate2)',
          transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'var(--tooltip) !important',
          color: 'var(--text)',
        },
        arrow: {
          color: 'var(--tooltip) !important',
          top: '20px',
          '&: before': {
            backgroundColor: 'var(--tooltip) !important',
          }
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

