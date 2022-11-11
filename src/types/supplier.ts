import { Contact } from './contact'

export interface Supplier {
  _id: string
  createdAt?: string
  modifiedAt?: string
  name: string
  website?: string
  contacts?: Contact[]
  comments?: string
  deliveryTime?: number
}
