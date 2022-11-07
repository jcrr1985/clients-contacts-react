/** @jsxImportSource @emotion/react */
import React from 'react'
import 'twin.macro'

import useSupplierStore from '@/stores/supplier.store'
import ContactEditor from '@/components/supplier/contact-editor'
import SupplierEditor from '@/components/supplier/supplier-editor'

export default function NewSupplier() {
  const supplierStore = useSupplierStore()
  React.useEffect(() => {
    supplierStore.fetchAll()
  }, [])

  return (
    <div tw="flex flex-col sm:flex-row">
      <SupplierEditor />
      <ContactEditor />
    </div>
  )
}
