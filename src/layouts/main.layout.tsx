import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import AppBar from '@/components/app/app-bar'
import { APPBAR_HEIGHT } from '@/constants'

// TODO: Implement layout for main pages
export default ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack>
      <AppBar />
      <Box sx={{ mt: { md: APPBAR_HEIGHT } }}>{children}</Box>
    </Stack>
  )
}
