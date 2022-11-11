import { useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import useAuthStore from '@/stores/auth.store'

// Load all layouts, files must be named as {layoutName}.layout.tsx
const modules = import.meta.glob<true, string, { default: any }>(
  './*.layout.tsx',
  { eager: true },
)
const layouts = Object.keys(modules).reduce((acc: any, key: string) => {
  const name = key.split('/').pop()?.split('.')[0] || 'unnamed'
  acc[name] = modules[key].default
  return acc
}, {})

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  // Layout Rendering
  const getLayout = () => {
    if (pathname === '/') {
      return 'public'
    }
    if (/^\/auth(?=\/|$)/i.test(pathname)) {
      return 'auth'
    }
    return 'main'
  }

  const Layout = layouts[getLayout()]
  const isUserAuthorized = user?.isAuthorized
  const isUserLoading = user?.isLoading
  const isAuthLayout = getLayout() === 'auth'

  const BootstrappedLayout = () => {
    // show loader when user in check authorization process, not authorized yet and not on login pages
    if (isUserLoading && !isUserAuthorized && !isAuthLayout) {
      return null // TODO: add loading page
    }
    // redirect to login page if current is not login page and user not authorized
    if (!isAuthLayout && !isUserAuthorized) {
      navigate('/auth/login') // TODO: add login page
    }
    // in other case render previously set layout
    return <Layout>{children}</Layout>
  }

  return (
    <>
      <Helmet titleTemplate="RoomHero - Furnishing Future" />
      {BootstrappedLayout()}
    </>
  )
}

export default Layout
