import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ee7302',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
        disableTouchRipple: true,
        disableRipple: true,
      },
    },
  },
})

export default theme
