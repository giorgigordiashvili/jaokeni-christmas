import { createTheme } from '@mui/material/styles'
import { Noto_Sans_Georgian } from 'next/font/google'
import { GlobalStyle } from './GlobalStyle'

const notoSans = Noto_Sans_Georgian({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const theme = createTheme({
  palette: {
    mode: 'light',
    secondary: {
      main: '#ffffff'
    }
  },

  typography: {
    h2: {
      fontWeight: '700'
    },
    h1: {
      color: 'var(--Primary, #00162C)',
      textAlign: 'center',
      fontSize: '50px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'normal',
      textTransform: 'uppercase',
      letterSpacing: 1.1
    },
    subtitle1: {
      color: 'var(--Secondary, #002945)',
      textAlign: 'center',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '650',
      lineHeight: '20px' // 125%
    }
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: GlobalStyle
    },
    MuiButton: {
      styleOverrides: {
        root: {
          display: 'flex',
          width: 180, // Default for desktop
          height: 60, // Default for desktop
          padding: '12px 32px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          flexShrink: 0,
          borderRadius: '8px',
          background: '#FDD109',
          textAlign: 'center',
          fontFamily: 'Helvetica Neue',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 700,
          color: 'var(--Primary, #00162C)',

          lineHeight: '16px', // 114.286%,
          ['@media (max-width:600px)']: {
            // Styles for mobile
            width: 136,
            height: 50
          },
          ['&:disabled']: {
            background: '#D7D7D7',
            color: '#A1A1A1'

            // Since text-align and line-height don't directly apply to buttons,
            // these styles might need to be adjusted or applied to the button label/content.
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          width: '130px',
          height: '130px',
          background: 'transparent',

          // Styles for mobile screens
          ['@media (max-width:900px)']: {
            // Applying styles for screens smaller than 600px
            width: '98px',
            height: '98px'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        h1: ({ theme }) => ({
          [theme.breakpoints.down('md')]: {
            fontSize: '20px' // Smaller font size for mobile screens
          }
        }),
        subtitle1: ({ theme }) => ({
          [theme.breakpoints.down('md')]: {
            fontSize: '12px', // Smaller font size for mobile screens
            lineHeight: '20px' // 166.667% for mobile screens
          }
        })
      }
    }
  }
})

export default theme
