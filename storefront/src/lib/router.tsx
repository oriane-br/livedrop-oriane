/**
 * Client-side routing configuration using React Router DOM v6
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { CartProvider } from './store'
import { Loading } from '@/components/templates/loading'

// Lazy load pages for better performance
const Catalog = lazy(() => import('@/pages/catalog'))
const Product = lazy(() => import('@/pages/product'))
const Cart = lazy(() => import('@/pages/cart'))
const Checkout = lazy(() => import('@/pages/checkout'))
const OrderStatus = lazy(() => import('@/pages/order-status'))
const NotFound = lazy(() => import('@/pages/not-found'))

/**
 * Router configuration with all routes
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading text="Loading catalog..." />}>
        <Catalog />
      </Suspense>
    )
  },
  {
    path: '/p/:id',
    element: (
      <Suspense fallback={<Loading text="Loading product..." />}>
        <Product />
      </Suspense>
    )
  },
  {
    path: '/cart',
    element: (
      <Suspense fallback={<Loading text="Loading cart..." />}>
        <Cart />
      </Suspense>
    )
  },
  {
    path: '/checkout',
    element: (
      <Suspense fallback={<Loading text="Loading checkout..." />}>
        <Checkout />
      </Suspense>
    )
  },
  {
    path: '/order/:id',
    element: (
      <Suspense fallback={<Loading text="Loading order status..." />}>
        <OrderStatus />
      </Suspense>
    )
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading text="Loading..." />}>
        <NotFound />
      </Suspense>
    )
  }
])

/**
 * Main router component with cart provider
 */
export default function Router() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}