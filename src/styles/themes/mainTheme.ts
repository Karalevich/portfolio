import { createTheme } from '@mui/material/styles'

export const mainTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1600,
    },
  },
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
          },
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

