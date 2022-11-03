import 'twin.macro'

import ContactEditor from '@/components/supplier/contact-editor'
import SupplierEditor from '@/components/supplier/supplier-editor'

export default function NewSupplier() {
  return (
    <div tw="flex lg:flex-row">
      <SupplierEditor />
      <ContactEditor />
    </div>
  )
}
