import React, { lazy, Suspense } from 'react'
import { Route, Navigate, Routes, BrowserRouter } from 'react-router-dom'

import Layout from '@/layouts'

const routes = [
  {
    path: '/suppliers',
    Component: lazy(() => import('@/pages/supplier/new-supplier')),
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('@/pages/auth/404')),
  },
]

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* TODO: Add a home page. For this demo we just redirect to /suppliers */}
          <Route path="/" element={<Navigate to="/suppliers" />} />
          {routes.map(({ path, Component }) => (
            <Route
              path={path}
              key={path}
              element={
                <div>
                  <Suspense fallback={null}>
                    <Component />
                  </Suspense>
                </div>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/auth/404" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
