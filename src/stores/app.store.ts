// @ts-nocheck
import create from 'zustand'

export type AppStoreType = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
}

const useAppStore = create<AppStoreType>((set, get) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
}))

// Globally expose the store during development
if (import.meta.env.DEV) {
  // @ts-ignore
  window.appStore = useAppStore
}

export default useAppStore
