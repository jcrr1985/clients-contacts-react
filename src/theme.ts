import { createTheme } from '@mui/material/styles'

const rootElement = document.getElementById('root')

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F8AE0',
    },
    secondary: {
      main: '#326eb3',
    },
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
})

export default theme
