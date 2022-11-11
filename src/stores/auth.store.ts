import create from 'zustand'

import type { User } from '@/types'

export type AuthStoreType = {
  user?: User
}

const useAuthStore = create<AuthStoreType>((set, get) => ({
  // TODO: Implement real auth logic to load the user,
  // below is a fake one for this demo
  user: {
    nickName: 'John Doe',
    isAuthorized: true,
    isLoading: false,
  },

  // TODO: Implement real auth logic to login the user,
}))

// Globally expose the store during development
if (import.meta.env.DEV) {
  // @ts-ignore
  window.authStore = useAuthStore
}

export default useAuthStore
