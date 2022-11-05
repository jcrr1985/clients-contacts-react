import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { StyledEngineProvider } from '@mui/material/styles'

import theme from './theme'
import NewSupplierPage from '@/pages/supplier/new-supplier'

// Load and start mock service worker during development
const prepare = async (): Promise<void> => {
  if (import.meta.env.DEV) {
    const { setupWorker } = await import('msw')
    const modules = import.meta.glob<true, string, { default: any[] }>(
      './mocks/*.ts',
      {
        eager: true,
      },
    )
    const handlers = Object.values(modules)
      .map(({ default: handlers }) => handlers)
      .flat()
    const worker = setupWorker(...handlers)
    worker.start()
  }
}

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)
prepare().then(() =>
  root.render(
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <NewSupplierPage />
      </ThemeProvider>
    </StyledEngineProvider>,
  ),
)
