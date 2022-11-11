export interface Contact {
  _id: string
  supplierId: string
  genre: 'm' | 'f'
  firstName: string
  lastName: string
  position?: string
  idioma?: string
  phone: string
  email: string
}
