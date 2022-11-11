import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import theme from '@/theme'
import useAppStore from '@/stores/app.store'
import { APPBAR_HEIGHT } from '@/constants'

// TODO: Implement layout for main pages
export default () => {
  const appStore = useAppStore()

  const appBarContent = (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => appStore.setIsSidebarOpen(true)}
        edge="start"
        sx={{
          color: 'common.black',
          mr: 2,
          [theme.breakpoints.up('md')]: { display: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>
      <img src="/logo.png" alt="logo" width={theme.spacing(37)} />
    </Toolbar>
  )

  const commonSxProps = {
    minHeight: APPBAR_HEIGHT,
    bgcolor: 'common.white',
    borderBottom: 0.5,
    borderColor: 'grey.200',
  }
  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          ...commonSxProps,
          display: { md: 'none' },
        }}
      >
        {appBarContent}
      </AppBar>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ...commonSxProps,
          display: { xs: 'none', md: 'block' },
        }}
      >
        {appBarContent}
      </AppBar>
    </>
  )
}
