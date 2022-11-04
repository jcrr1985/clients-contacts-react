import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { StyledEngineProvider } from '@mui/material/styles'

import theme from './theme'
import NewSupplierPage from '@/pages/supplier/new-supplier'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/supplier-api')
  worker.start()
}

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)
root.render(
  <StyledEngineProvider injectFirst>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <NewSupplierPage />
    </ThemeProvider>
  </StyledEngineProvider>,
)
