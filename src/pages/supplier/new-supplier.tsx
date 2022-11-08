import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { blueGrey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'

import useSupplierStore from '@/stores/supplier.store'
import ContactEditor from '@/components/supplier/contact-editor'
import SupplierEditor from '@/components/supplier/supplier-editor'

const PageHeader: React.FC<{ path: string; title: string }> = ({
  path,
  title,
}) => {
  const theme = useTheme()
  return (
    <Stack py={1}>
      <Typography
        fontSize={8}
        color="grey.500"
        fontWeight={theme.typography.fontWeightBold}
      >
        {path}
      </Typography>
      <Typography
        variant="h5"
        fontSize={{
          xs: theme.typography.body1.fontSize,
          md: theme.typography.h5.fontSize,
        }}
        color={blueGrey['800']}
        fontWeight={theme.typography.fontWeightBold}
      >
        {title}
      </Typography>
    </Stack>
  )
}

export default function NewSupplier(props: any) {
  const {
    // TODO: title and path should be taken from routing
    title = 'ZULIEFERER HINZUFÜGEN',
    path = 'ZULIEFERER / ZULIEFERER HINZUFÜGEN',
  } = props
  const theme = useTheme()
  const supplierStore = useSupplierStore()

  React.useEffect(() => {
    supplierStore.fetchAll()
  }, [])

  return (
    <Stack direction={['row']} height="100vh">
      <Container maxWidth="xl" sx={{ bgcolor: 'common.white' }}>
        <PageHeader title={title} path={path} />
        <Stack
          direction={{ md: 'row' }}
          gap={theme.spacing(4)}
          marginTop={{ md: 5 }}
          spacing={2}
        >
          <SupplierEditor maxWidth={{ md: theme.spacing(60) }} />
          <ContactEditor maxWidth={{ md: theme.spacing(70) }} />
        </Stack>
      </Container>
    </Stack>
  )
}
