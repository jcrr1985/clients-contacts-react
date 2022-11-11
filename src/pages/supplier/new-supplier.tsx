import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { blueGrey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'

import { Supplier, Contact } from '@/types'
import useSupplierStore from '@/stores/supplier.store'
import ContactEditor from '@/components/supplier/contact-editor'
import SupplierEditor from '@/components/supplier/supplier-editor'
import SupplierList from '@/components/supplier/supplier-list'
import { SubmitHandler } from 'react-hook-form'

const PAGE_TITLE = 'ZULIEFERER HINZUFÜGEN'
const PAGE_BREADCRUMBS = 'ZULIEFERER / ZULIEFERER HINZUFÜGEN'

export default function NewSupplier(props: any) {
  const theme = useTheme()
  const supplierStore = useSupplierStore()

  React.useEffect(() => {
    supplierStore.fetchAll()
  }, [])

  const handleSupplierUpsert: SubmitHandler<Supplier> = (supplier) => {
    if (supplier._id) {
      supplierStore.update(supplier)
    } else {
      supplierStore.create(supplier)
    }
  }

  const handleContactUpsert: SubmitHandler<Contact> = (contact) => {
    if (contact._id !== undefined) {
      supplierStore.updateContact(supplierStore.currentSupplier, contact)
    } else {
      supplierStore.addContact(supplierStore.currentSupplier, contact)
    }
  }

  return (
    <Stack direction={['row']} height="100vh">
      <SupplierList suppliers={supplierStore.suppliers} />
      <Container maxWidth="xl" sx={{ bgcolor: 'common.white' }}>
        {/* Page Header */}
        <Stack py={1}>
          <Typography
            fontSize={8}
            color="grey.500"
            fontWeight={theme.typography.fontWeightBold}
          >
            {PAGE_BREADCRUMBS}
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
            {PAGE_TITLE}
          </Typography>
        </Stack>

        {/* Page Editors */}
        <Stack
          direction={{ md: 'row' }}
          gap={theme.spacing(4)}
          marginTop={{ md: 5 }}
          spacing={2}
        >
          <SupplierEditor onSuccess={handleSupplierUpsert} />
          <ContactEditor onSuccess={handleContactUpsert} />
        </Stack>
        <Button
          sx={{
            mt: {
              xs: theme.spacing(10),
              md: '-' + theme.spacing(9),
              lg: theme.spacing(10),
            },
          }}
          variant="contained"
          type="submit"
          form="supplier-form"
        >
          HINZUFÜGEN
        </Button>
      </Container>
    </Stack>
  )
}
