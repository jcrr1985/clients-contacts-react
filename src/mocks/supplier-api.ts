import { rest } from 'msw'
import { nanoid } from 'nanoid'

import { Supplier } from '@/types'

// Suppliers DB
const suppliers: Supplier[] = []

// @ts-ignore
window.db = {
  suppliers,
}

export default [
  // GET /api/suppliers
  rest.get('/api/suppliers', (req, res, ctx) => {
    return res(ctx.json(suppliers))
  }),

  // GET /api/suppliers/:supplierId
  rest.get('/api/suppliers/:supplierId', (req, res, ctx) => {
    const { supplierId } = req.params
    const supplier = suppliers.find((supplier) => supplier._id == supplierId)
    return res(supplier ? ctx.json(supplier) : ctx.status(404))
  }),

  // POST /api/suppliers
  rest.post('/api/suppliers', async (req, res, ctx) => {
    let newSupplier: Supplier = await req.json()
    const supplierId = nanoid()
    newSupplier = {
      ...newSupplier,
      contacts:
        newSupplier.contacts?.map((contact) => ({
          ...contact,
          _id: nanoid(),
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
        })) || [],
      _id: supplierId,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    }
    suppliers.push(newSupplier)
    return res(ctx.status(201), ctx.json(newSupplier))
  }),

  // PUT /api/suppliers/:supplierId
  rest.put('/api/suppliers/:supplierId', async (req, res, ctx) => {
    const { supplierId } = req.params
    const supplier = suppliers.find((supplier) => supplier._id == supplierId)
    if (!supplier) {
      return res(ctx.status(404))
    }
    let updatedSupplier: Supplier = await req.json()
    updatedSupplier = {
      ...updatedSupplier,
      // add _id to new contacts
      contacts: updatedSupplier.contacts?.map((contact) =>
        supplier.contacts?.find((oldContact) => contact._id === oldContact._id)
          ? contact
          : { ...contact, _id: nanoid() },
      ),
      modifiedAt: new Date().toISOString(),
    }
    Object.assign(supplier, updatedSupplier)
    return res(ctx.status(200), ctx.json(updatedSupplier))
  }),

  // DELETE /api/suppliers/:supplierId
  rest.delete('/api/suppliers/:supplierId', async (req, res, ctx) => {
    const { supplierId } = req.params
    const supplier = suppliers.find((supplier) => supplier._id == supplierId)
    if (!supplier) {
      return res(ctx.status(404))
    }
    suppliers.splice(suppliers.indexOf(supplier), 1)
    return res(ctx.status(200))
  }),
]
