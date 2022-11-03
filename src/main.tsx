import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { StyledEngineProvider } from '@mui/material/styles'

import theme from './theme'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Typography variant="h1">Hello Vite + MUI</Typography>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
