// @ts-nocheck
import create from 'zustand'
import { nanoid } from 'nanoid'

import { Supplier, Contact } from '@/types'

export type SupplierStoreType = {
  suppliers: Supplier[]
  currentSupplier: Supplier
  currentContact: Contact
  fetchAll: () => Promise<Supplier[]>
  create: (supplier: Supplier) => Promise<void>
  update: (supplier: Supplier) => Promise<void>
  remove: (supplierId: string) => Promise<void>
  setCurrentSupplier: (supplier: Supplier) => void
  setCurrentContact: (contact: Contact) => void
  addContact: (supplier: Supplier, contact: Contact) => Promise<void>
  updateContact: (supplier: Supplier, contact: Contact) => Promise<void>
  nextContact: () => Promise<void>
  prevContact: () => Promise<void>
  firstContact: () => Promise<void>
  lastContact: () => Promise<void>
}

const useSupplierStore = create<SupplierStoreType>((set, get) => ({
  /* Supplier Store State */

  suppliers: [],
  currentSupplier: {},
  currentContact: {},

  /* Supplier CRUD Actions */

  fetchAll: async () => {
    const response = await fetch('/api/suppliers')
    const suppliers = await response.json()
    set({
      suppliers,
      currentSupplier: suppliers[0] || {},
      currentContact: suppliers[0]?.contacts?.[0] || {},
    })
  },
  create: async (supplier: Supplier) => {
    const response = await fetch('/api/suppliers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(supplier),
    })
    if ((await response.status) !== 201) {
      throw new Error('Error creating supplier')
    }
    const newSupplier = await response.json()
    set((state) => ({
      suppliers: [...state.suppliers, newSupplier],
      currentSupplier: newSupplier,
      currentContact: newSupplier.contacts?.[0] || {},
    }))
  },
  update: async (supplier: Supplier) => {
    const response = await fetch(`/api/suppliers/${supplier._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(supplier),
    })
    if ((await response.status) !== 200) {
      throw new Error('Error updating supplier')
    }
    const updatedSupplier = await response.json()
    set((state) => {
      const suppliers = state.suppliers.map((s) =>
        s._id === updatedSupplier._id ? updatedSupplier : s,
      )
      return {
        suppliers,
        currentSupplier: updatedSupplier,
        currentContact:
          updatedSupplier.contacts?.find(
            (c) => state.currentContact._id === c._id,
          ) ||
          updatedSupplier.contacts?.[0] ||
          {},
      }
    })
  },
  remove: async (supplierId: string) => {
    const response = await fetch(`/api/suppliers/${supplierId}`, {
      method: 'DELETE',
    })
    if ((await response.status) !== 200) {
      throw new Error('Error deleting supplier')
    }
    set((state) => {
      const suppliers = state.suppliers.filter((s) => s._id !== supplierId)
      return {
        suppliers,
        currentSupplier:
          state.currentSupplier._id === supplierId
            ? suppliers[0] ?? {}
            : state.currentSupplier,
        currentContact:
          state.currentSupplier._id === supplierId
            ? suppliers[0]?.contacts?.[0] ?? {}
            : state.currentContact ?? {},
      }
    })
  },

  setCurrentSupplier: (supplier: Supplier) => {
    set((state) => {
      const currentSupplier =
        state.suppliers.find((s) => s._id === supplier._id) ?? supplier
      return {
        currentSupplier,
        currentContact: currentSupplier?.contacts?.[0],
      }
    })
  },

  setCurrentContact: (contact: Contact) => {
    set((state) => {
      const currentContact =
        state.currentSupplier?.contacts?.find((c) => c._id === contact._id) ??
        contact
      return {
        currentContact:
          currentContact ?? state.currentSupplier?.contacts?.[0] ?? {},
      }
    })
  },

  /* Contact Edition Actions */

  addContact: (supplier: Supplier, contact: Contact) => {
    // add a temporal id to the contact,
    // so we can use it as a key in the list,
    // it will be replaced on the server during
    // supplier save/update
    const newContact = { ...contact, _id: nanoid() }
    const supplierId = supplier._id
    if (supplierId === undefined) {
      const newSupplier = {
        ...supplier,
        contacts: [...(supplier.contacts ?? []), newContact],
      }
      set((state) => ({
        currentSupplier: newSupplier,
        currentContact: newContact,
      }))
    } else {
      const updatedSuppliers = get().suppliers.map((supplier) =>
        supplier._id === supplierId
          ? {
              ...supplier,
              contacts: [...(supplier.contacts || []), newContact],
            }
          : supplier,
      )
      set((state) => ({
        suppliers: updatedSuppliers,
        currentSupplier: updatedSuppliers.find((s) => s._id === supplierId),
        currentContact: newContact,
      }))
    }
  },
  updateContact: (supplier: Supplier, contact: Contact) => {
    const supplierId = supplier._id

    if (supplierId === undefined) {
      const updatedSupplier = {
        ...supplier,
        contacts: supplier.contacts.map((c) =>
          c._id === contact._id ? contact : c,
        ),
      }
      set((state) => ({
        currentSupplier: updatedSupplier,
        currentContact: contact,
      }))
    } else {
      const updatedSuppliers = get().suppliers.map((supplier) =>
        supplier._id === supplierId
          ? {
              ...supplier,
              contacts: supplier.contacts?.map((c) =>
                c._id === contact._id ? contact : c,
              ),
            }
          : supplier,
      )
      set((state) => ({
        suppliers: updatedSuppliers,
        currentSupplier: updatedSuppliers.find((s) => s._id === supplierId),
        currentContact: contact,
      }))
    }
  },

  /* Contact Navigation Actions */

  prevContact: () => {
    set((state) => {
      const contacts = state.currentSupplier.contacts
      const index = contacts.indexOf(state.currentContact)
      const prevIndex = Math.max(0, index - 1)
      return { currentContact: contacts[prevIndex] }
    })
  },
  nextContact: () => {
    set((state) => {
      const contacts = state.currentSupplier.contacts
      const index = contacts.indexOf(state.currentContact)
      const nextIndex = Math.min(contacts.length - 1, index + 1)
      return { currentContact: contacts[nextIndex] }
    })
  },
  firstContact: () => {
    set((state) => {
      const contacts = state.currentSupplier.contacts
      return { currentContact: contacts[0] }
    })
  },
  lastContact: () => {
    set((state) => {
      const contacts = state.currentSupplier.contacts
      return { currentContact: contacts[contacts.length - 1] }
    })
  },
}))

// Globally expose the store during development
if (import.meta.env.DEV) {
  // @ts-ignore
  window.supplierStore = useSupplierStore
}
export default useSupplierStore
